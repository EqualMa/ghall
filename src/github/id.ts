type TypeConverter<T> = [(v: T) => string, (v: string) => T];

type TypeConvertersForTypes<T extends Record<string, unknown>> = {
  [K in keyof T]: TypeConverter<T[K]>;
};

function defineTypeConverters<T extends Record<string, unknown>>(
  v: TypeConvertersForTypes<T>,
): TypeConvertersForTypes<T> {
  return v;
}

const typeConverters = defineTypeConverters({
  // type -> [stringify, parse]
  string: [(v: string) => v, (v) => v],
  number: [(v: number) => v.toString(10), (v: string) => parseInt(v, 10)],
});

type typeNameToType = {
  [K in keyof typeof typeConverters]: typeof typeConverters[K] extends TypeConverter<
    infer T
  >
    ? T
    : never;
};

const nodeTypeToDefs = {
  // __typename -> [code, field]
  // serialized decoded id will be {code}:{__typename}{info[field]}
  Gist: {
    field: "name",
    type: "string",
  },
  Repository: {
    field: "databaseId",
    type: "number",
  },
} as const;

export type NodeTypeName = keyof typeof nodeTypeToDefs;
export type NodeTypeDef<T extends NodeTypeName> = typeof nodeTypeToDefs[T];
export type NodeIdField<T extends NodeTypeName> = NodeTypeDef<T>["field"];
export type NodeIdFieldTypeName<T extends NodeTypeName> = NodeTypeDef<
  T
>["type"];
export type NodeIdFieldValueType<
  T extends NodeTypeName
> = typeNameToType[NodeTypeDef<T>["type"]];

export interface IdInfo<T extends NodeTypeName> {
  __typename: T;
  value: NodeIdFieldValueType<T>;
  field: NodeIdField<T>;
}

export function isKnownNodeType(v: unknown): v is NodeTypeName {
  return typeof v === "string" && v in nodeTypeToDefs;
}

const REGEX_ID_INFO = /^([^:]+):(.+)$/;

export function decodeNodeId(idBase64: string): IdInfo<NodeTypeName> {
  const str = Buffer.from(idBase64, "base64").toString("utf8");
  const res = REGEX_ID_INFO.exec(str);

  if (!res) throw new Error(`invalid node id "${idBase64}" (${str})`);

  const len = parseInt(res[1]);
  const typeName = res[2].slice(0, len);
  const valueStr = res[2].slice(len);

  if (!isKnownNodeType(typeName))
    throw new Error(
      `unknown node type "${typeName}" in node id "${idBase64}" (${str})`,
    );

  const { field, type: fieldType } = nodeTypeToDefs[typeName];
  const parser = typeConverters[fieldType][1];
  const value = parser(valueStr);

  return {
    __typename: typeName,
    field,
    value,
  };
}

export function encodeNodeId<T extends NodeTypeName>(
  info: Pick<IdInfo<T>, "__typename" | "value">,
): string {
  const def = nodeTypeToDefs[info.__typename];

  const { type: fieldType } = def;
  const stringify = typeConverters[fieldType][0] as TypeConverter<
    NodeIdFieldValueType<T>
  >[0];
  const valueStr = stringify(info.value);

  const typeName = info.__typename;
  const str = `0${typeName.length.toString(10)}:${typeName}${valueStr}`;

  return Buffer.from(str, "utf8").toString("base64");
}
