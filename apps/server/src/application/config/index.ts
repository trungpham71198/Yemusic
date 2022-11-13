import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env;
const { NODE_ENV } = env;

export const AppConfig = {
  HttpServer: {
    port: Number(env.HTTP_SERVER_PORT || 8080),
    CORS: {
      origin:
        env.HTTP_SERVER_CORS_ORIGIN || (NODE_ENV === 'development' && '*'),
      method: '*',
      allowedHeaders: '*',
    },
  },
} as const;

type Headers = {
  'Access-Control-Allow-Origin': string;
  'x-youtube-client-name': number;
  'x-youtube-client-version': string;
  'User-Agent': string;
};

export const youtubeConfig: { headers: Headers } = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-youtube-client-name': 1,
    'x-youtube-client-version': '2.20220325.00.00',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
  },
} as const;

type TJwtConfig = {
  secretAccessToken: string;
  secretRefreshToken: string;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
};

export const jwtConfig: TJwtConfig = {
  secretAccessToken: process.env.SECRET_ACCESS_TOKEN,
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,

  accessTokenExpiration: Number(process.env.ACCESS_TOKEN_EXPIRATION),
  refreshTokenExpiration: Number(process.env.REFRESH_TOKEN_EXPIRATION),
};
