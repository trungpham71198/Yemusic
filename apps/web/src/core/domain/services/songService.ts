import type { ISong } from '../models/song';

export const removeSong = (songs: ISong[], songId: string | number) => {
  return songs.filter((song: ISong) => song.yId !== songId);
};
