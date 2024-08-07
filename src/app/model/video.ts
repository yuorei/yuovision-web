export interface Video {
    id: string
    title: string
    videoURL: string
    thumbnailImageURL: string
    description?: string
    createdAt: string
    updatedAt: string
    uploader: Uploader
    watchCount: number
}

export interface Uploader {
    id: string
    name: string
    profileImageURL: string
}

export type GetVideoQueryData = {
    video: Video;
};

export type GetVideosQueryData = {
    videos: Video[];
};
