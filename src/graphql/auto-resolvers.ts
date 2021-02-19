import * as g from "./generated";

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
  ?
      | AwaitedOrPromise<TResult>
      | ((this: TParent, ...params: TParams) => AwaitedOrPromise<TResult>)
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
  return typeof prop === "function"
    ? Reflect.apply(prop, parent, params)
    : prop;
}

export function resolverForField<TField extends string>(
  field: TField,
): <TParent extends { [K in TField]: unknown }>(
  parent: TParent,
  ...params: TryParameters<TParent[TField]>
) => TryReturnType<TParent[TField]> {
  return (...parentAndParams) => resolveField(field, ...parentAndParams);
}
export const UserAutoResolvers = {
  avatarUrl: resolverForField("avatarUrl"),
  bio: resolverForField("bio"),
  bioHTML: resolverForField("bioHTML"),
  company: resolverForField("company"),
  companyHTML: resolverForField("companyHTML"),
  databaseId: resolverForField("databaseId"),
  email: resolverForField("email"),
  id: resolverForField("id"),
  location: resolverForField("location"),
  login: resolverForField("login"),
  name: resolverForField("name"),
  pinnedItems: resolverForField("pinnedItems"),
  resourcePath: resolverForField("resourcePath"),
  status: resolverForField("status"),
  twitterUsername: resolverForField("twitterUsername"),
  url: resolverForField("url"),
  websiteUrl: resolverForField("websiteUrl"),
};

export interface UserInstanceResolver {
  avatarUrl: InstanceResolverFieldType<g.UserResolvers<any, any>["avatarUrl"]>;
  bio: InstanceResolverFieldType<g.UserResolvers<any, any>["bio"]>;
  bioHTML: InstanceResolverFieldType<g.UserResolvers<any, any>["bioHTML"]>;
  company: InstanceResolverFieldType<g.UserResolvers<any, any>["company"]>;
  companyHTML: InstanceResolverFieldType<
    g.UserResolvers<any, any>["companyHTML"]
  >;
  databaseId: InstanceResolverFieldType<
    g.UserResolvers<any, any>["databaseId"]
  >;
  email: InstanceResolverFieldType<g.UserResolvers<any, any>["email"]>;
  id: InstanceResolverFieldType<g.UserResolvers<any, any>["id"]>;
  location: InstanceResolverFieldType<g.UserResolvers<any, any>["location"]>;
  login: InstanceResolverFieldType<g.UserResolvers<any, any>["login"]>;
  name: InstanceResolverFieldType<g.UserResolvers<any, any>["name"]>;
  pinnedItems: InstanceResolverFieldType<
    g.UserResolvers<any, any>["pinnedItems"]
  >;
  resourcePath: InstanceResolverFieldType<
    g.UserResolvers<any, any>["resourcePath"]
  >;
  status: InstanceResolverFieldType<g.UserResolvers<any, any>["status"]>;
  twitterUsername: InstanceResolverFieldType<
    g.UserResolvers<any, any>["twitterUsername"]
  >;
  url: InstanceResolverFieldType<g.UserResolvers<any, any>["url"]>;
  websiteUrl: InstanceResolverFieldType<
    g.UserResolvers<any, any>["websiteUrl"]
  >;
}

export abstract class UserInstanceResolverProxy
  implements UserInstanceResolver {
  protected abstract getInstanceResolver():
    | UserInstanceResolver
    | Promise<UserInstanceResolver>;

  avatarUrl(...params: TryParameters<UserInstanceResolver["avatarUrl"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("avatarUrl", ins, ...params);
    });
  }
  bio(...params: TryParameters<UserInstanceResolver["bio"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("bio", ins, ...params);
    });
  }
  bioHTML(...params: TryParameters<UserInstanceResolver["bioHTML"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("bioHTML", ins, ...params);
    });
  }
  company(...params: TryParameters<UserInstanceResolver["company"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("company", ins, ...params);
    });
  }
  companyHTML(...params: TryParameters<UserInstanceResolver["companyHTML"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("companyHTML", ins, ...params);
    });
  }
  databaseId(...params: TryParameters<UserInstanceResolver["databaseId"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("databaseId", ins, ...params);
    });
  }
  email(...params: TryParameters<UserInstanceResolver["email"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("email", ins, ...params);
    });
  }
  id(...params: TryParameters<UserInstanceResolver["id"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("id", ins, ...params);
    });
  }
  location(...params: TryParameters<UserInstanceResolver["location"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("location", ins, ...params);
    });
  }
  login(...params: TryParameters<UserInstanceResolver["login"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("login", ins, ...params);
    });
  }
  name(...params: TryParameters<UserInstanceResolver["name"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("name", ins, ...params);
    });
  }
  pinnedItems(...params: TryParameters<UserInstanceResolver["pinnedItems"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("pinnedItems", ins, ...params);
    });
  }
  resourcePath(...params: TryParameters<UserInstanceResolver["resourcePath"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("resourcePath", ins, ...params);
    });
  }
  status(...params: TryParameters<UserInstanceResolver["status"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("status", ins, ...params);
    });
  }
  twitterUsername(
    ...params: TryParameters<UserInstanceResolver["twitterUsername"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("twitterUsername", ins, ...params);
    });
  }
  url(...params: TryParameters<UserInstanceResolver["url"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("url", ins, ...params);
    });
  }
  websiteUrl(...params: TryParameters<UserInstanceResolver["websiteUrl"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("websiteUrl", ins, ...params);
    });
  }
}

export const PinnableItemConnectionAutoResolvers = {
  edges: resolverForField("edges"),
  nodes: resolverForField("nodes"),
  pageInfo: resolverForField("pageInfo"),
  totalCount: resolverForField("totalCount"),
};

export interface PinnableItemConnectionInstanceResolver {
  edges: InstanceResolverFieldType<
    g.PinnableItemConnectionResolvers<any, any>["edges"]
  >;
  nodes: InstanceResolverFieldType<
    g.PinnableItemConnectionResolvers<any, any>["nodes"]
  >;
  pageInfo: InstanceResolverFieldType<
    g.PinnableItemConnectionResolvers<any, any>["pageInfo"]
  >;
  totalCount: InstanceResolverFieldType<
    g.PinnableItemConnectionResolvers<any, any>["totalCount"]
  >;
}

export abstract class PinnableItemConnectionInstanceResolverProxy
  implements PinnableItemConnectionInstanceResolver {
  protected abstract getInstanceResolver():
    | PinnableItemConnectionInstanceResolver
    | Promise<PinnableItemConnectionInstanceResolver>;

  edges(
    ...params: TryParameters<PinnableItemConnectionInstanceResolver["edges"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("edges", ins, ...params);
    });
  }
  nodes(
    ...params: TryParameters<PinnableItemConnectionInstanceResolver["nodes"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("nodes", ins, ...params);
    });
  }
  pageInfo(
    ...params: TryParameters<PinnableItemConnectionInstanceResolver["pageInfo"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("pageInfo", ins, ...params);
    });
  }
  totalCount(
    ...params: TryParameters<
      PinnableItemConnectionInstanceResolver["totalCount"]
    >
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("totalCount", ins, ...params);
    });
  }
}

export const RepositoryOwnerAutoResolvers = {
  __resolveType: resolverForField("__resolveType"),
  avatarUrl: resolverForField("avatarUrl"),
  id: resolverForField("id"),
  login: resolverForField("login"),
  resourcePath: resolverForField("resourcePath"),
  url: resolverForField("url"),
};

export interface RepositoryOwnerInstanceResolver {
  __resolveType: InstanceResolverFieldType<
    g.RepositoryOwnerResolvers<any, any>["__resolveType"]
  >;
  avatarUrl: InstanceResolverFieldType<
    g.RepositoryOwnerResolvers<any, any>["avatarUrl"]
  >;
  id: InstanceResolverFieldType<g.RepositoryOwnerResolvers<any, any>["id"]>;
  login: InstanceResolverFieldType<
    g.RepositoryOwnerResolvers<any, any>["login"]
  >;
  resourcePath: InstanceResolverFieldType<
    g.RepositoryOwnerResolvers<any, any>["resourcePath"]
  >;
  url: InstanceResolverFieldType<g.RepositoryOwnerResolvers<any, any>["url"]>;
}

export abstract class RepositoryOwnerInstanceResolverProxy
  implements RepositoryOwnerInstanceResolver {
  protected abstract getInstanceResolver():
    | RepositoryOwnerInstanceResolver
    | Promise<RepositoryOwnerInstanceResolver>;

  __resolveType(
    ...params: TryParameters<RepositoryOwnerInstanceResolver["__resolveType"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("__resolveType", ins, ...params);
    });
  }
  avatarUrl(
    ...params: TryParameters<RepositoryOwnerInstanceResolver["avatarUrl"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("avatarUrl", ins, ...params);
    });
  }
  id(...params: TryParameters<RepositoryOwnerInstanceResolver["id"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("id", ins, ...params);
    });
  }
  login(...params: TryParameters<RepositoryOwnerInstanceResolver["login"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("login", ins, ...params);
    });
  }
  resourcePath(
    ...params: TryParameters<RepositoryOwnerInstanceResolver["resourcePath"]>
  ) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("resourcePath", ins, ...params);
    });
  }
  url(...params: TryParameters<RepositoryOwnerInstanceResolver["url"]>) {
    return Promise.resolve(this.getInstanceResolver()).then((ins) => {
      return resolveField("url", ins, ...params);
    });
  }
}
