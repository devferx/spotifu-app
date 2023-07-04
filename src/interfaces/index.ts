export interface InitialResponse {
  userPlaylists: Playlist[];
  featuredPlaylists: FeaturedPlaylists;
  newReleases: NewReleases;
}

export interface FeaturedPlaylists {
  message: string;
  playlists: Playlists;
}

export interface Playlists {
  href: string;
  items: Playlist[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean | null;
  snapshot_id: string;
  tracks: Tracks;
  type: UserPlaylistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name?: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: OwnerType;
  uri: string;
  name?: string;
}

export enum DisplayName {
  FerQuinterosG = "Fer Quinteros G.",
  Spotify = "Spotify",
}

export enum OwnerType {
  Artist = "artist",
  User = "user",
}

export interface Tracks {
  href: string;
  total: number;
}

export enum UserPlaylistType {
  Playlist = "playlist",
}

export interface NewReleases {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}
