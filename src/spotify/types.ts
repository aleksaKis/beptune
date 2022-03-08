export interface MetaData {
  artist: string;
  name: string;
  date: string;
}

export interface SpotifyAlbum {
  url: string;
  metadata: MetaData;
}
