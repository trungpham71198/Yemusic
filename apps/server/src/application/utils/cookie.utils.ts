import type { Request, Response } from 'express';

type TCookiePayload = {
  key: string;
  value: string;
  path: string;
};

export function setCookie(
  req: Request,
  res: Response,
  payload: TCookiePayload
): void {
  const { key, value, path } = payload;

  res.cookie(key, value, {
    httpOnly: true,
    secure: true,
    path: `/api/${path}`,
    domain: req.hostname,
  });
}
