import open from "open";

export const openAlbumInBrowser = async (url: string): Promise<void> => {
  await open(url);
};
