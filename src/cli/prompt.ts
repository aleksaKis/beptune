import prompts from "prompts";
import { Playlist } from "../parser";

/**
 * Prompt user for desired album from playlist and return promise with picked answer
 * @param {Array} playlist array of album titles
 **/
export const prompt = (
  playlist: string[]
): Promise<prompts.Answers<string>> => {
  return prompts({
    type: "autocomplete",
    name: "value",
    message: "Pick an album: ",
    choices: getChooses(playlist),
  });
};

const getChooses = (playlist: Playlist): prompts.Choice[] => {
  return playlist.map((album) => {
    return { title: album };
  });
};
