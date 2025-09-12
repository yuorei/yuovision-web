"use client";
import { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";

interface UploadVideoData {
  UploadVideo: {
    id: string;
    videoURL: string | null;
    title: string;
    thumbnailImageURL: string | null;
    description: string;
    tags: string[];
    isPrivate: boolean;
    isAdult: boolean;
    isExternalCutout: boolean;
    createdAt: string;
    updatedAt: string;
    uploader: {
      id: string;
      name: string;
    };
    processingInfo: {
      id: string;
      videoID: string;
      status: "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED";
      progress: number;
      message: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const UPLOAD_VIDEO_MUTATION = gql`
  mutation UploadVideo($input: UploadVideoInput!) {
    UploadVideo(input: $input) {
      id
      videoURL
      title
      thumbnailImageURL
      description
      createdAt
      updatedAt
      uploader {
        id
        name
      }
      processingInfo {
        id
        videoID
        status
        progress
        message
        createdAt
        updatedAt
      }
    }
  }
`;

const VIDEO_PROCESSING_SUBSCRIPTION = gql`
  subscription VideoProcessingUpdates($videoID: ID!) {
    videoProcessingUpdates(videoID: $videoID) {
      id
      videoID
      status
      progress
      message
      createdAt
      updatedAt
    }
  }
`;

interface VideoProcessingUpdate {
  videoProcessingUpdates: {
    id: string;
    videoID: string;
    status: "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED";
    progress: number;
    message: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Page() {
  const router = useRouter();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadVideo] = useMutation<UploadVideoData>(UPLOAD_VIDEO_MUTATION);
  const [loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [videoData, setVideoData] = useState<UploadVideoData['UploadVideo'] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Subscribe to video processing updates
  const { data: subscriptionData } = useSubscription<VideoProcessingUpdate>(
    VIDEO_PROCESSING_SUBSCRIPTION,
    {
      variables: { videoID: videoData?.id },
      skip: !videoData?.id || videoData?.processingInfo.status === 'COMPLETED',
    }
  );

  // Update video data when receiving subscription updates
  useEffect(() => {
    if (subscriptionData?.videoProcessingUpdates && videoData) {
      const updatedProcessingInfo = subscriptionData.videoProcessingUpdates;
      setVideoData({
        ...videoData,
        processingInfo: updatedProcessingInfo,
      });

      // Auto-redirect when processing is completed
      if (updatedProcessingInfo.status === 'COMPLETED') {
        setTimeout(() => {
          router.push(`/video/${videoData.id}`);
        }, 2000);
      }
    }
  }, [subscriptionData, videoData]);

  const [formData, setFormData] = useState({
    video: null,
    thumbnailImage: null,
    title: "",
    description: "",
    tags: "",
    isPrivate: false,
    isAdult: false,
    isExternalCutout: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (files && files[0]) {
      const file = files[0];
      
      // File size validation (500MB for video, 10MB for image)
      const maxVideoSize = 500 * 1024 * 1024; // 500MB
      const maxImageSize = 10 * 1024 * 1024;  // 10MB
      
      if (name === "video") {
        if (file.size > maxVideoSize) {
          setValidationError("動画ファイルは500MB以下にしてください。");
          return;
        }
        if (!file.type.startsWith('video/')) {
          setValidationError("動画ファイルを選択してください。");
          return;
        }
        setValidationError(null);
        setVideoPreview(URL.createObjectURL(file));
      } else if (name === "thumbnailImage") {
        if (file.size > maxImageSize) {
          setValidationError("画像ファイルは10MB以下にしてください。");
          return;
        }
        if (!file.type.startsWith('image/')) {
          setValidationError("画像ファイルを選択してください。");
          return;
        }
        setValidationError(null);
        setImagePreview(URL.createObjectURL(file));
      }
      
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpload = async () => {
    // Clear previous errors
    setErrorMessage(null);
    setValidationError(null);
    
    // Validation
    if (!formData.video) {
      setValidationError("動画ファイルを選択してください。");
      return;
    }
    
    if (!formData.title.trim()) {
      setValidationError("タイトルを入力してください。");
      return;
    }
    
    if (formData.title.length > 100) {
      setValidationError("タイトルは100文字以下にしてください。");
      return;
    }
    
    setLoading(true);
    const tags = formData.tags.split("#").filter(tag => tag.trim() !== "");
    
    try {
      console.log("フォーム", formData);
      const { data } = await uploadVideo({
        variables: {
          input: {
            video: formData.video,
            thumbnailImage: formData.thumbnailImage,
            title: formData.title,
            description: formData.description,
            tags: tags,
            isPrivate: formData.isPrivate,
            isAdult: formData.isAdult,
            isExternalCutout: formData.isExternalCutout,
          },
        },
        context: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      });

      console.log("アップロード成功:", data?.UploadVideo.id);
      
      // Set upload completion state
      setUploadComplete(true);
      setVideoData(data?.UploadVideo || null);
      
      // If processing is completed, redirect to video page
      if (data?.UploadVideo.processingInfo.status === 'COMPLETED') {
        setTimeout(() => {
          router.push(`/video/${data?.UploadVideo.id}`);
        }, 2000);
      }
    } catch (error) {
      let errorString = error as string;
      console.log(errorString);
      if (errorString == "ApolloError: id is nil") {
        setErrorMessage("再度ログインしてください");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }
      setErrorMessage(errorString);
      console.error("アップロードエラー:", errorString);
    } finally {
      setLoading(false); // ローディングを終了
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'UPLOADED':
        return 'アップロード完了 - 処理待ち中...';
      case 'PROCESSING':
        return '動画を処理中...';
      case 'COMPLETED':
        return '処理完了！動画ページにリダイレクトします...';
      case 'FAILED':
        return '処理に失敗しました。';
      default:
        return 'ステータス不明';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPLOADED':
        return 'text-yellow-400';
      case 'PROCESSING':
        return 'text-blue-400';
      case 'COMPLETED':
        return 'text-green-400';
      case 'FAILED':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  // Show processing status if upload is complete
  if (uploadComplete && videoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="p-8 bg-gray-800 shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            動画処理状況
          </h1>
          
          <div className="text-center mb-6">
            <h2 className="text-xl text-white mb-2">{videoData.title}</h2>
            <div className={`text-lg font-medium ${getStatusColor(videoData.processingInfo.status)}`}>
              {getStatusMessage(videoData.processingInfo.status)}
            </div>
          </div>

          {videoData.processingInfo.status === 'PROCESSING' && (
            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${videoData.processingInfo.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center">
                進行状況: {videoData.processingInfo.progress}%
              </p>
            </div>
          )}

          {videoData.processingInfo.message && (
            <div className="mb-6 p-3 bg-gray-700 rounded-md">
              <p className="text-sm text-gray-300">{videoData.processingInfo.message}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              ホームに戻る
            </button>
            
            {videoData.processingInfo.status === 'COMPLETED' && (
              <button
                onClick={() => router.push(`/video/${videoData.id}`)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                動画を見る
              </button>
            )}
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>動画ID: {videoData.id}</p>
            <p>処理ID: {videoData.processingInfo.id}</p>
          </div>
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          ビデオアップロード
        </h1>
        
        {/* Error Messages */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-800 text-red-200 rounded-md text-sm">
            {validationError}
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-800 text-red-200 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
        
        <div className="mb-6 p-3 bg-gray-700 rounded-md text-sm text-gray-300">
          <p className="font-medium mb-1">アップロード制限:</p>
          <ul className="text-xs space-y-1">
            <li>• 動画ファイル: 最大500MB</li>
            <li>• サムネイル画像: 最大10MB</li>
            <li>• タイトル: 最大100文字</li>
            <li>• アップロード後は自動で動画処理が開始されます</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">動画を選択</h2>
          <div className="mb-4">
            <input
              type="file"
              accept="video/*"
              name="video"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleInputChange}
            />
            {videoPreview && (
              <div className="mt-4">
                <video src={videoPreview} className="w-full" controls />
                {formData.video && (
                  <div className="mt-2 text-sm text-gray-400">
                    ファイルサイズ: {formatFileSize((formData.video as File).size)}
                  </div>
                )}
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold text-white mb-4">
            サムネイル画像を選択
          </h2>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              name="thumbnailImage"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              onChange={handleInputChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="サムネイル画像プレビュー"
                  className="w-full object-cover rounded"
                />
                {formData.thumbnailImage && (
                  <div className="mt-2 text-sm text-gray-400">
                    ファイルサイズ: {formatFileSize((formData.thumbnailImage as File).size)}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="タイトル"
              name="title"
              value={formData.title}
              className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="説明"
              name="description"
              value={formData.description}
              className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="タグ"
              name="tags"
              value={formData.tags}
              className="block w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">
              <input
                type="checkbox"
                name="isPrivate"
                className="mr-2"
                onChange={handleInputChange}
              />
              非公開にする
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">
              <input
                type="checkbox"
                name="isAdult"
                className="mr-2"
                onChange={handleInputChange}
              />
              アダルトコンテンツ
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">
              <input
                type="checkbox"
                name="isExternalCutout"
                className="mr-2"
                onChange={handleInputChange}
              />
              外部カットアウト
            </label>
          </div>
          <button
            onClick={handleUpload}
            className={`w-full px-4 py-2 text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } rounded-md focus:outline-none focus:bg-blue-700`}
            disabled={loading}
          >
            {loading ? "アップロード中..." : "アップロード"}
          </button>
        </div>
      </div>
    </div>
  );
}
