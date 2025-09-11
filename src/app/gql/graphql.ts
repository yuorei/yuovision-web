/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = Node & {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  video: Video;
};

export type CutVideoInput = {
  EndTime: Scalars['Int']['input'];
  StartTime: Scalars['Int']['input'];
  VideoID: Scalars['ID']['input'];
};

export type CutVideoPayload = {
  __typename?: 'CutVideoPayload';
  cutVideoURL: Scalars['String']['output'];
};

export type IncrementWatchCountInput = {
  UserID: Scalars['ID']['input'];
  VideoID: Scalars['ID']['input'];
};

export type IncrementWatchCountPayload = {
  __typename?: 'IncrementWatchCountPayload';
  watchCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  IncrementWatchCount: IncrementWatchCountPayload;
  UploadVideo: VideoPayload;
  _empty?: Maybe<Scalars['String']['output']>;
  postComment: PostCommentPayload;
  registerUser: UserPayload;
  subscribeChannel: SubscriptionPayload;
  unSubscribeChannel: SubscriptionPayload;
};


export type MutationIncrementWatchCountArgs = {
  input: IncrementWatchCountInput;
};


export type MutationUploadVideoArgs = {
  input: UploadVideoInput;
};


export type MutationPostCommentArgs = {
  input: PostCommentInput;
};


export type MutationRegisterUserArgs = {
  input: UserInput;
};


export type MutationSubscribeChannelArgs = {
  input?: InputMaybe<SubscribeChannelInput>;
};


export type MutationUnSubscribeChannelArgs = {
  input?: InputMaybe<SubscribeChannelInput>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PostCommentInput = {
  text: Scalars['String']['input'];
  videoID: Scalars['ID']['input'];
};

export type PostCommentPayload = {
  __typename?: 'PostCommentPayload';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  video: Video;
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  commentsByVideo: Array<Comment>;
  cutVideo: CutVideoPayload;
  node: Node;
  user: User;
  userByAuth: User;
  users: Array<User>;
  video: Video;
  videos: Array<Video>;
  watchCount: Scalars['Int']['output'];
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsByVideoArgs = {
  videoID: Scalars['ID']['input'];
};


export type QueryCutVideoArgs = {
  input: CutVideoInput;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVideoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWatchCountArgs = {
  videoID: Scalars['ID']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Normal = 'NORMAL'
}

export type SubscriptionPayload = {
  __typename?: 'SubscriptionPayload';
  isSuccess: Scalars['Boolean']['output'];
};

export type UploadVideoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isAdult: Scalars['Boolean']['input'];
  isExternalCutout: Scalars['Boolean']['input'];
  isPrivate: Scalars['Boolean']['input'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  thumbnailImage?: InputMaybe<Scalars['Upload']['input']>;
  title: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  isSubscribed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  profileImageURL: Scalars['String']['output'];
  role: Role;
  subscribechannelids: Array<Scalars['ID']['output']>;
  videos: Array<Video>;
};

export type UserInput = {
  isSubscribed: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  role: Role;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  id: Scalars['ID']['output'];
  isSubscribed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  profileImageURL: Scalars['String']['output'];
  role: Role;
  subscribechannelids: Array<Scalars['ID']['output']>;
};

export type Video = Node & {
  __typename?: 'Video';
  Tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAdult: Scalars['Boolean']['output'];
  isExternalCutout: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  thumbnailImageURL: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploader: User;
  videoURL: Scalars['String']['output'];
  watchCount: Scalars['Int']['output'];
};

export type VideoPayload = {
  __typename?: 'VideoPayload';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAdult: Scalars['Boolean']['output'];
  isExternalCutout: Scalars['Boolean']['output'];
  isPrivate: Scalars['Boolean']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  thumbnailImageURL: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploader: User;
  videoURL: Scalars['String']['output'];
  watchCount: Scalars['Int']['output'];
};

export type SubscribeChannelInput = {
  channelID: Scalars['ID']['input'];
};

export type SubscribeChannelMutationVariables = Exact<{
  channelID: Scalars['ID']['input'];
}>;


export type SubscribeChannelMutation = { __typename?: 'Mutation', subscribeChannel: { __typename?: 'SubscriptionPayload', isSuccess: boolean } };

export type UnSubscribeChannelMutationVariables = Exact<{
  channelID: Scalars['ID']['input'];
}>;


export type UnSubscribeChannelMutation = { __typename?: 'Mutation', unSubscribeChannel: { __typename?: 'SubscriptionPayload', isSuccess: boolean } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, profileImageURL: string, subscribechannelids: Array<string>, videos: Array<{ __typename?: 'Video', id: string, videoURL: string, title: string, thumbnailImageURL: string, description?: string | null, createdAt: any, uploader: { __typename?: 'User', id: string, name: string, profileImageURL: string } }> } };

export type GetUserByAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByAuthQuery = { __typename?: 'Query', userByAuth: { __typename?: 'User', id: string, name: string, profileImageURL: string, subscribechannelids: Array<string> } };

export type IncrementWatchCountMutationVariables = Exact<{
  input: IncrementWatchCountInput;
}>;


export type IncrementWatchCountMutation = { __typename?: 'Mutation', IncrementWatchCount: { __typename?: 'IncrementWatchCountPayload', watchCount: number } };

export type CutVideoQueryVariables = Exact<{
  input: CutVideoInput;
}>;


export type CutVideoQuery = { __typename?: 'Query', cutVideo: { __typename?: 'CutVideoPayload', cutVideoURL: string } };

export type GetVideosVerticalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVideosVerticalQuery = { __typename?: 'Query', videos: Array<{ __typename?: 'Video', id: string, videoURL: string, title: string, thumbnailImageURL: string, createdAt: any, watchCount: number, uploader: { __typename?: 'User', id: string, name: string, profileImageURL: string } }> };

export type CommentsByVideoQueryVariables = Exact<{
  videoID: Scalars['ID']['input'];
}>;


export type CommentsByVideoQuery = { __typename?: 'Query', commentsByVideo: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, name: string, profileImageURL: string } }> };

export type PostCommentMutationVariables = Exact<{
  input: PostCommentInput;
}>;


export type PostCommentMutation = { __typename?: 'Mutation', postComment: { __typename?: 'PostCommentPayload', id: string, text: string, createdAt: any, updatedAt: any, video: { __typename?: 'Video', id: string }, user: { __typename?: 'User', id: string, name: string, profileImageURL: string } } };

export type PostComment2MutationVariables = Exact<{
  input: PostCommentInput;
}>;


export type PostComment2Mutation = { __typename?: 'Mutation', postComment: { __typename?: 'PostCommentPayload', id: string, text: string, createdAt: any, user: { __typename?: 'User', id: string, name: string, profileImageURL: string } } };

export type RegisterUserMutationVariables = Exact<{
  input: UserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserPayload', id: string, name: string } };

export type GetVideosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVideosQuery = { __typename?: 'Query', videos: Array<(
    { __typename?: 'Video' }
    & { ' $fragmentRefs'?: { 'VideoFragmentFragment': VideoFragmentFragment } }
  )> };

export type VideoFragmentFragment = { __typename?: 'Video', id: string, videoURL: string, title: string, thumbnailImageURL: string, description?: string | null, Tags?: Array<string | null> | null, isPrivate: boolean, isAdult: boolean, isExternalCutout: boolean, createdAt: any, updatedAt: any, watchCount: number, uploader: { __typename?: 'User', id: string, name: string, profileImageURL: string } } & { ' $fragmentName'?: 'VideoFragmentFragment' };

export type GetVideoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVideoQuery = { __typename?: 'Query', video: (
    { __typename?: 'Video' }
    & { ' $fragmentRefs'?: { 'GetVideoFragmentFragment': GetVideoFragmentFragment } }
  ) };

export type GetVideoFragmentFragment = { __typename?: 'Video', id: string, videoURL: string, title: string, thumbnailImageURL: string, description?: string | null, Tags?: Array<string | null> | null, isPrivate: boolean, isAdult: boolean, isExternalCutout: boolean, createdAt: any, updatedAt: any, watchCount: number, uploader: { __typename?: 'User', id: string, name: string, profileImageURL: string } } & { ' $fragmentName'?: 'GetVideoFragmentFragment' };

export type GetVideoSsrQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetVideoSsrQuery = { __typename?: 'Query', video: { __typename?: 'Video', videoURL: string, title: string, description?: string | null, createdAt: any, thumbnailImageURL: string, uploader: { __typename?: 'User', id: string, name: string, profileImageURL: string } } };

export type UploadVideoMutationVariables = Exact<{
  input: UploadVideoInput;
}>;


export type UploadVideoMutation = { __typename?: 'Mutation', UploadVideo: { __typename?: 'VideoPayload', id: string, videoURL: string, title: string, thumbnailImageURL: string, description?: string | null, createdAt: any, updatedAt: any, uploader: { __typename?: 'User', id: string, name: string } } };

export const VideoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"Tags"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalCutout"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"watchCount"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<VideoFragmentFragment, unknown>;
export const GetVideoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetVideoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"Tags"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalCutout"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"watchCount"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetVideoFragmentFragment, unknown>;
export const SubscribeChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubscribeChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribeChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"channelID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}}]}}]} as unknown as DocumentNode<SubscribeChannelMutation, SubscribeChannelMutationVariables>;
export const UnSubscribeChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnSubscribeChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unSubscribeChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"channelID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSuccess"}}]}}]}}]} as unknown as DocumentNode<UnSubscribeChannelMutation, UnSubscribeChannelMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"subscribechannelids"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserByAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"subscribechannelids"}}]}}]}}]} as unknown as DocumentNode<GetUserByAuthQuery, GetUserByAuthQueryVariables>;
export const IncrementWatchCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncrementWatchCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IncrementWatchCountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"IncrementWatchCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchCount"}}]}}]}}]} as unknown as DocumentNode<IncrementWatchCountMutation, IncrementWatchCountMutationVariables>;
export const CutVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CutVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CutVideoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cutVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cutVideoURL"}}]}}]}}]} as unknown as DocumentNode<CutVideoQuery, CutVideoQueryVariables>;
export const GetVideosVerticalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideosVertical"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"watchCount"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetVideosVerticalQuery, GetVideosVerticalQueryVariables>;
export const CommentsByVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentsByVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentsByVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"videoID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<CommentsByVideoQuery, CommentsByVideoQueryVariables>;
export const PostCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<PostCommentMutation, PostCommentMutationVariables>;
export const PostComment2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostComment2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<PostComment2Mutation, PostComment2MutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"Tags"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalCutout"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"watchCount"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetVideosQuery, GetVideosQueryVariables>;
export const GetVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GetVideoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GetVideoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"Tags"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"isAdult"}},{"kind":"Field","name":{"kind":"Name","value":"isExternalCutout"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"watchCount"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]} as unknown as DocumentNode<GetVideoQuery, GetVideoQueryVariables>;
export const GetVideoSsrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVideoSSR"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetVideoSsrQuery, GetVideoSsrQueryVariables>;
export const UploadVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadVideoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UploadVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UploadVideoMutation, UploadVideoMutationVariables>;