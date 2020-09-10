import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Git SSH string */
  GitSSHRemote: any;
  /** A string containing HTML code. */
  HTML: any;
  /** An RFC 3986, RFC 3987, and RFC 6570 (level 4) compliant URI string. */
  URI: any;
};

/** Represents an object which can take actions on GitHub. Typically a User or Bot. */
export type Actor = {
  /** A URL pointing to the actor's public avatar. */
  avatarUrl: Scalars["URI"];
  /** The username of the actor. */
  login: Scalars["String"];
  /** The HTTP path for this actor. */
  resourcePath: Scalars["URI"];
  /** The HTTP URL for this actor. */
  url: Scalars["URI"];
};

/** Represents an object which can take actions on GitHub. Typically a User or Bot. */
export type ActorAvatarUrlArgs = {
  size?: Maybe<Scalars["Int"]>;
};

/** A Gist. */
export type Gist = Node &
  Starrable &
  UniformResourceLocatable & {
    __typename?: "Gist";
    /** The gist description. */
    description?: Maybe<Scalars["String"]>;
    /** A list of forks associated with the gist */
    forks: GistConnection;
    id: Scalars["ID"];
    /** The gist name. */
    name: Scalars["String"];
    /** The gist owner. */
    owner?: Maybe<RepositoryOwner>;
    /** The HTML path to this resource. */
    resourcePath: Scalars["URI"];
    /** A list of users who have starred this starrable. */
    stargazers: StargazerConnection;
    /** The HTTP URL for this Gist. */
    url: Scalars["URI"];
  };

/** The connection type for Gist. */
export type GistConnection = {
  __typename?: "GistConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** Represents a given language found in repositories. */
export type Language = {
  __typename?: "Language";
  /** The color defined for the current language. */
  color?: Maybe<Scalars["String"]>;
  /** The name of the current language. */
  name: Scalars["String"];
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars["ID"];
};

/** Types that can be pinned to a profile page. */
export type PinnableItem = Gist | Repository;

/** The connection type for PinnableItem. */
export type PinnableItemConnection = {
  __typename?: "PinnableItemConnection";
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<PinnableItem>>>;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** Represents items that can be pinned to a profile page or dashboard. */
export enum PinnableItemType {
  /** A gist. */
  Gist = "GIST",
  /** An issue. */
  Issue = "ISSUE",
  /** An organization. */
  Organization = "ORGANIZATION",
  /** A project. */
  Project = "PROJECT",
  /** A pull request. */
  PullRequest = "PULL_REQUEST",
  /** A repository. */
  Repository = "REPOSITORY",
  /** A team. */
  Team = "TEAM",
  /** A user. */
  User = "USER",
}

/** Represents any entity on GitHub that has a profile page. */
export type ProfileOwner = {
  /** The public profile email. */
  email?: Maybe<Scalars["String"]>;
  /** The public profile location. */
  location?: Maybe<Scalars["String"]>;
  /** The username used to login. */
  login: Scalars["String"];
  /** The public profile name. */
  name?: Maybe<Scalars["String"]>;
  /** A list of repositories and gists this profile owner has pinned to their profile */
  pinnedItems: PinnableItemConnection;
  /** The public profile website URL. */
  websiteUrl?: Maybe<Scalars["URI"]>;
};

/** Represents any entity on GitHub that has a profile page. */
export type ProfileOwnerPinnedItemsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  types?: Maybe<Array<PinnableItemType>>;
};

/** The query root of GitHub's GraphQL interface. */
export type Query = {
  __typename?: "Query";
  /** Lookup a user by login. */
  user?: Maybe<User>;
};

/** The query root of GitHub's GraphQL interface. */
export type QueryUserArgs = {
  login: Scalars["String"];
};

/** A repository contains the content for a project. */
export type Repository = RepositoryInfo &
  Starrable &
  UniformResourceLocatable & {
    __typename?: "Repository";
    /** The description of the repository. */
    description?: Maybe<Scalars["String"]>;
    /** The description of the repository rendered to HTML. */
    descriptionHTML: Scalars["HTML"];
    /** Returns how many forks there are of this repository in the whole network. */
    forkCount: Scalars["Int"];
    /** A list of direct forked repositories. */
    forks: RepositoryConnection;
    /** The repository's URL. */
    homepageUrl?: Maybe<Scalars["URI"]>;
    /** Identifies if the repository is a fork. */
    isFork: Scalars["Boolean"];
    /** The name of the repository. */
    name: Scalars["String"];
    /** The repository's name with owner. */
    nameWithOwner: Scalars["String"];
    /** The User owner of the repository. */
    owner: RepositoryOwner;
    /** The repository parent, if this is a fork. */
    parent?: Maybe<Repository>;
    /** The primary language of the repository's code. */
    primaryLanguage?: Maybe<Language>;
    /** The HTTP path for this repository */
    resourcePath: Scalars["URI"];
    /** A description of the repository, rendered to HTML without any links in it. */
    shortDescriptionHTML: Scalars["HTML"];
    /** The SSH URL to clone this repository */
    sshUrl: Scalars["GitSSHRemote"];
    /** A list of users who have starred this starrable. */
    stargazers: StargazerConnection;
    /** The HTTP URL for this repository */
    url: Scalars["URI"];
  };

/** A repository contains the content for a project. */
export type RepositoryShortDescriptionHtmlArgs = {
  limit?: Maybe<Scalars["Int"]>;
};

/** A list of repositories owned by the subject. */
export type RepositoryConnection = {
  __typename?: "RepositoryConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** A subset of repository info. */
export type RepositoryInfo = {
  /** The description of the repository. */
  description?: Maybe<Scalars["String"]>;
  /** The description of the repository rendered to HTML. */
  descriptionHTML: Scalars["HTML"];
  /** Returns how many forks there are of this repository in the whole network. */
  forkCount: Scalars["Int"];
  /** The repository's URL. */
  homepageUrl?: Maybe<Scalars["URI"]>;
  /** Identifies if the repository is a fork. */
  isFork: Scalars["Boolean"];
  /** The name of the repository. */
  name: Scalars["String"];
  /** The repository's name with owner. */
  nameWithOwner: Scalars["String"];
  /** The User owner of the repository. */
  owner: RepositoryOwner;
  /** The HTTP path for this repository */
  resourcePath: Scalars["URI"];
  /** A description of the repository, rendered to HTML without any links in it. */
  shortDescriptionHTML: Scalars["HTML"];
  /** The HTTP URL for this repository */
  url: Scalars["URI"];
};

/** A subset of repository info. */
export type RepositoryInfoShortDescriptionHtmlArgs = {
  limit?: Maybe<Scalars["Int"]>;
};

/** The connection type for User. */
export type StargazerConnection = {
  __typename?: "StargazerConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** Things that can be starred. */
export type Starrable = {
  /** A list of users who have starred this starrable. */
  stargazers: StargazerConnection;
};

/** Represents a type that can be retrieved by a URL. */
export type UniformResourceLocatable = {
  /** The HTML path to this resource. */
  resourcePath: Scalars["URI"];
  /** The URL to this resource. */
  url: Scalars["URI"];
};

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type User = Actor &
  ProfileOwner &
  UniformResourceLocatable & {
    __typename?: "User";
    /** A URL pointing to the user's public avatar. */
    avatarUrl: Scalars["URI"];
    /** The user's public profile bio. */
    bio?: Maybe<Scalars["String"]>;
    /** The user's public profile bio as HTML. */
    bioHTML: Scalars["HTML"];
    /** The user's public profile company. */
    company?: Maybe<Scalars["String"]>;
    /** The user's public profile company as HTML. */
    companyHTML: Scalars["HTML"];
    /** The user's publicly visible profile email. */
    email: Scalars["String"];
    /** The user's public profile location. */
    location?: Maybe<Scalars["String"]>;
    /** The username used to login. */
    login: Scalars["String"];
    /** The user's public profile name. */
    name?: Maybe<Scalars["String"]>;
    /** A list of repositories and gists this profile owner has pinned to their profile */
    pinnedItems: PinnableItemConnection;
    /** The HTTP path for this user */
    resourcePath: Scalars["URI"];
    /** The user's description of what they're currently doing. */
    status?: Maybe<UserStatus>;
    /** The user's Twitter username. */
    twitterUsername?: Maybe<Scalars["String"]>;
    /** The HTTP URL for this user */
    url: Scalars["URI"];
    /** A URL pointing to the user's public website/blog. */
    websiteUrl?: Maybe<Scalars["URI"]>;
  };

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type UserAvatarUrlArgs = {
  size?: Maybe<Scalars["Int"]>;
};

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type UserPinnedItemsArgs = {
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  types?: Maybe<Array<PinnableItemType>>;
};

/** The user's description of what they're currently doing. */
export type UserStatus = {
  __typename?: "UserStatus";
  /** An emoji summarizing the user's status. */
  emoji?: Maybe<Scalars["String"]>;
  /** The status emoji as HTML. */
  emojiHTML?: Maybe<Scalars["HTML"]>;
  /** A brief message describing what the user is doing. */
  message?: Maybe<Scalars["String"]>;
  /** The user who has this status. */
  user: User;
};

/** Represents an owner of a Repository. */
export type RepositoryOwner = {
  /** A URL pointing to the owner's public avatar. */
  avatarUrl: Scalars["URI"];
  id: Scalars["ID"];
  /** The username used to login. */
  login: Scalars["String"];
  /** The HTTP URL for the owner. */
  resourcePath: Scalars["URI"];
  /** The HTTP URL for the owner. */
  url: Scalars["URI"];
};

/** Represents an owner of a Repository. */
export type RepositoryOwnerAvatarUrlArgs = {
  size?: Maybe<Scalars["Int"]>;
};

export type UserQueryVariables = Exact<{
  login: Scalars["String"];
}>;

export type UserQuery = { __typename?: "Query" } & {
  user?: Maybe<{ __typename?: "User" } & Pick<User, "login" | "name" | "bio">>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Actor: ResolversTypes["User"];
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Gist: ResolverTypeWrapper<Gist>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  GistConnection: ResolverTypeWrapper<GistConnection>;
  GitSSHRemote: ResolverTypeWrapper<Scalars["GitSSHRemote"]>;
  HTML: ResolverTypeWrapper<Scalars["HTML"]>;
  Language: ResolverTypeWrapper<Language>;
  Node: ResolversTypes["Gist"];
  PinnableItem: ResolversTypes["Gist"] | ResolversTypes["Repository"];
  PinnableItemConnection: ResolverTypeWrapper<
    Omit<PinnableItemConnection, "nodes"> & {
      nodes?: Maybe<Array<Maybe<ResolversTypes["PinnableItem"]>>>;
    }
  >;
  PinnableItemType: PinnableItemType;
  ProfileOwner: ResolversTypes["User"];
  Query: ResolverTypeWrapper<{}>;
  Repository: ResolverTypeWrapper<Repository>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  RepositoryConnection: ResolverTypeWrapper<RepositoryConnection>;
  RepositoryInfo: ResolversTypes["Repository"];
  StargazerConnection: ResolverTypeWrapper<StargazerConnection>;
  Starrable: ResolversTypes["Gist"] | ResolversTypes["Repository"];
  URI: ResolverTypeWrapper<Scalars["URI"]>;
  UniformResourceLocatable:
    | ResolversTypes["Gist"]
    | ResolversTypes["Repository"]
    | ResolversTypes["User"];
  User: ResolverTypeWrapper<User>;
  UserStatus: ResolverTypeWrapper<UserStatus>;
  RepositoryOwner: never;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actor: ResolversParentTypes["User"];
  Int: Scalars["Int"];
  String: Scalars["String"];
  Gist: Gist;
  ID: Scalars["ID"];
  GistConnection: GistConnection;
  GitSSHRemote: Scalars["GitSSHRemote"];
  HTML: Scalars["HTML"];
  Language: Language;
  Node: ResolversParentTypes["Gist"];
  PinnableItem:
    | ResolversParentTypes["Gist"]
    | ResolversParentTypes["Repository"];
  PinnableItemConnection: Omit<PinnableItemConnection, "nodes"> & {
    nodes?: Maybe<Array<Maybe<ResolversParentTypes["PinnableItem"]>>>;
  };
  ProfileOwner: ResolversParentTypes["User"];
  Query: {};
  Repository: Repository;
  Boolean: Scalars["Boolean"];
  RepositoryConnection: RepositoryConnection;
  RepositoryInfo: ResolversParentTypes["Repository"];
  StargazerConnection: StargazerConnection;
  Starrable: ResolversParentTypes["Gist"] | ResolversParentTypes["Repository"];
  URI: Scalars["URI"];
  UniformResourceLocatable:
    | ResolversParentTypes["Gist"]
    | ResolversParentTypes["Repository"]
    | ResolversParentTypes["User"];
  User: User;
  UserStatus: UserStatus;
  RepositoryOwner: never;
}>;

export type ActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Actor"] = ResolversParentTypes["Actor"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  avatarUrl?: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<ActorAvatarUrlArgs, never>
  >;
  login?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type GistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Gist"] = ResolversParentTypes["Gist"]
> = ResolversObject<{
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  forks?: Resolver<ResolversTypes["GistConnection"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<
    Maybe<ResolversTypes["RepositoryOwner"]>,
    ParentType,
    ContextType
  >;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  stargazers?: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GistConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GistConnection"] = ResolversParentTypes["GistConnection"]
> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface GitSshRemoteScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["GitSSHRemote"], any> {
  name: "GitSSHRemote";
}

export interface HtmlScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HTML"], any> {
  name: "HTML";
}

export type LanguageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Language"] = ResolversParentTypes["Language"]
> = ResolversObject<{
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Gist", ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
}>;

export type PinnableItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PinnableItem"] = ResolversParentTypes["PinnableItem"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Gist" | "Repository", ParentType, ContextType>;
}>;

export type PinnableItemConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PinnableItemConnection"] = ResolversParentTypes["PinnableItemConnection"]
> = ResolversObject<{
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PinnableItem"]>>>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ProfileOwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProfileOwner"] = ResolversParentTypes["ProfileOwner"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pinnedItems?: Resolver<
    ResolversTypes["PinnableItemConnection"],
    ParentType,
    ContextType,
    RequireFields<ProfileOwnerPinnedItemsArgs, never>
  >;
  websiteUrl?: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "login">
  >;
}>;

export type RepositoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Repository"] = ResolversParentTypes["Repository"]
> = ResolversObject<{
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  descriptionHTML?: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  forkCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  forks?: Resolver<
    ResolversTypes["RepositoryConnection"],
    ParentType,
    ContextType
  >;
  homepageUrl?: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
  isFork?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nameWithOwner?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["RepositoryOwner"], ParentType, ContextType>;
  parent?: Resolver<
    Maybe<ResolversTypes["Repository"]>,
    ParentType,
    ContextType
  >;
  primaryLanguage?: Resolver<
    Maybe<ResolversTypes["Language"]>,
    ParentType,
    ContextType
  >;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  shortDescriptionHTML?: Resolver<
    ResolversTypes["HTML"],
    ParentType,
    ContextType,
    RequireFields<RepositoryShortDescriptionHtmlArgs, "limit">
  >;
  sshUrl?: Resolver<ResolversTypes["GitSSHRemote"], ParentType, ContextType>;
  stargazers?: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RepositoryConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryConnection"] = ResolversParentTypes["RepositoryConnection"]
> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RepositoryInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryInfo"] = ResolversParentTypes["RepositoryInfo"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Repository", ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  descriptionHTML?: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  forkCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  homepageUrl?: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
  isFork?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nameWithOwner?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["RepositoryOwner"], ParentType, ContextType>;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  shortDescriptionHTML?: Resolver<
    ResolversTypes["HTML"],
    ParentType,
    ContextType,
    RequireFields<RepositoryInfoShortDescriptionHtmlArgs, "limit">
  >;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type StargazerConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StargazerConnection"] = ResolversParentTypes["StargazerConnection"]
> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StarrableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Starrable"] = ResolversParentTypes["Starrable"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Gist" | "Repository", ParentType, ContextType>;
  stargazers?: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType
  >;
}>;

export interface UriScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["URI"], any> {
  name: "URI";
}

export type UniformResourceLocatableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UniformResourceLocatable"] = ResolversParentTypes["UniformResourceLocatable"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "Gist" | "Repository" | "User",
    ParentType,
    ContextType
  >;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  avatarUrl?: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<UserAvatarUrlArgs, never>
  >;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bioHTML?: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  companyHTML?: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pinnedItems?: Resolver<
    ResolversTypes["PinnableItemConnection"],
    ParentType,
    ContextType,
    RequireFields<UserPinnedItemsArgs, never>
  >;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["UserStatus"]>,
    ParentType,
    ContextType
  >;
  twitterUsername?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  websiteUrl?: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserStatus"] = ResolversParentTypes["UserStatus"]
> = ResolversObject<{
  emoji?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  emojiHTML?: Resolver<Maybe<ResolversTypes["HTML"]>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type RepositoryOwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryOwner"] = ResolversParentTypes["RepositoryOwner"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  avatarUrl?: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<RepositoryOwnerAvatarUrlArgs, never>
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  login?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  resourcePath?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Actor?: ActorResolvers<ContextType>;
  Gist?: GistResolvers<ContextType>;
  GistConnection?: GistConnectionResolvers<ContextType>;
  GitSSHRemote?: GraphQLScalarType;
  HTML?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PinnableItem?: PinnableItemResolvers<ContextType>;
  PinnableItemConnection?: PinnableItemConnectionResolvers<ContextType>;
  ProfileOwner?: ProfileOwnerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Repository?: RepositoryResolvers<ContextType>;
  RepositoryConnection?: RepositoryConnectionResolvers<ContextType>;
  RepositoryInfo?: RepositoryInfoResolvers<ContextType>;
  StargazerConnection?: StargazerConnectionResolvers<ContextType>;
  Starrable?: StarrableResolvers<ContextType>;
  URI?: GraphQLScalarType;
  UniformResourceLocatable?: UniformResourceLocatableResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStatus?: UserStatusResolvers<ContextType>;
  RepositoryOwner?: RepositoryOwnerResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export const UserDocument = gql`
  query user($login: String!) {
    user(login: $login) {
      login
      name
      bio
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>,
) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions,
  );
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions,
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
