import { useHttpHandler } from '@app/middleware';
import { findValByKey, formatVideo, getData } from '@app/utils';
import type { Request, Response } from '@gln-libs/node-infrastructure';

import type { TSong } from '../interface';

async function getVideoTrending(language: {
  hl: 'vn';
  gl: 'VI';
}): Promise<Array<TSong>> {
  const songs: TSong[] = [];
  try {
    const data = await getData({
      language,
      urlString: 'https://www.youtube.com/youtubei/v1/browse',
      method: 'POST',
      reqBody: {
        browseId: 'FEtrending',
        params: process.env.PARAMS_YOUTUBE,
      },
    });

    const dataRes = findValByKey(
      data,
      'contents.twoColumnBrowseResultsRenderer.tabs.1.tabRenderer.content.sectionListRenderer.contents.0.itemSectionRenderer.contents.0.shelfRenderer.content.expandedShelfContentsRenderer.items'
    ) as Array<object>;

    for (let i = 0; i < dataRes.length; i++) {
      const formatted: TSong = await formatVideo(dataRes[i], true);
      if (formatted?.yId !== 'didyoumean') {
        songs.push(formatted);
      }
    }

    return songs;
  } catch (e) {
    return songs;
  }
}

export const getListSongTrending = useHttpHandler(
  async (req: Request, res: Response) => {
    const results = await getVideoTrending(req.body);

    res.resSuccess(results);
  }
);
