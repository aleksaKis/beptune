import { MetaData } from './types';
import {
  ERROR_MESSAGES,
  logMetadata,
  openInBrowser,
  showError,
  showInfo,
} from '../cli';
import { fetchSpotifyAlbum } from './api';

const openAlbum = async (metadata: MetaData, url: string) => {
  logMetadata(metadata, url);
  showInfo('CRTL + C to quit', 'magenta');
  url && (await openInBrowser(url));
};

export const searchSpotify = async (playlist: string): Promise<void> => {
  if (!playlist || !playlist.length) return;
  const spotifyData = await fetchSpotifyAlbum(playlist);
  if (!spotifyData || !spotifyData?.url) {
    showError(ERROR_MESSAGES.SEARCH_FAIL);
    return;
  }
  const { metadata, url } = spotifyData;
  await openAlbum(metadata, url);
};
