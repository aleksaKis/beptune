import fs from "fs";
import path from "path";
import { Playlist } from "./types";
import { showError } from "../cli";

const playlist: string[] = [];

const readDirectory = (directoryPath: string): Playlist | undefined => {
  try {
    const dir = fs.readdirSync(directoryPath, { withFileTypes: true });
    if (!dir || !dir.length) {
      return;
    }
    for (const item of dir) {
      if (item.isDirectory()) {
        playlist.push(item.name);
        readDirectory(path.join(directoryPath, item.name));
      }
    }
    return [];
  } catch (error) {
    return undefined;
  }
};

/*
 * Recursively runs through items of provided path and returns Playlist
 * @param path: string
 */
export const parseDirectory = (path: string): Playlist => {
  readDirectory(path);
  if (!playlist || !playlist.length) {
    showError("Empty directory: Could not find albums");
    throw new Error();
  }
  return playlist;
};
