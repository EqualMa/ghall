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
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
  HTML: string;
  /** An RFC 3986, RFC 3987, and RFC 6570 (level 4) compliant URI string. */
  URI: string;
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
  size: Maybe<Scalars["Int"]>;
};

/** A Gist. */
export type Gist = Node &
  Starrable &
  UniformResourceLocatable & {
    __typename?: "Gist";
    /** The gist description. */
    description: Maybe<Scalars["String"]>;
    /** A list of forks associated with the gist */
    forks: GistConnection;
    id: Scalars["ID"];
    /** The gist name. */
    name: Scalars["String"];
    /** The gist owner. */
    owner: Maybe<RepositoryOwner>;
    /** The HTML path to this resource. */
    resourcePath: Scalars["URI"];
    /** Returns a count of how many stargazers there are on this object */
    stargazerCount: Scalars["Int"];
    /** A list of users who have starred this starrable. */
    stargazers: StargazerConnection;
    /** The HTTP URL for this Gist. */
    url: Scalars["URI"];
  };

/** A Gist. */
export type GistForksArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  orderBy: Maybe<GistOrder>;
};

/** A Gist. */
export type GistStargazersArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  orderBy: Maybe<StarOrder>;
};

/** The connection type for Gist. */
export type GistConnection = {
  __typename?: "GistConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** Ordering options for gist connections */
export type GistOrder = {
  /** The ordering direction. */
  direction: OrderDirection;
  /** The field to order repositories by. */
  field: GistOrderField;
};

/** Properties by which gist connections can be ordered. */
export enum GistOrderField {
  /** Order gists by creation time */
  CreatedAt = "CREATED_AT",
  /** Order gists by push time */
  PushedAt = "PUSHED_AT",
  /** Order gists by update time */
  UpdatedAt = "UPDATED_AT",
}

/** Represents a given language found in repositories. */
export type Language = {
  __typename?: "Language";
  /** The color defined for the current language. */
  color: Maybe<Scalars["String"]>;
  /** The name of the current language. */
  name: Scalars["String"];
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars["ID"];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  /** Specifies an ascending order for a given `orderBy` argument. */
  Asc = "ASC",
  /** Specifies a descending order for a given `orderBy` argument. */
  Desc = "DESC",
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars["String"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars["String"]>;
};

/** Types that can be pinned to a profile page. */
export type PinnableItem = Gist | Repository;

/** The connection type for PinnableItem. */
export type PinnableItemConnection = {
  __typename?: "PinnableItemConnection";
  /** A list of edges. */
  edges: Maybe<Array<Maybe<PinnableItemEdge>>>;
  /** A list of nodes. */
  nodes: Maybe<Array<Maybe<PinnableItem>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** An edge in a connection. */
export type PinnableItemEdge = {
  __typename?: "PinnableItemEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Maybe<PinnableItem>;
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
  email: Maybe<Scalars["String"]>;
  /** The public profile location. */
  location: Maybe<Scalars["String"]>;
  /** The username used to login. */
  login: Scalars["String"];
  /** The public profile name. */
  name: Maybe<Scalars["String"]>;
  /** A list of repositories and gists this profile owner has pinned to their profile */
  pinnedItems: PinnableItemConnection;
  /** The public profile website URL. */
  websiteUrl: Maybe<Scalars["URI"]>;
};

/** Represents any entity on GitHub that has a profile page. */
export type ProfileOwnerPinnedItemsArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  types: Maybe<Array<PinnableItemType>>;
};

/** The query root of GitHub's GraphQL interface. */
export type Query = {
  __typename?: "Query";
  /** Lookup a user by login. */
  user: Maybe<User>;
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
    description: Maybe<Scalars["String"]>;
    /** The description of the repository rendered to HTML. */
    descriptionHTML: Scalars["HTML"];
    /** Returns how many forks there are of this repository in the whole network. */
    forkCount: Scalars["Int"];
    /** A list of direct forked repositories. */
    forks: RepositoryConnection;
    /** Identifies if the repository is a fork. */
    isFork: Scalars["Boolean"];
    /** The name of the repository. */
    name: Scalars["String"];
    /** The repository's name with owner. */
    nameWithOwner: Scalars["String"];
    /** The User owner of the repository. */
    owner: RepositoryOwner;
    /** The repository parent, if this is a fork. */
    parent: Maybe<Repository>;
    /** The primary language of the repository's code. */
    primaryLanguage: Maybe<Language>;
    /** The HTTP path for this repository */
    resourcePath: Scalars["URI"];
    /** A description of the repository, rendered to HTML without any links in it. */
    shortDescriptionHTML: Scalars["HTML"];
    /** The SSH URL to clone this repository */
    sshUrl: Scalars["GitSSHRemote"];
    /** Returns a count of how many stargazers there are on this object */
    stargazerCount: Scalars["Int"];
    /** A list of users who have starred this starrable. */
    stargazers: StargazerConnection;
    /** The HTTP URL for this repository */
    url: Scalars["URI"];
  };

/** A repository contains the content for a project. */
export type RepositoryForksArgs = {
  affiliations: Maybe<Array<Maybe<RepositoryAffiliation>>>;
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  isLocked: Maybe<Scalars["Boolean"]>;
  last: Maybe<Scalars["Int"]>;
  orderBy: Maybe<RepositoryOrder>;
  ownerAffiliations?: Maybe<Array<Maybe<RepositoryAffiliation>>>;
  privacy: Maybe<RepositoryPrivacy>;
};

/** A repository contains the content for a project. */
export type RepositoryShortDescriptionHtmlArgs = {
  limit?: Maybe<Scalars["Int"]>;
};

/** A repository contains the content for a project. */
export type RepositoryStargazersArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  orderBy: Maybe<StarOrder>;
};

/** The affiliation of a user to a repository */
export enum RepositoryAffiliation {
  /** Repositories that the user has been added to as a collaborator. */
  Collaborator = "COLLABORATOR",
  /**
   * Repositories that the user has access to through being a member of an
   * organization. This includes every repository on every team that the user is on.
   */
  OrganizationMember = "ORGANIZATION_MEMBER",
  /** Repositories that are owned by the authenticated user. */
  Owner = "OWNER",
}

/** A list of repositories owned by the subject. */
export type RepositoryConnection = {
  __typename?: "RepositoryConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** A subset of repository info. */
export type RepositoryInfo = {
  /** The description of the repository. */
  description: Maybe<Scalars["String"]>;
  /** The description of the repository rendered to HTML. */
  descriptionHTML: Scalars["HTML"];
  /** Returns how many forks there are of this repository in the whole network. */
  forkCount: Scalars["Int"];
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

/** Ordering options for repository connections */
export type RepositoryOrder = {
  /** The ordering direction. */
  direction: OrderDirection;
  /** The field to order repositories by. */
  field: RepositoryOrderField;
};

/** Properties by which repository connections can be ordered. */
export enum RepositoryOrderField {
  /** Order repositories by creation time */
  CreatedAt = "CREATED_AT",
  /** Order repositories by name */
  Name = "NAME",
  /** Order repositories by push time */
  PushedAt = "PUSHED_AT",
  /** Order repositories by number of stargazers */
  Stargazers = "STARGAZERS",
  /** Order repositories by update time */
  UpdatedAt = "UPDATED_AT",
}

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
  size: Maybe<Scalars["Int"]>;
};

/** The privacy of a repository */
export enum RepositoryPrivacy {
  /** Private */
  Private = "PRIVATE",
  /** Public */
  Public = "PUBLIC",
}

/** Ways in which star connections can be ordered. */
export type StarOrder = {
  /** The direction in which to order nodes. */
  direction: OrderDirection;
  /** The field in which to order nodes by. */
  field: StarOrderField;
};

/** Properties by which star connections can be ordered. */
export enum StarOrderField {
  /** Allows ordering a list of stars by when they were created. */
  StarredAt = "STARRED_AT",
}

/** The connection type for User. */
export type StargazerConnection = {
  __typename?: "StargazerConnection";
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars["Int"];
};

/** Things that can be starred. */
export type Starrable = {
  /** Returns a count of how many stargazers there are on this object */
  stargazerCount: Scalars["Int"];
  /** A list of users who have starred this starrable. */
  stargazers: StargazerConnection;
};

/** Things that can be starred. */
export type StarrableStargazersArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  orderBy: Maybe<StarOrder>;
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
  Node &
  ProfileOwner &
  RepositoryOwner &
  UniformResourceLocatable & {
    __typename?: "User";
    /** A URL pointing to the user's public avatar. */
    avatarUrl: Scalars["URI"];
    /** The user's public profile bio. */
    bio: Maybe<Scalars["String"]>;
    /** The user's public profile bio as HTML. */
    bioHTML: Scalars["HTML"];
    /** The user's public profile company. */
    company: Maybe<Scalars["String"]>;
    /** The user's public profile company as HTML. */
    companyHTML: Scalars["HTML"];
    /** Identifies the primary key from the database. */
    databaseId: Maybe<Scalars["Int"]>;
    /** The user's publicly visible profile email. */
    email: Scalars["String"];
    id: Scalars["ID"];
    /** The user's public profile location. */
    location: Maybe<Scalars["String"]>;
    /** The username used to login. */
    login: Scalars["String"];
    /** The user's public profile name. */
    name: Maybe<Scalars["String"]>;
    /** A list of repositories and gists this profile owner has pinned to their profile */
    pinnedItems: PinnableItemConnection;
    /** The HTTP path for this user */
    resourcePath: Scalars["URI"];
    /** The user's description of what they're currently doing. */
    status: Maybe<UserStatus>;
    /** The user's Twitter username. */
    twitterUsername: Maybe<Scalars["String"]>;
    /** The HTTP URL for this user */
    url: Scalars["URI"];
    /** A URL pointing to the user's public website/blog. */
    websiteUrl: Maybe<Scalars["URI"]>;
  };

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type UserAvatarUrlArgs = {
  size: Maybe<Scalars["Int"]>;
};

/** A user is an individual's account on GitHub that owns repositories and can make new content. */
export type UserPinnedItemsArgs = {
  after: Maybe<Scalars["String"]>;
  before: Maybe<Scalars["String"]>;
  first: Maybe<Scalars["Int"]>;
  last: Maybe<Scalars["Int"]>;
  types: Maybe<Array<PinnableItemType>>;
};

/** The user's description of what they're currently doing. */
export type UserStatus = {
  __typename?: "UserStatus";
  /** An emoji summarizing the user's status. */
  emoji: Maybe<Scalars["String"]>;
  /** The status emoji as HTML. */
  emojiHTML: Maybe<Scalars["HTML"]>;
  /** A brief message describing what the user is doing. */
  message: Maybe<Scalars["String"]>;
  /** The user who has this status. */
  user: User;
};

export type UserInfoQueryVariables = Exact<{
  login: Scalars["String"];
  avatarSize: Maybe<Scalars["Int"]>;
}>;

export type UserInfoQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<
      User,
      | "avatarUrl"
      | "bio"
      | "bioHTML"
      | "company"
      | "companyHTML"
      | "databaseId"
      | "email"
      | "id"
      | "location"
      | "login"
      | "name"
      | "resourcePath"
      | "twitterUsername"
      | "url"
      | "websiteUrl"
    > & {
        pinnedItems: { __typename?: "PinnableItemConnection" } & Pick<
          PinnableItemConnection,
          "totalCount"
        > & {
            nodes: Maybe<
              Array<
                Maybe<
                  | ({ __typename: "Gist" } & Pick<
                      Gist,
                      "id" | "name" | "url" | "description"
                    > & {
                        repoOwner: Maybe<
                          { __typename?: "User" } & Pick<
                            User,
                            "login" | "avatarUrl" | "url"
                          >
                        >;
                        stargazers: {
                          __typename?: "StargazerConnection";
                        } & Pick<StargazerConnection, "totalCount">;
                      })
                  | ({ __typename: "Repository" } & Pick<
                      Repository,
                      "name" | "url" | "description" | "forkCount"
                    > & {
                        gistOwner: { __typename?: "User" } & Pick<
                          User,
                          "login" | "avatarUrl" | "url"
                        >;
                      })
                >
              >
            >;
          };
        status: Maybe<
          { __typename?: "UserStatus" } & Pick<
            UserStatus,
            "emoji" | "emojiHTML" | "message"
          > & { user: { __typename?: "User" } & Pick<User, "login"> }
        >;
      }
  >;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
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
  Gist: ResolverTypeWrapper<
    Omit<Gist, "owner"> & { owner: Maybe<ResolversTypes["RepositoryOwner"]> }
  >;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  GistConnection: ResolverTypeWrapper<GistConnection>;
  GistOrder: GistOrder;
  GistOrderField: GistOrderField;
  GitSSHRemote: ResolverTypeWrapper<Scalars["GitSSHRemote"]>;
  HTML: ResolverTypeWrapper<Scalars["HTML"]>;
  Language: ResolverTypeWrapper<Language>;
  Node: ResolversTypes["Gist"] | ResolversTypes["User"];
  OrderDirection: OrderDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  PinnableItem: ResolversTypes["Gist"] | ResolversTypes["Repository"];
  PinnableItemConnection: ResolverTypeWrapper<
    import("./auto-resolvers").PinnableItemConnectionInstanceResolver
  >;
  PinnableItemEdge: ResolverTypeWrapper<
    Omit<PinnableItemEdge, "node"> & {
      node: Maybe<ResolversTypes["PinnableItem"]>;
    }
  >;
  PinnableItemType: PinnableItemType;
  ProfileOwner: ResolversTypes["User"];
  Query: ResolverTypeWrapper<{}>;
  Repository: ResolverTypeWrapper<
    Omit<Repository, "owner" | "parent"> & {
      owner: ResolversTypes["RepositoryOwner"];
      parent: Maybe<ResolversTypes["Repository"]>;
    }
  >;
  RepositoryAffiliation: RepositoryAffiliation;
  RepositoryConnection: ResolverTypeWrapper<RepositoryConnection>;
  RepositoryInfo: ResolversTypes["Repository"];
  RepositoryOrder: RepositoryOrder;
  RepositoryOrderField: RepositoryOrderField;
  RepositoryOwner: ResolverTypeWrapper<
    import("./auto-resolvers").RepositoryOwnerInstanceResolver
  >;
  RepositoryPrivacy: RepositoryPrivacy;
  StarOrder: StarOrder;
  StarOrderField: StarOrderField;
  StargazerConnection: ResolverTypeWrapper<StargazerConnection>;
  Starrable: ResolversTypes["Gist"] | ResolversTypes["Repository"];
  URI: ResolverTypeWrapper<Scalars["URI"]>;
  UniformResourceLocatable:
    | ResolversTypes["Gist"]
    | ResolversTypes["Repository"]
    | ResolversTypes["User"];
  User: ResolverTypeWrapper<import("./auto-resolvers").UserInstanceResolver>;
  UserStatus: ResolverTypeWrapper<
    Omit<UserStatus, "user"> & { user: ResolversTypes["User"] }
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actor: ResolversParentTypes["User"];
  Int: Scalars["Int"];
  String: Scalars["String"];
  Gist: Omit<Gist, "owner"> & {
    owner: Maybe<ResolversParentTypes["RepositoryOwner"]>;
  };
  ID: Scalars["ID"];
  GistConnection: GistConnection;
  GistOrder: GistOrder;
  GitSSHRemote: Scalars["GitSSHRemote"];
  HTML: Scalars["HTML"];
  Language: Language;
  Node: ResolversParentTypes["Gist"] | ResolversParentTypes["User"];
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  PinnableItem:
    | ResolversParentTypes["Gist"]
    | ResolversParentTypes["Repository"];
  PinnableItemConnection: import("./auto-resolvers").PinnableItemConnectionInstanceResolver;
  PinnableItemEdge: Omit<PinnableItemEdge, "node"> & {
    node: Maybe<ResolversParentTypes["PinnableItem"]>;
  };
  ProfileOwner: ResolversParentTypes["User"];
  Query: {};
  Repository: Omit<Repository, "owner" | "parent"> & {
    owner: ResolversParentTypes["RepositoryOwner"];
    parent: Maybe<ResolversParentTypes["Repository"]>;
  };
  RepositoryConnection: RepositoryConnection;
  RepositoryInfo: ResolversParentTypes["Repository"];
  RepositoryOrder: RepositoryOrder;
  RepositoryOwner: import("./auto-resolvers").RepositoryOwnerInstanceResolver;
  StarOrder: StarOrder;
  StargazerConnection: StargazerConnection;
  Starrable: ResolversParentTypes["Gist"] | ResolversParentTypes["Repository"];
  URI: Scalars["URI"];
  UniformResourceLocatable:
    | ResolversParentTypes["Gist"]
    | ResolversParentTypes["Repository"]
    | ResolversParentTypes["User"];
  User: import("./auto-resolvers").UserInstanceResolver;
  UserStatus: Omit<UserStatus, "user"> & { user: ResolversParentTypes["User"] };
}>;

export type ActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Actor"] = ResolversParentTypes["Actor"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  avatarUrl: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<ActorAvatarUrlArgs, never>
  >;
  login: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type GistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Gist"] = ResolversParentTypes["Gist"]
> = ResolversObject<{
  description: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  forks: Resolver<
    ResolversTypes["GistConnection"],
    ParentType,
    ContextType,
    RequireFields<GistForksArgs, never>
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner: Resolver<
    Maybe<ResolversTypes["RepositoryOwner"]>,
    ParentType,
    ContextType
  >;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  stargazerCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stargazers: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType,
    RequireFields<GistStargazersArgs, never>
  >;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GistConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GistConnection"] = ResolversParentTypes["GistConnection"]
> = ResolversObject<{
  totalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  color: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Gist" | "User", ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = ResolversObject<{
  endCursor: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  startCursor: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  edges: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PinnableItemEdge"]>>>,
    ParentType,
    ContextType
  >;
  nodes: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PinnableItem"]>>>,
    ParentType,
    ContextType
  >;
  pageInfo: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PinnableItemEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PinnableItemEdge"] = ResolversParentTypes["PinnableItemEdge"]
> = ResolversObject<{
  cursor: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node: Resolver<
    Maybe<ResolversTypes["PinnableItem"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileOwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProfileOwner"] = ResolversParentTypes["ProfileOwner"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  location: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  login: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pinnedItems: Resolver<
    ResolversTypes["PinnableItemConnection"],
    ParentType,
    ContextType,
    RequireFields<ProfileOwnerPinnedItemsArgs, never>
  >;
  websiteUrl: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  user: Resolver<
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
  description: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  descriptionHTML: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  forkCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  forks: Resolver<
    ResolversTypes["RepositoryConnection"],
    ParentType,
    ContextType,
    RequireFields<RepositoryForksArgs, "ownerAffiliations">
  >;
  isFork: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nameWithOwner: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner: Resolver<ResolversTypes["RepositoryOwner"], ParentType, ContextType>;
  parent: Resolver<
    Maybe<ResolversTypes["Repository"]>,
    ParentType,
    ContextType
  >;
  primaryLanguage: Resolver<
    Maybe<ResolversTypes["Language"]>,
    ParentType,
    ContextType
  >;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  shortDescriptionHTML: Resolver<
    ResolversTypes["HTML"],
    ParentType,
    ContextType,
    RequireFields<RepositoryShortDescriptionHtmlArgs, "limit">
  >;
  sshUrl: Resolver<ResolversTypes["GitSSHRemote"], ParentType, ContextType>;
  stargazerCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stargazers: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType,
    RequireFields<RepositoryStargazersArgs, never>
  >;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepositoryConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryConnection"] = ResolversParentTypes["RepositoryConnection"]
> = ResolversObject<{
  totalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RepositoryInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryInfo"] = ResolversParentTypes["RepositoryInfo"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Repository", ParentType, ContextType>;
  description: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  descriptionHTML: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  forkCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isFork: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nameWithOwner: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner: Resolver<ResolversTypes["RepositoryOwner"], ParentType, ContextType>;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  shortDescriptionHTML: Resolver<
    ResolversTypes["HTML"],
    ParentType,
    ContextType,
    RequireFields<RepositoryInfoShortDescriptionHtmlArgs, "limit">
  >;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type RepositoryOwnerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RepositoryOwner"] = ResolversParentTypes["RepositoryOwner"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"User", ParentType, ContextType>;
  avatarUrl: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<RepositoryOwnerAvatarUrlArgs, never>
  >;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  login: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type StargazerConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StargazerConnection"] = ResolversParentTypes["StargazerConnection"]
> = ResolversObject<{
  totalCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StarrableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Starrable"] = ResolversParentTypes["Starrable"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<"Gist" | "Repository", ParentType, ContextType>;
  stargazerCount: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  stargazers: Resolver<
    ResolversTypes["StargazerConnection"],
    ParentType,
    ContextType,
    RequireFields<StarrableStargazersArgs, never>
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
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  avatarUrl: Resolver<
    ResolversTypes["URI"],
    ParentType,
    ContextType,
    RequireFields<UserAvatarUrlArgs, never>
  >;
  bio: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bioHTML: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  company: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  companyHTML: Resolver<ResolversTypes["HTML"], ParentType, ContextType>;
  databaseId: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  email: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  location: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  login: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pinnedItems: Resolver<
    ResolversTypes["PinnableItemConnection"],
    ParentType,
    ContextType,
    RequireFields<UserPinnedItemsArgs, never>
  >;
  resourcePath: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  status: Resolver<
    Maybe<ResolversTypes["UserStatus"]>,
    ParentType,
    ContextType
  >;
  twitterUsername: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  url: Resolver<ResolversTypes["URI"], ParentType, ContextType>;
  websiteUrl: Resolver<Maybe<ResolversTypes["URI"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserStatus"] = ResolversParentTypes["UserStatus"]
> = ResolversObject<{
  emoji: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  emojiHTML: Resolver<Maybe<ResolversTypes["HTML"]>, ParentType, ContextType>;
  message: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Actor: ActorResolvers<ContextType>;
  Gist: GistResolvers<ContextType>;
  GistConnection: GistConnectionResolvers<ContextType>;
  GitSSHRemote: GraphQLScalarType;
  HTML: GraphQLScalarType;
  Language: LanguageResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  PinnableItem: PinnableItemResolvers<ContextType>;
  PinnableItemConnection: PinnableItemConnectionResolvers<ContextType>;
  PinnableItemEdge: PinnableItemEdgeResolvers<ContextType>;
  ProfileOwner: ProfileOwnerResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Repository: RepositoryResolvers<ContextType>;
  RepositoryConnection: RepositoryConnectionResolvers<ContextType>;
  RepositoryInfo: RepositoryInfoResolvers<ContextType>;
  RepositoryOwner: RepositoryOwnerResolvers<ContextType>;
  StargazerConnection: StargazerConnectionResolvers<ContextType>;
  Starrable: StarrableResolvers<ContextType>;
  URI: GraphQLScalarType;
  UniformResourceLocatable: UniformResourceLocatableResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserStatus: UserStatusResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export const UserInfoDocument = gql`
  query userInfo($login: String!, $avatarSize: Int) {
    user(login: $login) {
      avatarUrl(size: $avatarSize)
      bio
      bioHTML
      company
      companyHTML
      databaseId
      email
      id
      location
      login
      name
      pinnedItems(first: 6) {
        totalCount
        nodes {
          ... on Repository {
            __typename
            name
            url
            description
            gistOwner: owner {
              login
              avatarUrl
              url
            }
            forkCount
          }
          ... on Gist {
            __typename
            id
            name
            repoOwner: owner {
              login
              avatarUrl
              url
            }
            stargazers {
              totalCount
            }
            url
            description
          }
        }
      }
      resourcePath
      status {
        emoji
        emojiHTML
        message
        user {
          login
        }
      }
      twitterUsername
      url
      websiteUrl
    }
  }
`;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      login: // value for 'login'
 *      avatarSize: // value for 'avatarSize'
 *   },
 * });
 */
export function useUserInfoQuery(
  baseOptions: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>,
) {
  return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions,
  );
}
export function useUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >,
) {
  return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions,
  );
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<
  typeof useUserInfoLazyQuery
>;
export type UserInfoQueryResult = Apollo.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>;
