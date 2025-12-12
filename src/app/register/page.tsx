"use client";
import React, { useState, ChangeEvent } from "react";
import { useAuth } from "../providers/AuthProvider";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import LoadingPage from "../components/loading";
import ErrorPage from "../components/error";

const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    registerUser(input: $input) {
      id
      name
    }
  }
`;

export default function CreateUserPage() {
  const { signUp } = useAuth();
  const [registerUser] = useMutation(REGISTER_USER);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    profileImage: null as Blob | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (name === "profileImage" && files) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Firebase認証でユーザー作成
      await signUp(formData.email, formData.password);
      
      // GraphQLでユーザープロファイル作成
      await registerUser({
        variables: {
          input: {
            name: formData.username,
            isSubscribed: false,
            role: "NORMAL",
          },
        },
      });

      window.location.href = "/";
    } catch (e) {
      console.error("ユーザー作成エラー:", e);
      setError("ユーザー作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          ユーザー作成
        </h1>
        <div className="space-y-4">
          {/* ... 他のフォーム要素 ... */}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="名"
            className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="姓"
            className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="メールアドレス"
            className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="ユーザー名"
            className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="パスワード"
            className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
          <input
            type="file"
            name="profileImage"
            onChange={handleInputChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="サムネイル画像プレビュー"
              className="mt-4 w-32 h-32 object-cover rounded-full"
            />
          )}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:bg-blue-700"
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
