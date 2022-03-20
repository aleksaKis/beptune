#!/usr/bin/env node
import { parseDirectory, Playlist } from './parser';
import {
  prompt,
  openAlbumInBrowser,
  introduce,
  getDirectoryPath,
  logMetadata,
  getScanningText,
  showError,
  showInfo,
} from './cli';
import { fetchSpotifyAlbum, MetaData } from './spotify';
import { createSpinner } from 'nanospinner';
import { ERROR_MESSAGES } from './cli';

export const APP = 'Tunlink';

const openAlbum = async (metadata: MetaData, url: string) => {
  logMetadata(metadata, url);
  showInfo('CRTL + C to quit', 'magenta');
  url && (await openAlbumInBrowser(url));
};

const promptAndSearch = async (playlist: Playlist): Promise<void> => {
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

const main = async (): Promise<void> => {
  introduce();
  const path = getDirectoryPath();
  const spinner = createSpinner(getScanningText(path)).start();
  const playlist = parseDirectory(path);
  spinner.success();
  await promptAndSearch(playlist);
  spinner.success();
};

main().then();
