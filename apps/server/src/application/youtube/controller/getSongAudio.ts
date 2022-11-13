import { useHttpHandler } from '@app/middleware';
import { getAudioInfo } from '@app/utils';
import type { Request, Response } from '@gln-libs/node-infrastructure';

import type { TAudioResponse } from '../interface';

async function getAudio(yId: string): Promise<TAudioResponse> {
  try {
    const { audio } = await getAudioInfo(yId);

    return { audioUrl: audio.url };
  } catch (error) {
    return {
      message: error.message,
      audioUrl: null,
    };
  }
}

export const getSongAudio = useHttpHandler(
  async (req: Request, res: Response) => {
    const { yId } = req.params;

    const result = await getAudio(yId);

    res.resSuccess(result);
  }
);
