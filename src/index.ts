#!/usr/bin/env node
import { parseDirectory } from "./parser";
import {
  promptForAlbum,
  openAlbumInBrowser,
  introduce,
  getArgumentPath,
  logMetadata,
  getSearchText,
  getScanningText,
} from "./cli";
import { fetchSpotifyAlbum } from "./spotify";
import { createSpinner } from "nanospinner";

export const APP = "Tunlink";

async function main() {
  introduce();
  const path = getArgumentPath();
  const spinner = createSpinner(getScanningText(path)).start();
  const playlist = parseDirectory(path);
  spinner.success();
  const chosenAlbum = await promptForAlbum(playlist);
  if (!chosenAlbum || !chosenAlbum.value) {
    return;
  }
  spinner.update({ text: getSearchText(chosenAlbum.value) });
  const spotifyData = await fetchSpotifyAlbum(chosenAlbum.value);
  if (!spotifyData || !spotifyData?.url) {
    return;
  }
  spinner.success();
  logMetadata(spotifyData.metadata, spotifyData.url);
  spotifyData && (await openAlbumInBrowser(spotifyData.url));
}

main().then();
