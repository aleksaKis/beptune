#!/usr/bin/env
import { parseDirectory } from "./parser";
import {
  args,
  validateArguments,
  SpecificationKeys,
  promptForAlbum,
  openAlbumInBrowser,
  introduce,
} from "./cli";
import { DEFAULT_DATA_PATH } from "./utils/constants";
import { fetchSpotifyAlbum } from "./spotify";

export const APP = "Tunlink";

async function main() {
  validateArguments(args);
  introduce();
  const path = args[SpecificationKeys.PATH] || DEFAULT_DATA_PATH;
  const playlist = parseDirectory(path);
  const chosenAlbum = await promptForAlbum(playlist);
  if (!chosenAlbum || !chosenAlbum.value) {
    return;
  }
  const spotifyData = await fetchSpotifyAlbum(chosenAlbum.value);
  spotifyData && (await openAlbumInBrowser(spotifyData.url));
}

main().then();
