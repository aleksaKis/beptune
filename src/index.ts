#!/usr/bin/env node
import { parseDirectory } from './parser';
import { introduce, getDirectoryPath, getScanningText, prompt } from './cli';
import { createSpinner } from 'nanospinner';
import { searchSpotify } from './spotify/spotify';
import { PromptObject } from 'prompts';

export const APP = 'Beptune';

const handleAlbumSubmit = async (
  promptObject: PromptObject,
  album: string
): Promise<void> => {
  await searchSpotify(album);
};

const main = async (): Promise<void> => {
  introduce();
  const path = getDirectoryPath();
  const spinner = createSpinner(getScanningText(path)).start();
  const playlist = parseDirectory(path);
  spinner.success();
  await prompt(playlist, handleAlbumSubmit);
};

main().then();
