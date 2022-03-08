import { gainAccessToken } from "./auth";
import axios from "axios";
import { SpotifyAlbum } from "./types";
import { showError } from "../cli";

const SEARCH_BASE_URL = "https://api.spotify.com/v1/search";
const TRACK_LIMIT = 1;

export const fetchSpotifyAlbum = async (
  name: string
): Promise<SpotifyAlbum | null> => {
  const token = await gainAccessToken();
  try {
    const axiosResponse = await axios.get(
      `${SEARCH_BASE_URL}?type=album&q=${name}&limit=${TRACK_LIMIT}&access_token=${token}`,
      { headers: { accept: "application/json" } }
    );
    const firstItemData = axiosResponse.data.albums.items[0];
    return extractAlbumData(firstItemData);
  } catch (error) {
    showError(error);
  }
  return null;
};

// @Todo fix any, add spotify search response type
const extractAlbumData = (data: any): SpotifyAlbum => {
  const url = data.external_urls.spotify;
  const metadata = {
    artist: data.artists[0].name,
    name: data.name,
    date: data.release_date,
  };
  return { url, metadata };
};
