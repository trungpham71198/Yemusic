import type { IPlayerControls, ISong } from '@core/domain/models/song';
import type { Http } from '@core/domain/repositories/httpAxios';
import type { SongRepository } from '@core/domain/repositories/songRepository';

export const songRepository = (client: Http): SongRepository => ({
  getSongByKeyword: async (songId: string | number): Promise<ISong[]> => {
    try {
      const result = await client.post('/song/s', { search: songId });
      return result.data?.songs;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getAudioBySongId: async (
    songId: string
  ): Promise<Pick<IPlayerControls, 'audioUrl'>> => {
    try {
      const result = await client.get('/song/' + songId);
      return result.data;
    } catch (error) {
      console.log(error);
      return { audioUrl: '' };
    }
  },
  getSongTrending: async (): Promise<ISong[]> => {
    try {
      const result = await client.post('/song/trending', {
        hl: 'vi',
        gl: 'VN',
      });
      return result.data?.songs;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
});
