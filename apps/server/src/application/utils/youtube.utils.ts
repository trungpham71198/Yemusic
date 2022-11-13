import { youtubeConfig } from '@app/config';
import type { TDataVideo, TVideo } from '@app/youtube/interface';
import axios from 'axios';
import type { Readable } from 'stream';
import ytdl from 'ytdl-core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findVal(object: object, key: string): any {
  let value;
  // eslint-disable-next-line array-callback-return
  Object.keys(object).some(k => {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = findVal(object[k], key);
      return value !== undefined;
    }
  });

  return value;
}

function decodeHex(hex: string): string {
  return hex
    .replace(/\\x22/g, '"')
    .replace(/\\x7b/g, '{')
    .replace(/\\x7d/g, '}')
    .replace(/\\x5b/g, '[')
    .replace(/\\x5d/g, ']')
    .replace(/\\x3b/g, ';')
    .replace(/\\x3d/g, '=')
    .replace(/\\x27/g, "'")
    .replace(/\\\\/g, 'doubleAntiSlash')
    .replace(/\\/g, '')
    .replace(/doubleAntiSlash/g, '\\');
}

type TParamsData = {
  urlString: string;
  method?: string;
  reqBody?: object;
  language?: object;
};

export async function getData({
  language = { hl: 'vi', gl: 'VN' },
  urlString,
  method = '',
  reqBody = {},
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
TParamsData): Promise<any> {
  // eslint-disable-next-line no-useless-escape
  const dataRegex = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/;
  // const playerRegex = /var\ ytInitialPlayerResponse\ \=\ (.*)id\=\"player\"/s;

  const dateRegex = /publishDate":"(.*)","ownerChannelName/;
  const apiRegex = /"innertubeApiKey":"(.*?)"/;
  const url = new URL(urlString);
  let isAjax = false;
  let isDate = false;
  // const isSubtitles = false;

  if (url.searchParams.get('token')) {
    isAjax = true;
  }
  if (url.searchParams.get('type') === 'date') {
    isDate = true;
  }
  if (url.searchParams.get('type') === 'subtitles') {
    // isSubtitles = true;
  }

  if (method === 'POST') {
    isAjax = true;
  }

  const headers = youtubeConfig.headers;

  if (isAjax) {
    const data = {
      context: {
        client: {
          ...language,
          clientName: 'WEB',
          clientVersion: '2.20210401.08.00',
        },
      },
      continuation: url.searchParams.get('token'),
      ...reqBody,
    };
    return (
      await axios({ method: 'post', url: urlString, data: data, headers })
    ).data;
  } else {
    const body = (await axios({ url: urlString, headers })).data;
    if (isDate) {
      const raw = dateRegex.exec(body)?.[1] || '{}';
      return raw;
    } else {
      const raw = dataRegex.exec(body)?.[1] || '{}';
      const apiKey = apiRegex.exec(body)?.[1] || '';

      const data = JSON.parse(decodeHex(raw));
      data.apiKey = apiKey;
      return data;
    }
  }
}

function getDateFromText(dateTxt: string): Date {
  const unit = {
    second: {
      terms: ['sec', 'Sekun', 'segun'],
      factor: 1,
    },
    minute: {
      terms: ['min'],
      factor: 1000 * 60,
    },
    hour: {
      terms: ['hour', 'heure', 'uur'],
      factor: 1000 * 60 * 60,
    },
    day: {
      terms: ['jour', 'day', 'gio', 'dag', 'tag', 'day'],
      factor: 1000 * 60 * 60 * 24,
    },
    week: {
      terms: ['sem', 'week', 'setti', 'woche'],
      factor: 1000 * 60 * 60 * 24 * 7,
    },
    month: {
      terms: ['mo'],
      factor: 1000 * 60 * 60 * 24 * 7 * 4,
    },
    year: {
      terms: ['an', 'year', 'ja'],
      factor: 1000 * 60 * 60 * 24 * 7 * 4 * 12,
    },
  };
  const digit = parseInt(dateTxt.replace(/\D/g, '')) || 0;

  if (!dateTxt || digit === 0) {
    return new Date(Date.now());
  }

  for (const i in unit) {
    for (const y in unit[i].terms) {
      if (dateTxt.includes(unit[i].terms[y])) {
        const secondsSince = unit[i].factor * digit;
        return new Date(Date.now() - secondsSince);
      }
    }
  }
  return new Date(Date.now());
}

async function getVideoDate(yId: string): Promise<Date> {
  try {
    let publishText: string = (await getData({
      urlString: 'https://m.youtube.com/watch?v=' + yId + '&type=date',
    })) as string;
    publishText.replace('-', '/');
    publishText +=
      ' ' +
      Math.floor(Math.random() * 24) +
      ':' +
      Math.floor(Math.random() * 60) +
      ':' +
      Math.floor(Math.random() * 60);
    return new Date(Date.parse(publishText));
  } catch (e) {
    logger.info('cannot get date for ' + yId + ', try again');
  }
}

type TResVideo = {
  yId: string;
  title: string;
  artist?: string;
  duration: string;
  publishedAt?: Date;
  views?: number;
  thumbnail: object;
  channel: string;
  view: string;
};

export async function formatVideo(
  video: TVideo,
  speedDate = false
): Promise<TResVideo> {
  let resVideo: TResVideo = {
    yId: 'didyoumean',
    title: '',
    artist: '',
    duration: '',
    publishedAt: new Date(Date.now()),
    views: 0,
    thumbnail: {},
    channel: '',
    view: '',
  };

  try {
    const dataVideo: TDataVideo =
      video.compactVideoRenderer ||
      video.gridVideoRenderer ||
      video.videoRenderer ||
      video.playlistVideoRenderer;

    if (dataVideo) {
      const lastThumbnailIdx: number =
        dataVideo.thumbnail?.thumbnails?.length - 1 || 0;

      resVideo = {
        yId: dataVideo.videoId,
        thumbnail: dataVideo.thumbnail?.thumbnails?.[lastThumbnailIdx] || {},
        duration:
          dataVideo.lengthText?.simpleText ||
          dataVideo.lengthText?.runs[0]?.text ||
          '',
        title:
          dataVideo.title?.simpleText || dataVideo.title?.runs?.[0]?.text || '',
        channel:
          dataVideo.longBylineText?.runs?.[0]?.text ||
          dataVideo.shortBylineText?.runs?.[0]?.text ||
          '',
        view:
          dataVideo.viewCountText?.simpleText ||
          dataVideo.viewCountText?.runs?.[0]?.text ||
          '',
      };

      // publishedAt formatting
      let publishedAt: Date = new Date(Date.now());
      if (speedDate && dataVideo.publishedTimeText) {
        if (dataVideo.publishedTimeText?.simpleText) {
          publishedAt = getDateFromText(dataVideo.publishedTimeText.simpleText);
        } else if (dataVideo.publishedTimeText?.runs) {
          publishedAt = getDateFromText(
            dataVideo.publishedTimeText.runs?.[0]?.text
          );
        }
      } else {
        publishedAt = await getVideoDate(resVideo?.yId);
      }

      return {
        ...resVideo,
        publishedAt,
      };
    }

    return resVideo;
  } catch (e) {
    return resVideo;
  }
}

export async function getAudioInfo(yId: string): Promise<{
  audio: { url: string };
  info: { title?: string };
}> {
  const info = await ytdl.getInfo(yId);

  const audioFormats = await ytdl.filterFormats(info.formats, 'audioonly');

  const mimeType = /audio\/mp4;/;
  const audio = audioFormats.find(audio => mimeType.exec(audio.mimeType));

  return {
    audio: audio || audioFormats?.[0],
    info: info.videoDetails,
  };
}

export function findValByKey(obj: object, key: string): object {
  let objValue = { ...obj };
  const keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (objValue[k]) {
      objValue = objValue[k];
    } else {
      break;
    }
  }

  return objValue;
}

export function getStreamAudio(yId: string): Readable {
  const strem = ytdl(yId, { quality: 'highestaudio', filter: 'audioonly' });
  return strem;
}
