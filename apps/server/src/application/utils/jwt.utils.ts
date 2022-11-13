import { jwtConfig } from '@app/config';
import type { Request, Response } from '@gln-libs/node-infrastructure';
import jwt from 'jsonwebtoken';

import { setCookie } from './cookie.utils';

export type TParamsCreateToken = {
  payload: string | object | Buffer;
  secretKey?: string;
  expiration?: number;
};

export function createToken({
  expiration,
  secretKey,
  payload,
}: TParamsCreateToken): string {
  const token = jwt.sign(payload, secretKey, { expiresIn: expiration });
  return token;
}

type TPayloadAccessToken = {
  userId: string;
  allowedAt: Date;
};

export function generateTokenForUser(
  req: Request,
  res: Response,
  user: { id: string },
  isRefresh = false
): string {
  const payload: TPayloadAccessToken = {
    userId: user.id,
    allowedAt: new Date(),
  };

  const accessToken = createToken({
    expiration: jwtConfig.accessTokenExpiration,
    secretKey: jwtConfig.secretAccessToken,
    payload,
  });

  if (isRefresh) {
    const refreshToken = createToken({
      expiration: jwtConfig.refreshTokenExpiration,
      secretKey: jwtConfig.secretRefreshToken,
      payload,
    });

    setCookie(req, res, {
      key: 'refreshToken',
      value: refreshToken,
      path: 'user/refresh-token',
    });
  }

  return accessToken;
}

export type TParamsVerifyToken = {
  token: string;
  secretKey?: string;
  options?: jwt.VerifyOptions;
};

export function verifyToken<T = unknown>({
  token,
  secretKey,
  options,
}: TParamsVerifyToken): jwt.JwtPayload & T {
  try {
    const user = jwt.verify(token, secretKey, options) as jwt.JwtPayload & T;

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
