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

/** 로그인 시 입력해야 하는 객체 타입입니다. */
export type ILoginInput = {
  /** 유저 이메일 */
  email: Scalars['String'];
  /** 유저 패스워드 */
  password: Scalars['String'];
};

/** 로그인 성공 시 받을 수 있는 응답 객체 타입입니다. */
export type ILoginResult = {
  __typename?: 'LoginResult';
  /** 로그인 한 유저 객체 */
  user: IUser;
  /** JWT 액세스 토큰 */
  accessToken: Scalars['String'];
  /** JWT 리프레시 토큰 */
  refreshToken: Scalars['String'];
};

export type IMutation = {
  __typename?: 'Mutation';
  /** 로그인 요청 */
  login: ILoginResult;
  /** 회원가입 요청 */
  register: IRegisterResult;
  /** 토큰 리프레시 요청 */
  refreshToken: IRefreshTokenResult;
};

export type IMutationLoginArgs = {
  input: ILoginInput;
};

export type IMutationRegisterArgs = {
  input: IRegisterInput;
};

export type IMutationRefreshTokenArgs = {
  input: IRefreshTokenInput;
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
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** 토큰 리프레시 할 때 입력해야 하는 객체 타입입니다. */
export type IRefreshTokenInput = {
  /** 리프레시 토큰 */
  refreshToken: Scalars['String'];
};

/** 토큰 리프레시 성공 시 받을 수 있는 응답 객체 타입입니다. */
export type IRefreshTokenResult = {
  __typename?: 'RefreshTokenResult';
  /** 새로 발급된 액세스 토큰 */
  accessToken: Scalars['String'];
  /** 새로 발급된 리프레시 토큰 */
  refreshToken: Scalars['String'];
};

/** 회원가입 시 입력해야 하는 객체 타입입니다. */
export type IRegisterInput = {
  /** 유저 이메일 */
  email: Scalars['String'];
  /** 유저 패스워드 */
  password: Scalars['String'];
};

/** 회원가입 성공 시 받을 수 있는 응답 객체 타입입니다. */
export type IRegisterResult = {
  __typename?: 'RegisterResult';
  /** 회원가입 완료된 유저 객체 */
  user: IUser;
};

/** 유저 노드입니다. */
export type IUser = INode & {
  __typename?: 'User';
  id: Scalars['ID'];
  /** 유저 이메일 */
  email: Scalars['String'];
};

/** A connection to a list of items. */
export type IUserConnection = {
  __typename?: 'UserConnection';
  /** Information to aid in pagination. */
  pageInfo: IPageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IUserEdge>>>;
};

/** An edge in a connection. */
export type IUserEdge = {
  __typename?: 'UserEdge';
  /** The item at the end of the edge */
  node?: Maybe<IUser>;
  /** A cursor for use in pagination */
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
  LoginInput: ILoginInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  LoginResult: ResolverTypeWrapper<ILoginResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: IResolversTypes['User'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  PageInfo: ResolverTypeWrapper<IPageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  RefreshTokenInput: IRefreshTokenInput;
  RefreshTokenResult: ResolverTypeWrapper<IRefreshTokenResult>;
  RegisterInput: IRegisterInput;
  RegisterResult: ResolverTypeWrapper<IRegisterResult>;
  User: ResolverTypeWrapper<IUser>;
  UserConnection: ResolverTypeWrapper<IUserConnection>;
  UserEdge: ResolverTypeWrapper<IUserEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  LoginInput: ILoginInput;
  String: Scalars['String'];
  LoginResult: ILoginResult;
  Mutation: {};
  Node: IResolversParentTypes['User'];
  ID: Scalars['ID'];
  PageInfo: IPageInfo;
  Boolean: Scalars['Boolean'];
  Query: {};
  Int: Scalars['Int'];
  RefreshTokenInput: IRefreshTokenInput;
  RefreshTokenResult: IRefreshTokenResult;
  RegisterInput: IRegisterInput;
  RegisterResult: IRegisterResult;
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

export type ILoginResultResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['LoginResult'] = IResolversParentTypes['LoginResult']
> = {
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  accessToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    IResolversTypes['LoginResult'],
    ParentType,
    ContextType,
    RequireFields<IMutationLoginArgs, 'input'>
  >;
  register?: Resolver<
    IResolversTypes['RegisterResult'],
    ParentType,
    ContextType,
    RequireFields<IMutationRegisterArgs, 'input'>
  >;
  refreshToken?: Resolver<
    IResolversTypes['RefreshTokenResult'],
    ParentType,
    ContextType,
    RequireFields<IMutationRefreshTokenArgs, 'input'>
  >;
};

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

export type IRefreshTokenResultResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['RefreshTokenResult'] = IResolversParentTypes['RefreshTokenResult']
> = {
  accessToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IRegisterResultResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['RegisterResult'] = IResolversParentTypes['RegisterResult']
> = {
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']
> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserConnectionResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['UserConnection'] = IResolversParentTypes['UserConnection']
> = {
  pageInfo?: Resolver<IResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<
    Maybe<Array<Maybe<IResolversTypes['UserEdge']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserEdgeResolvers<
  ContextType = OwnContext,
  ParentType extends IResolversParentTypes['UserEdge'] = IResolversParentTypes['UserEdge']
> = {
  node?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>;
  cursor?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = OwnContext> = {
  LoginResult?: ILoginResultResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Node?: INodeResolvers<ContextType>;
  PageInfo?: IPageInfoResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  RefreshTokenResult?: IRefreshTokenResultResolvers<ContextType>;
  RegisterResult?: IRegisterResultResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserConnection?: IUserConnectionResolvers<ContextType>;
  UserEdge?: IUserEdgeResolvers<ContextType>;
};

export type IDirectiveResolvers<ContextType = OwnContext> = {
  connection?: IConnectionDirectiveResolver<any, any, ContextType>;
};
