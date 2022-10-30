import type { AxiosRequestConfig } from 'axios';

import type { IPlayerControls, ISong } from '../models/song';

export interface SongRepository {
  getSongByKeyword: (
    songId: string | number,
    config?: AxiosRequestConfig
  ) => Promise<ISong[] | []>;
  getAudioBySongId: (
    songId: string
  ) => Promise<Pick<IPlayerControls, 'audioUrl'>>;
  getSongTrending: () => Promise<ISong[] | []>;
}
