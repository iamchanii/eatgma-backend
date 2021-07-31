import { OwnContext } from './context';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
};

export type INode = {
  id: Scalars['ID'];
};

export type IPageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type IQuery = {
  __typename?: 'Query';
  ping: Scalars['String'];
  users?: Maybe<IUserConnection>;
};

export type IQueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type IUser = INode & {
  __typename?: 'User';
  id: Scalars['ID'];
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type IUserConnection = {
  __typename?: 'UserConnection';
  edges: Array<IUserEdge>;
  pageInfo: IPageInfo;
};

export type IUserEdge = {
  __typename?: 'UserEdge';
  node: IUser;
  cursor: Scalars['String'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

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
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
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
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
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
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Node: IResolversTypes['User'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  PageInfo: ResolverTypeWrapper<IPageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  User: ResolverTypeWrapper<IUser>;
  UserConnection: ResolverTypeWrapper<IUserConnection>;
  UserEdge: ResolverTypeWrapper<IUserEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Node: IResolversParentTypes['User'];
  ID: Scalars['ID'];
  PageInfo: IPageInfo;
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  Query: {};
  Int: Scalars['Int'];
  User: IUser;
  UserConnection: IUserConnection;
  UserEdge: IUserEdge;
};

export type IConnectionDirectiveArgs = {};

export type IConnectionDirectiveResolver<
  Result,
  Parent,
  ContextType = OwnContext,
  Args = IConnectionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type INodeResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['Node'] = IResolversParentTypes['Node']
> = {
  __resolveType: TypeResolveFn<'User', ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
};

export type IPageInfoResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['PageInfo'] = IResolversParentTypes['PageInfo']
> = {
  hasPreviousPage?: Resolver<
    IResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  endCursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IQueryResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']
> = {
  ping?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<
    Maybe<IResolversTypes['UserConnection']>,
    ParentType,
    ContextType,
    RequireFields<IQueryUsersArgs, never>
  >;
};

export type IUserResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']
> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  accessToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserConnectionResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['UserConnection'] = IResolversParentTypes['UserConnection']
> = {
  edges?: Resolver<Array<IResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<IResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserEdgeResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['UserEdge'] = IResolversParentTypes['UserEdge']
> = {
  node?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  cursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = OwnContext> = {
  Node?: INodeResolvers<ContextType>;
  PageInfo?: IPageInfoResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserConnection?: IUserConnectionResolvers<ContextType>;
  UserEdge?: IUserEdgeResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = OwnContext> = {
  connection?: IConnectionDirectiveResolver<any, any, ContextType>;
};
