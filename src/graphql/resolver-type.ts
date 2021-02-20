import { GraphQLScalarType } from "graphql";
import { Resolvers, ResolversObject } from "./generated";

type ResolversObjects = Resolvers extends ResolversObject<infer T>
  ? { [K in keyof T]: T[K] extends ResolversObject<infer R> ? R : never }
  : never;
type ScalarTypes = {
  [K in keyof ResolversObjects]: ResolversObjects[K] extends GraphQLScalarType
    ? K
    : never;
}[keyof ResolversObjects];
type NonScalarTypes = Exclude<keyof ResolversObjects, ScalarTypes>;

type CommonResolverFn<TParent, TParams extends unknown[], TResult> = (
  parent: TParent,
  ...params: TParams
) => TResult;

export type InstanceResolverInterface<
  R extends Record<string, CommonResolverFn<any, any[], any> | undefined>
> = {
  [K in keyof R]: R[K] extends
    | CommonResolverFn<infer TParent, infer TParams, infer TResult>
    | undefined
    ? TResult | ((this: TParent, ...params: TParams) => TResult)
    : never;
};

export type InstanceResolverInterfaceFor<
  T extends NonScalarTypes
> = InstanceResolverInterface<ResolversObjects[T]>;
