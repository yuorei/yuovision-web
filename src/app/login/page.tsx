"use client";
import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { gql, useMutation } from "@apollo/client";
import CustomLink from "../components/custom-link";
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

const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const [registerUser] = useMutation(REGISTER_USER);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Firebase認証でログイン
      await signIn(email, password);
      
      // GraphQLでユーザープロファイルを作成（存在しない場合）
      try {
        await registerUser({
          variables: {
            input: {
              name: email.split('@')[0], // メールアドレスからユーザー名を生成
              isSubscribed: false,
              role: "NORMAL",
            },
          },
        });
      } catch (err: any) {
        // ユーザーが既に存在する場合はエラーを無視
        if (!err.message.includes("Duplicate")) {
          console.error("ユーザープロファイル作成エラー:", err);
        }
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setError("メールアドレスかパスワードが間違っています");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
        <div className="mt-4">
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-2 p-3 block w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-2 p-3 block w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 tracking-wide text-gray-900 transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
            >
              ログイン
            </button>
          </div>
          <div className="mt-6">
            <CustomLink href="/register">
              <button className="w-full px-4 py-2 tracking-wide text-gray-900 transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">
                アカウント登録
              </button>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
