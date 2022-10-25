import type { Http } from '@core/domain/repositories/httpAxios';
import type { SongRepository } from '@core/domain/repositories/songRepository';

import { songRepository } from '../repositories/songRepository';
import { httpAxios } from './httpAxios';

const client: Http = httpAxios;

export const SongInstance: SongRepository = songRepository(client);
