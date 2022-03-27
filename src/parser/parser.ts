import fs from 'fs';
import path from 'path';
import { Playlist } from './types';
import { showError } from '../cli';
import { ERROR_MESSAGES } from '../cli';

/* List of unwanted folders, albums usually contain like scans, covers...
 * We want to prevent those from getting to our playlist  */
const forbiddenFolders = [
  'covers',
  'cover',
  'scans',
  'scan',
  'tags',
  'photos',
  'artwork',
];

const isForbidden = (directory: string): boolean =>
  forbiddenFolders.indexOf(directory.toLocaleLowerCase()) !== -1;

const readDirectory = (
  directoryPath: string,
  playlist: string[]
): Playlist | undefined => {
  try {
    const dir = fs.readdirSync(directoryPath, { withFileTypes: true });
    if (!dir || !dir.length) return;

    for (const item of dir) {
      if (!item.isDirectory() || isForbidden(item.name)) continue;

      playlist.push(item.name);
      readDirectory(path.join(directoryPath, item.name), playlist);
    }
    return [];
  } catch (error) {
    if (error instanceof Error) {
      showError(error?.message || ERROR_MESSAGES.INVALID_DIRECTORY);
    }
  }
};

/**
 * Recursively runs through items of provided path and returns Playlist
 * @param path {string} path to music library
 **/
export const parseDirectory = (path: string): Playlist => {
  const playlist: string[] = [];
  readDirectory(path, playlist);
  if (!playlist || !playlist.length) {
    throw new Error(ERROR_MESSAGES.EXCLUDED_PATH);
  }
  return playlist;
};
