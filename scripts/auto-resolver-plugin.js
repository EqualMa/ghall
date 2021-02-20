const gql = require("graphql");
module.exports = {
  plugin: (
    /** @type {import("graphql").GraphQLSchema} */
    schema,
    documents,
    config,
    info,
  ) => {
    const { generateTypesFor, generatedResolversPath } = config;

    const code = generateTypesFor
      .map((t) => {
        const type = schema.getType(t);
        if (
          !(
            type instanceof gql.GraphQLObjectType ||
            type instanceof gql.GraphQLInterfaceType ||
            type instanceof gql.GraphQLInputObjectType
          )
        ) {
          throw new Error(
            "Only GraphQLObjectType, GraphQLInterfaceType, GraphQLInputObjectType are allowed.",
          );
        }

        const fields = Object.values(type.getFields());

        const fieldNames = fields.map((f) => f.name);

        if (type instanceof gql.GraphQLInterfaceType) {
          fieldNames.splice(0, 0, "__resolveType");
        }
        return `\
export const ${type}AutoResolvers = {
  ${fieldNames
    .map((fieldName) => JSON.stringify(fieldName))
    .map((fieldName) => `${fieldName}: resolverForField(${fieldName})`)
    .join(",\n")}
}

export interface ${type}InstanceResolver {
  ${fieldNames
    .map((fieldName) => JSON.stringify(fieldName))
    .map(
      (field) =>
        `${field}: InstanceResolverFieldType<g.${type}Resolvers<any, any>[${field}]>`,
    )
    .join(";\n")}
}

export abstract class ${type}InstanceResolverProxy implements ${type}InstanceResolver {
  protected abstract getInstanceResolver(): ${type}InstanceResolver | Promise<${type}InstanceResolver>;

  ${fieldNames
    .map((fieldName) => {
      const fieldNameStr = JSON.stringify(fieldName);
      return `${fieldName}(...params: TryParameters<${type}InstanceResolver[${fieldNameStr}]>) {
          return Promise.resolve(this.getInstanceResolver()).then(ins => {
            return resolveField(${fieldNameStr}, ins, ...params);
          })
        }`;
    })
    .join(";\n")}
}
`;
      })
      .join("\n");

    return (
      `\
import * as g from ${JSON.stringify(generatedResolversPath)};

type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;
type MaybePromise<T> = T | Promise<T>;
type AwaitedOrPromise<T> = MaybePromise<Awaited<T>>;

type CommonResolverFn<TParent, TParams extends unknown[], TResult> = (
  parent: TParent,
  ...params: TParams
) => TResult;

type InstanceResolverFieldType<
  T extends CommonResolverFn<any, any[], any> | undefined
> = T extends
  | CommonResolverFn<infer TParent, infer TParams, infer TResult>
  | undefined
  ? AwaitedOrPromise<TResult> | ((this: TParent, ...params: TParams) => AwaitedOrPromise<TResult>)
  : never;

type AnyFunc = (...params: any[]) => any;

type TryParameters<T> = T extends AnyFunc ? Parameters<T> : never;
type TryReturnType<T> = T extends AnyFunc ? ReturnType<T> : T;

export function resolveField<TField extends keyof TParent, TParent>(
  field: TField,
  parent: TParent,
  ...params: TryParameters<TParent[TField]>
): TryReturnType<TParent[TField]> {
  const prop = parent[field];
  return typeof prop === "function" ? Reflect.apply(prop, parent, params) : prop;
}

export function resolverForField<TField extends string>(field: TField):
  <TParent extends {[K in TField]: unknown}>(parent: TParent, ...params: TryParameters<TParent[TField]>) => TryReturnType<TParent[TField]>
{
  return (...parentAndParams) => resolveField(field, ...parentAndParams);
}
` + code
    );
  },
  validate: (
    /** @type {import("graphql").GraphQLSchema} */
    schema,
    documents,
    config,
    outputFile,
    allPlugins,
  ) => {
    const { generateTypesFor, generatedResolversPath } = config;

    if (typeof generatedResolversPath !== "string" || !generatedResolversPath) {
      throw new Error("generatedResolversPath must be a string");
    }

    if (
      !(
        Array.isArray(generateTypesFor) &&
        generateTypesFor.every((t) => typeof t === "string")
      )
    ) {
      throw new Error("generateTypesFor must be an array of type names");
    }

    const invalidTypes = generateTypesFor.filter((t) => !schema.getType(t));
    if (invalidTypes.length !== 0) {
      throw new Error(
        "generateTypesFor contains invalid type names: " +
          invalidTypes.join(", "),
      );
    }
  },
};
