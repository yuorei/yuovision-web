import React from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import CommentForm from "./comment-post";
import { timeAgo } from "@/app/lib/time";
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
  const { loading, error, data } = useQuery<CommentsByVideoData>(
    COMMENTS_BY_VIDEO,
    {
      variables: { videoID },
    }
  );

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <CommentForm videoID={videoID} />
      {data &&
        data.commentsByVideo.map((comment) => (
          <div key={comment.id} className="flex items-start mb-4">
            <div className="w-10 h-10 mr-3 rounded-full overflow-hidden">
              <img
                src={comment.user.profileImageURL}
                alt={comment.user.name}
                className="w-full h-full object-cover"
              />
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
    </div>
  );
};

export default Comments;
