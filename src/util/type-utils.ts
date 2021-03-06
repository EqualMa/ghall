export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type RemoveNeverFields<T> = {
  [P in {
    [K in keyof T]: Required<T>[K] extends never ? never : K;
  }[keyof T]]: T[P];
};

export type Common<T> = RemoveNeverFields<
  {
    [K in keyof Required<UnionToIntersection<T>>]: K extends keyof T
      ? T[K] extends UnionToIntersection<T>[K]
        ? UnionToIntersection<T>[K]
        : never
      : never;
  }
>;

export function pick<T, F extends (keyof T)[]>(
  obj: T,
  fields: F,
): Pick<T, F[number]> {
  return Object.fromEntries(fields.map((f) => [f, obj[f]])) as never;
}

export function identity<T>(data: T): T {
  return data;
}

export function createData<T>(): <D extends T>(data: D) => D {
  return identity;
}
