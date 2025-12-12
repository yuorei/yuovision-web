import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const POST_COMMENT = gql`
  mutation PostComment($input: PostCommentInput!) {
    postComment(input: $input) {
      id
      video {
        id
      }
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

interface PostCommentInput {
  videoID: string;
  text: string;
}

interface PostCommentPayload {
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

interface PostCommentData {
  postComment: PostCommentPayload;
}

interface CommentFormProps {
  videoID: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ videoID }) => {
  const [text, setText] = useState("");
  const [postComment] = useMutation<
    PostCommentData,
    { input: PostCommentInput }
  >(POST_COMMENT);

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

  return (
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
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
