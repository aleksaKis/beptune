import prompts from "prompts";
import { Playlist } from "../parser/types";

export const promptForAlbum = (
  playlist: string[]
): Promise<prompts.Answers<string>> => {
  return prompts({
    type: "autocomplete",
    name: "value",
    message: "Select album: ",
    choices: getChooses(playlist),
  });
};

const getChooses = (playlist: Playlist): prompts.Choice[] => {
  return playlist.map((album) => {
    return { title: album };
  });
};
