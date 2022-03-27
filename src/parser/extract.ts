// digit repeat 4 times
const YEAR_REGEX_PATTERN = /\d{4}/;

export interface SearchMetaData {
  album: string;
  artist?: string;
  year?: number;
}

/* Extract metadata from album name for more enhanced search */
export const extractAlbumMetaData = (folderName: string): SearchMetaData => {
  const [albumWithoutYear, year] = extractYear(folderName);
  const [album, artist] = extractArtist(albumWithoutYear);
  return { year, artist, album };
};

/**
 * Extracts year from folder name.
 * When year is found it will be extracted from folder name since it is a different query param
 **/
const extractYear = (folderName: string): [string, number] | [string] => {
  const yearMatch = folderName.match(YEAR_REGEX_PATTERN);
  const year = yearMatch && yearMatch[0];
  if (!year) {
    return [folderName];
  }
  return [folderName.replace(year, ''), +year];
};

/**
 * Extracts artist from folder name, it assumes folder name structure is {Artist} - {Album}
 * When artist is found it returns album title and artist separately otherwise it returns provided folder name
 **/
const extractArtist = (folderName: string): [string, string] | [string] => {
  const splitAlbum = folderName.split('-');
  if (splitAlbum.length < 2) {
    return [folderName];
  }
  return [splitAlbum[1].trim(), splitAlbum[0].trim().replace('-', '')];
};
