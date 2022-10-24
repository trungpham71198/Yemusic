import { IPlayerControls } from '../models/song';
import { ISong } from '../models/song';

export interface SongRepository {
  getSongByKeyword: (songId: string | number) => Promise<ISong[] | []>;
  getAudioBySongId: (
    songId: string
  ) => Promise<Pick<IPlayerControls, 'audioUrl'>>;
  getSongTrending: () => Promise<ISong[] | []>;
}
