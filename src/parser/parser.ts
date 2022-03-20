import fs from 'fs';
import path from 'path';
import { Playlist } from './types';
import { showError } from '../cli';
import { ERROR_MESSAGES } from '../cli';

const playlist: string[] = [];

/* List of unwanted folders, albums usually contain like scans, covers...
 * We want to prevent those from getting to our playlist  */
const forbiddenFolders = ['covers', 'cover', 'scans', 'tags', 'photos'];

const isForbidden = (directory: string): boolean =>
  forbiddenFolders.indexOf(directory.toLocaleLowerCase()) !== -1;

const readDirectory = (directoryPath: string): Playlist | undefined => {
  try {
    const dir = fs.readdirSync(directoryPath, { withFileTypes: true });
    if (!dir || !dir.length) return;

    for (const item of dir) {
      if (!item.isDirectory() || isForbidden(item.name)) {
        continue;
      }
      playlist.push(item.name);
      readDirectory(path.join(directoryPath, item.name));
    }
    return [];
  } catch (error) {
    return undefined;
  }
};

/*
 * Recursively runs through items of provided path and returns Playlist
 * @param path: string path to playlist folder
 */
export const parseDirectory = (path: string): Playlist => {
  readDirectory(path);
  if (!playlist || !playlist.length) {
    showError(ERROR_MESSAGES.INVALID_DIRECTORY);
    throw new Error();
  }
  return playlist;
};
