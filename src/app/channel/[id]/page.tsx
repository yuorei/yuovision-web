"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { GetUserResponse, GetUserVariables } from "@/app/model/user";
import { Video as videoInterface } from "@/app/model/video";
import Link from "next/link";
import { timeAgo } from "@/app/lib/time";
import LoadingPage from "@/app/components/loading";
import ErrorPage from "@/app/components/error";

const SUBSCRIBE_CHANNEL = gql`
  mutation SubscribeChannel($channelID: ID!) {
    subscribeChannel(input: { channelID: $channelID }) {
      isSuccess
    }
  }
`;

const UNSUBSCRIBE_CHANNEL = gql`
  mutation UnSubscribeChannel($channelID: ID!) {
    unSubscribeChannel(input: { channelID: $channelID }) {
      isSuccess
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      profileImageURL
      subscribechannelids
      videos {
        id
        videoURL
        title
        thumbnailImageURL
        description
        createdAt
        uploader {
          id
          name
          profileImageURL
        }
      }
    }
  }
`;

const GET_USER_BY_AUTH = gql`
  query GetUserByAuth {
    userByAuth {
      id
      name
      profileImageURL
      subscribechannelids
    }
  }
`;

export default function Video({ params }: { params: { id: string } }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1280);

  const [subscribeChannel] = useMutation<
    { subscribeChannel: { isSuccess: boolean } },
    { channelID: string }
  >(SUBSCRIBE_CHANNEL);
  const [unSubscribeChannel] = useMutation<
    { unSubscribeChannel: { isSuccess: boolean } },
    { channelID: string }
  >(UNSUBSCRIBE_CHANNEL);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const {
    loading: uploaderLoading,
    error: uploaderError,
    data: uploaderData,
  } = useQuery<GetUserResponse, GetUserVariables>(GET_USER, {
    variables: { id: params.id },
  });

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery<{ userByAuth: { subscribechannelids: string[]; id: string } | null }>(GET_USER_BY_AUTH);

  useEffect(() => {
    if (userData?.userByAuth && uploaderData?.user) {
      setIsSubscribed(
        userData.userByAuth.subscribechannelids.includes(uploaderData.user.id)
      );
    }
  }, [userData, uploaderData]);

  const handleSubscriptionChange = async (
    channelID: string,
    subscribe: boolean
  ) => {
    try {
      if (subscribe) {
        const response = await subscribeChannel({ variables: { channelID } });
        if (response.data?.subscribeChannel?.isSuccess) {
          console.log("Subscribed successfully");
          setIsSubscribed(true);
          userRefetch(); // Optionally refetch user data
        }
      } else {
        const response = await unSubscribeChannel({ variables: { channelID } });
        if (response.data?.unSubscribeChannel?.isSuccess) {
          console.log("Unsubscribed successfully");
          setIsSubscribed(false);
          userRefetch(); // Optionally refetch user data
        }
      }
    } catch (error) {
      console.error("Error in subscription change:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);
    };

    window.addEventListener("resize", handleResize);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (uploaderLoading || userLoading) return <LoadingPage />;
  if (uploaderError || !uploaderData)
    return (
      <ErrorPage errorMessage={uploaderError?.message || "不明なエラー"} />
    );

  return (
    <main>
      <div className="space-y-2">
        <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg">
          <img
            src={uploaderData.user.profileImageURL}
            alt="Uploader Icon"
            width={200}
            height={200}
            className="rounded-full mr-4 object-cover"
          />
          <div>
            <h3 className="text-white font-semibold text-xl">
              {uploaderData.user.name}
            </h3>
            <p className="text-gray-400">
              {uploaderData.user.videos.length} 本の動画
            </p>
            <div className="mt-2">
              {userData ? (
                <button
                  className={`${
                    isSubscribed
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out`}
                  onClick={() =>
                    handleSubscriptionChange(params.id, !isSubscribed)
                  }
                >
                  {isSubscribed ? "登録済み" : "チャンネル登録"}
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                  onClick={handleLogin}
                >
                  ログイン
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploaderData?.user.videos.map((video: videoInterface) => (
            <Link href={`/video/${video.id}`} key={video.id}>
              <div className="bg-black rounded-lg shadow-md overflow-hidden">
                <Image
                  src={video.thumbnailImageURL}
                  alt={video.title}
                  // layout="responsive" があると widthとheightの値が使えない
                  width={500}
                  height={300}
                  layout="responsive" // 必要に応じてレイアウトを設定
                />
                <div className="p-4 flex items-center">
                  <div>
                    <h3 className="text-white font-semibold text-lg break-words">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {timeAgo(video.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
