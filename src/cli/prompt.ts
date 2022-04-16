import prompts, { PromptObject } from 'prompts';
import { Playlist } from '../parser';

/**
 * Prompts user for desired album from playlist and invokes onSubmit callback when album is selected
 * @param {Array} playlist array of album titles
 * @param {Function} onSubmit
 **/
export const prompt = (
  playlist: string[],
  onSubmit: (prompt: PromptObject, answer: string, answers: string[]) => void
): Promise<prompts.Answers<string>> => {
  return prompts(
    {
      type: 'autocomplete',
      name: 'value',
      message: 'Pick an album: ',
      choices: getChooses(playlist),
    },
    { onSubmit }
  );
};

const getChooses = (playlist: Playlist): prompts.Choice[] => {
  return playlist.map((album) => {
    return { title: album };
  });
};
