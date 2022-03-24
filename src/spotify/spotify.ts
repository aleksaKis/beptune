import { MetaData } from './types';
import {
  ERROR_MESSAGES,
  logMetadata,
  openAlbumInBrowser,
  prompt,
  showError,
  showInfo,
} from '../cli';
import { Playlist } from '../parser';
import { fetchSpotifyAlbum } from './api';

const openAlbum = async (metadata: MetaData, url: string) => {
  logMetadata(metadata, url);
  showInfo('CRTL + C to quit', 'magenta');
  url && (await openAlbumInBrowser(url));
};

export const promptAndSearch = async (playlist: Playlist): Promise<void> => {
  const chosenAlbum = await prompt(playlist);
  if (!chosenAlbum || !chosenAlbum.value) return;
  const spotifyData = await fetchSpotifyAlbum(chosenAlbum.value);
  if (!spotifyData || !spotifyData?.url) {
    showError(ERROR_MESSAGES.SEARCH_FAIL);
    return;
  }
  const { metadata, url } = spotifyData;
  await openAlbum(metadata, url);
  await promptAndSearch(playlist);
};
