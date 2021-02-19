import { Resolvers, ResolversObject, ResolversParentTypes } from "./generated";

function fieldResolvers<T, F extends (keyof T)[]>(
  fields: F,
): { [K in F[number]]: (e: T) => T[K] } {
  const entries = fields.map((f) => [f, (e: T) => e[f]]);
  return Object.fromEntries(entries);
}
// export function createFieldResolvers<T>() {
//   return <F extends (keyof T)[]>(fields: F) => fieldResolvers<T, F>(fields);
// }

type WithoutIndex<
  R extends ResolversObject<unknown>
> = R extends ResolversObject<infer T> ? T : never;

type ResolversWithoutIndex = WithoutIndex<Resolvers>;
type ResolverParentTypesWithoutIndex = WithoutIndex<ResolversParentTypes>;
export type ResolverOfTypeWithoutIndex<
  T extends keyof ResolversWithoutIndex
> = WithoutIndex<ResolversWithoutIndex[T]>;
type ParentTypeOfType<
  T extends keyof ResolverParentTypesWithoutIndex
> = ResolverParentTypesWithoutIndex[T];

type CommonTypes = keyof ResolversWithoutIndex &
  keyof ResolverParentTypesWithoutIndex;

type CommonFields<T extends CommonTypes> = keyof ResolverOfTypeWithoutIndex<T> &
  keyof ParentTypeOfType<T>;

export function createFieldResolversForType<T extends CommonTypes>(): <
  F extends CommonFields<T>[]
>(
  fields: F,
) => {
  [K in F[number]]: (e: ParentTypeOfType<T>) => ParentTypeOfType<T>[K];
} {
  return fieldResolvers;
}
