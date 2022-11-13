import { useHttpHandler } from '@app/middleware';
import { getAudioInfo, getStreamAudio } from '@app/utils';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import type { Request, Response } from '@gln-libs/node-infrastructure';
import ffmpeg from 'fluent-ffmpeg';

function namingFileMp3(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^\w\s]/g, '')
    .slice(0, 32)
    .trim();
}

async function downloadMp3(yId: string, res: Response) {
  const { info } = await getAudioInfo(yId);

  const fileName = namingFileMp3(info.title);

  res.setHeader('Content-Disposition', `attachment; filename=${fileName}.mp3`);

  ffmpeg.setFfmpegPath(ffmpegPath.path);

  const stream = await getStreamAudio(yId);
  ffmpeg(stream).toFormat('mp3').pipe(res, { end: true });
}

export const downloadSong = useHttpHandler(
  async (req: Request, res: Response): Promise<void> => {
    await downloadMp3(req.params.yId, res);
  }
);
