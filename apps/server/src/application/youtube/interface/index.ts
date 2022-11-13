export type TSearchVideoInput = {
  search: string;
  token?: string;
  apiKey?: string;
};

type Thumbnail = {
  thumbnails: Array<object>;
};

type Runs = {
  text: string;
};

type DataVideoItem = {
  simpleText?: string;
  runs?: Runs[];
};

export type TDataVideo = {
  videoId?: string;
  thumbnail?: Thumbnail;
  lengthText?: DataVideoItem;
  title?: DataVideoItem;
  longBylineText?: DataVideoItem;
  shortBylineText?: DataVideoItem;
  viewCountText?: DataVideoItem;
  publishedTimeText?: DataVideoItem;
};

export type TVideo = {
  compactVideoRenderer?: TDataVideo;
  gridVideoRenderer?: TDataVideo;
  videoRenderer?: TDataVideo;
  playlistVideoRenderer?: TDataVideo;
};

export type TSong = {
  yId: string;
  title: string;
  duration: string;
  publishedAt?: Date;
  thumbnail: object;
  channel: string;
  view: string;
};

export type TSearchResult = {
  songs: TSong[];
  token: string; // key to get more data (next/prev page result)
  apiKey: string; // api key to get more data (next/prev page result)
};

export type TAudioResponse = {
  message?: string;
  audioUrl: string;
};
