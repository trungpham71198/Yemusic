import { Http } from '@core/domain/repositories/httpAxios';
import { songRepository } from '../repositories/songRepository';
import { httpAxios } from './httpAxios';
import { SongRepository } from '@core/domain/repositories/songRepository';

const client: Http = httpAxios;

export const SongInstance: SongRepository = songRepository(client);
