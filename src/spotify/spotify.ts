import { MetaData } from './types';
import { logMetadata, openInBrowser } from '../cli';
import { fetchSpotifyAlbum } from './api';

const openAlbum = async (metadata: MetaData, url: string) => {
  logMetadata(metadata, url);
  await openInBrowser(url);
};

export const searchSpotify = async (playlist: string): Promise<void> => {
  if (!playlist || !playlist.length) return;
  const spotifyData = await fetchSpotifyAlbum(playlist);
  if (!spotifyData || !spotifyData?.url) {
    return;
  }
  const { metadata, url } = spotifyData;
  await openAlbum(metadata, url);
};
