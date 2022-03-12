export interface MetaData {
  artist: string;
  name: string;
  date: string;
}

export interface ExtractedAlbumData {
  url: string;
  metadata: MetaData;
}

export interface Album {
  external_urls: {
    spotify: string;
  };
  name: string;
  date: string;
  artists: { name: string }[];
  release_date: string;
}
