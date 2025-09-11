/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SubscribeChannel($channelID: ID!) {\n    subscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n": types.SubscribeChannelDocument,
    "\n  mutation UnSubscribeChannel($channelID: ID!) {\n    unSubscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n": types.UnSubscribeChannelDocument,
    "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        description\n        createdAt\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetUserByAuth {\n    userByAuth {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n    }\n  }\n": types.GetUserByAuthDocument,
    "\n  mutation IncrementWatchCount($input: IncrementWatchCountInput!) {\n    IncrementWatchCount(input: $input) {\n      watchCount\n    }\n  }\n": types.IncrementWatchCountDocument,
    "\n  query CutVideo($input: CutVideoInput!) {\n    cutVideo(input: $input) {\n      cutVideoURL\n    }\n  }\n": types.CutVideoDocument,
    "\n    query GetVideosVertical {\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        createdAt\n        watchCount\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  ": types.GetVideosVerticalDocument,
    "\n  query CommentsByVideo($videoID: ID!) {\n    commentsByVideo(videoID: $videoID) {\n      id\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n": types.CommentsByVideoDocument,
    "\n  mutation PostComment($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      video {\n        id\n      }\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n": types.PostCommentDocument,
    "\n  mutation PostComment2($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      text\n      createdAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n": types.PostComment2Document,
    "\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      name\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query GetVideos {\n    videos {\n      ...VideoFragment\n    }\n  }\n": types.GetVideosDocument,
    "\n  fragment VideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n": types.VideoFragmentFragmentDoc,
    "\n  query GetVideo($id: ID!) {\n    video(id: $id) {\n      ...GetVideoFragment\n    }\n  }\n": types.GetVideoDocument,
    "\n  fragment GetVideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n": types.GetVideoFragmentFragmentDoc,
    "\n  query GetVideoSSR($id: ID!) {\n    video(id: $id) {\n      videoURL\n      title\n      description\n      createdAt\n      thumbnailImageURL\n      uploader {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n": types.GetVideoSsrDocument,
    "\n  mutation UploadVideo($input: UploadVideoInput!) {\n    UploadVideo(input: $input) {\n      id\n      videoURL\n      title\n      thumbnailImageURL\n      description\n      createdAt\n      updatedAt\n      uploader {\n        id\n        name\n      }\n    }\n  }\n": types.UploadVideoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SubscribeChannel($channelID: ID!) {\n    subscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n"): (typeof documents)["\n  mutation SubscribeChannel($channelID: ID!) {\n    subscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnSubscribeChannel($channelID: ID!) {\n    unSubscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n"): (typeof documents)["\n  mutation UnSubscribeChannel($channelID: ID!) {\n    unSubscribeChannel(input: { channelID: $channelID }) {\n      isSuccess\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        description\n        createdAt\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        description\n        createdAt\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByAuth {\n    userByAuth {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n    }\n  }\n"): (typeof documents)["\n  query GetUserByAuth {\n    userByAuth {\n      id\n      name\n      profileImageURL\n      subscribechannelids\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation IncrementWatchCount($input: IncrementWatchCountInput!) {\n    IncrementWatchCount(input: $input) {\n      watchCount\n    }\n  }\n"): (typeof documents)["\n  mutation IncrementWatchCount($input: IncrementWatchCountInput!) {\n    IncrementWatchCount(input: $input) {\n      watchCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CutVideo($input: CutVideoInput!) {\n    cutVideo(input: $input) {\n      cutVideoURL\n    }\n  }\n"): (typeof documents)["\n  query CutVideo($input: CutVideoInput!) {\n    cutVideo(input: $input) {\n      cutVideoURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetVideosVertical {\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        createdAt\n        watchCount\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetVideosVertical {\n      videos {\n        id\n        videoURL\n        title\n        thumbnailImageURL\n        createdAt\n        watchCount\n        uploader {\n          id\n          name\n          profileImageURL\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommentsByVideo($videoID: ID!) {\n    commentsByVideo(videoID: $videoID) {\n      id\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query CommentsByVideo($videoID: ID!) {\n    commentsByVideo(videoID: $videoID) {\n      id\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PostComment($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      video {\n        id\n      }\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation PostComment($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      video {\n        id\n      }\n      text\n      createdAt\n      updatedAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PostComment2($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      text\n      createdAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation PostComment2($input: PostCommentInput!) {\n    postComment(input: $input) {\n      id\n      text\n      createdAt\n      user {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($input: UserInput!) {\n    registerUser(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVideos {\n    videos {\n      ...VideoFragment\n    }\n  }\n"): (typeof documents)["\n  query GetVideos {\n    videos {\n      ...VideoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  fragment VideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVideo($id: ID!) {\n    video(id: $id) {\n      ...GetVideoFragment\n    }\n  }\n"): (typeof documents)["\n  query GetVideo($id: ID!) {\n    video(id: $id) {\n      ...GetVideoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetVideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n"): (typeof documents)["\n  fragment GetVideoFragment on Video {\n    id\n    videoURL\n    title\n    thumbnailImageURL\n    description\n    Tags\n    isPrivate\n    isAdult\n    isExternalCutout\n    # ads {\n    #     id\n    #     title\n    # }\n    createdAt\n    updatedAt\n    watchCount\n    uploader {\n      id\n      name\n      profileImageURL\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetVideoSSR($id: ID!) {\n    video(id: $id) {\n      videoURL\n      title\n      description\n      createdAt\n      thumbnailImageURL\n      uploader {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetVideoSSR($id: ID!) {\n    video(id: $id) {\n      videoURL\n      title\n      description\n      createdAt\n      thumbnailImageURL\n      uploader {\n        id\n        name\n        profileImageURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadVideo($input: UploadVideoInput!) {\n    UploadVideo(input: $input) {\n      id\n      videoURL\n      title\n      thumbnailImageURL\n      description\n      createdAt\n      updatedAt\n      uploader {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UploadVideo($input: UploadVideoInput!) {\n    UploadVideo(input: $input) {\n      id\n      videoURL\n      title\n      thumbnailImageURL\n      description\n      createdAt\n      updatedAt\n      uploader {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;