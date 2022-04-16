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

const isForbidden = (directory: string): boolean => {
  return forbiddenFolders.indexOf(directory.toLocaleLowerCase()) !== -1;
};

const getSubdirectories = (directory: fs.Dirent[]): string[] => {
  return directory
    .filter((d) => d.isDirectory() && !isForbidden(d.name))
    .map((item) => item.name);
};

const parserError = (error?: unknown): Error => {
  if (error instanceof Error) {
    showError(error?.message || ERROR_MESSAGES.PARSER_FAIL);
  }
  return new Error(ERROR_MESSAGES.PARSER_FAIL);
};

/**
 * Recursively runs through items of provided path and returns Playlist
 * @param {string} directoryPath path to music library
 * @param {Array} playlist list of album titles
 **/
export const parseDirectory = (
  directoryPath: string,
  playlist: string[] = []
): Playlist => {
  try {
    const _playlist = [...playlist];
    const dir = fs.readdirSync(directoryPath, { withFileTypes: true });
    if (!dir || !dir.length) {
      return _playlist;
    }

    const albumSubdirectories = getSubdirectories(dir);
    _playlist.push(...albumSubdirectories);

    for (const directory of albumSubdirectories) {
      const subDirs = parseDirectory(path.join(directoryPath, directory));
      _playlist.push(...subDirs);
    }

    return _playlist;
  } catch (error) {
    throw parserError(error);
  }
};
