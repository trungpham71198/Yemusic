import { Router } from 'express';

import {
  downloadSong,
  getListSong,
  getListSongTrending,
  getSongAudio,
} from './controller';
const youtubeRouter = Router();

youtubeRouter.route('/song/s').post(getListSong);
youtubeRouter.route('/song/:yId').get(getSongAudio);
youtubeRouter.route('/song/trending').post(getListSongTrending);
youtubeRouter.route('/song/:yId/download').get(downloadSong);

export default youtubeRouter;
