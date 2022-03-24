#!/usr/bin/env node
import { parseDirectory } from './parser';
import { introduce, getDirectoryPath, getScanningText } from './cli';
import { createSpinner } from 'nanospinner';
import { promptAndSearch } from './spotify/spotify';

export const APP = 'Beptune';

const main = async (): Promise<void> => {
  introduce();
  const path = getDirectoryPath();
  const spinner = createSpinner(getScanningText(path)).start();
  const playlist = parseDirectory(path);
  spinner.success();
  await promptAndSearch(playlist);
  spinner.success();
};

main().then(() => {});
