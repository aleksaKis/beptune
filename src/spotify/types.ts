export interface MetaData {
  artist: string;
  name: string;
  year: string;
}

export interface SpotifyAlbum {
  url: string;
  metadata: MetaData;
}
