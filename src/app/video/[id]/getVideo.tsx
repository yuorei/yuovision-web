import { gql } from "@apollo/client";
import { client } from "@/app/apollo/client";
import { GetVideoQueryData } from "@/app/model/video";

const GET_VIDEO_QUERY = gql`
  query GetVideoSSR($id: ID!) {
    video(id: $id) {
      videoURL
      title
      description
      createdAt
      thumbnailImageURL
      uploader {
        id
        name
        profileImageURL
      }
    }
  }
`;

export async function getVideo({ id }: { id: string }) {
  const apolloClient = client;
  try {
    const { data } = await apolloClient.query<GetVideoQueryData>({
      query: GET_VIDEO_QUERY,
      variables: { id },
    });
    if (!data?.video) {
      return null;
    }
    return data.video;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}
