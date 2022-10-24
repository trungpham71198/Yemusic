import { array, mixed, number, oneOf, string } from 'vcc-schema';

export type Thumbnails = {
  height: number;
  url: string;
  width: number;
};

export interface ISong {
  yId: string;
  channel: string;
  title: string;
  thumbnail: Thumbnails;
  duration: string;
  view: string;
  publishedAt: string;
}

export interface IPlayerControls extends ISong {
  isPlayed: boolean;
  audioUrl: string;
}

export const searchInput = string();
export const addSongToRecentSearchParamSchema = oneOf([string(), number()]);
export const songSchema = mixed({
  yId: string(),
  title: string(),
  thumbnail: mixed({
    height: number(),
    url: string(),
    width: number(),
  }),
  channel: string(),
  duration: string(),
  publishedAt: string(),
  view: string(),
});
export const songsSchema = array(songSchema);
