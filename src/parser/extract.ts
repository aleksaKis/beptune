const YEAR_REGEX_PATTERN = /\d{4}/;

export interface SearchMetaData {
  album: string;
  artist?: string;
  year?: number;
}

/* Extract metadata from album name for more accurate search */
export const extractAlbumMetaData = (folderName: string): SearchMetaData => {
  const [albumWithoutYear, year] = extractYear(folderName);
  const [album, artist] = extractArtist(albumWithoutYear);
  return { year, artist, album };
};

const extractYear = (folderName: string): [string, number] | [string] => {
  const yearMatch = folderName.match(YEAR_REGEX_PATTERN);
  const year = yearMatch && yearMatch[0];
  if (year) {
    return [folderName.replace(year, ""), +year];
  }
  return [folderName];
};

const extractArtist = (
  albumWithoutYear: string
): [string, string] | [string] => {
  const splitAlbum = albumWithoutYear.split("-");
  if (splitAlbum.length >= 2) {
    return [splitAlbum[1].trim(), splitAlbum[0].trim().replace("-", "")];
  }
  return [albumWithoutYear];
};
