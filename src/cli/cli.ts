import open from 'open';

export const openInBrowser = async (url: string): Promise<void> => {
  await open(url);
};
