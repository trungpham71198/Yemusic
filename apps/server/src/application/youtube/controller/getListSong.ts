import { useHttpHandler } from '@app/middleware';
import { findVal, formatVideo, getData } from '@app/utils';
import type { Request, Response } from '@gln-libs/node-infrastructure';

import type {
  TSearchResult,
  TSearchVideoInput,
  TSong,
  TVideo,
} from '../interface';

const searchVideo = async ({
  search,
  token,
  apiKey,
}: TSearchVideoInput): Promise<TSearchResult> => {
  let items: TVideo[] = [];
  const songs: TSong[] = [];
  let key: string = apiKey;
  let currentToken;

  // initial songs search
  if (!token) {
    const data = await getData({
      urlString:
        'https://m.youtube.com/results?videoEmbeddable=true&search_query=' +
        encodeURI(search),
    });

    key = data.apiKey;
    currentToken = findVal(data, 'token');
    items = findVal(data, 'itemSectionRenderer')?.contents;
  }
  // more songs
  else {
    const data = await getData({
      urlString:
        'https://www.youtube.com/youtubei/v1/search?key=' +
        key +
        '&token=' +
        token,
    });
    currentToken = findVal(data, 'token');
    items = findVal(data, 'itemSectionRenderer')?.contents;
  }

  for (let i = 0; i < items.length; i++) {
    const formatted: TSong = await formatVideo(items[i], true);
    if (formatted?.yId !== 'didyoumean') {
      songs.push(formatted);
    }
  }

  return {
    songs,
    token: currentToken,
    apiKey: key,
  };
};

export const getListSong = useHttpHandler(
  async (req: Request, res: Response) => {
    const { search, token, apiKey }: TSearchVideoInput = req.body;

    const results = await searchVideo({ search, token, apiKey });

    res.resSuccess(results);
  }
);
