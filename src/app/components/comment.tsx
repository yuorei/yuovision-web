"use client";
import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { timeAgo } from "@/app/lib/time";
import CustomLink from "@/app/components/custom-link";
import LoadingPage from "./loading";
import ErrorPage from "./error";

const COMMENTS_BY_VIDEO = gql`
  query CommentsByVideo($videoID: ID!) {
    commentsByVideo(videoID: $videoID) {
      id
      text
      createdAt
      updatedAt
      user {
        id
        name
        profileImageURL
      }
    }
  }
`;

const POST_COMMENT = gql`
  mutation PostComment2($input: PostCommentInput!) {
    postComment(input: $input) {
      id
      text
      createdAt
      user {
        id
        name
        profileImageURL
      }
    }
  }
`;

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    profileImageURL: string;
  };
}

interface CommentsByVideoData {
  commentsByVideo: Comment[];
}

interface CommentsProps {
  videoID: string;
}

const Comments: React.FC<CommentsProps> = ({ videoID }) => {
  const { loading, error, data, refetch } = useQuery<CommentsByVideoData>(
    COMMENTS_BY_VIDEO,
    {
      variables: { videoID },
    }
  );

  const [postComment] = useMutation(POST_COMMENT, {
    onCompleted: () => refetch(),
  });

  const [text, setText] = useState("");
  const [showComments, setShowComments] = useState<boolean>(
    window.innerWidth > 1280
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postComment({
        variables: {
          input: { videoID, text },
        },
      });
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">
        {data?.commentsByVideo.length}件のコメント
      </h2>
      <button
        onClick={toggleComments}
        className="bg-black border border-white text-white font-bold py-2 px-4 rounded"
      >
        {showComments ? "コメントを隠す" : "コメントを表示する"}
      </button>
      {showComments && (
        <>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white placeholder-gray-400"
              rows={4}
              placeholder="コメントする..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              コメント
            </button>
          </form>
          {data &&
            data.commentsByVideo.map((comment) => (
              <div key={comment.id} className="flex items-start mb-4">
                <div className="w-10 h-10 mr-3 rounded-full overflow-hidden">
                  <CustomLink href={`/channel/${comment.user.id}`}>
                    <img
                      src={comment.user.profileImageURL}
                      alt={comment.user.name}
                      className="w-full h-full object-cover"
                    />
                  </CustomLink>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="text-white mr-2">{comment.user.name}</p>
                    <p className="text-gray-400 text-sm">
                      {timeAgo(comment.createdAt)}
                    </p>
                  </div>
                  <p className="text-white">{comment.text}</p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Comments;
