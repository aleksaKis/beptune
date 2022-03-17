import { gainAccessToken } from "./auth";
import axios from "axios";
import { Album, ExtractedAlbumData } from "./types";
import { showError } from "../cli";
import { extractAlbumMetaData, SearchMetaData } from "../parser";

const SEARCH_BASE_URL = "https://api.spotify.com/v1/search";
const TRACK_LIMIT = 1;

export const fetchSpotifyAlbum = async (
  name: string
): Promise<ExtractedAlbumData | null> => {
  const token = await gainAccessToken();
  const searchQuery = enhanceSearchQuery(extractAlbumMetaData(name));
  try {
    const axiosResponse = await axios.get(
      `${SEARCH_BASE_URL}${searchQuery}&limit=${TRACK_LIMIT}&access_token=${token}`,
      { headers: { accept: "application/json" } }
    );
    const firstItemData = axiosResponse.data.albums.items[0];
    return firstItemData && extractAlbumData(firstItemData);
  } catch (error) {
    showError(error);
  }
  return null;
};

const enhanceSearchQuery = (data: SearchMetaData): string => {
  const { album, artist, year } = data;
  return `?type=album&q=${album}${artist ? "&artist=" + artist : ""}${
    year ? "&year=" + year : ""
  }`;
};

const extractAlbumData = (data: Album): ExtractedAlbumData => {
  const url = data.external_urls.spotify;
  const metadata = {
    artist: data.artists[0].name,
    name: data.name,
    date: data.release_date,
  };
  return { url, metadata };
};
