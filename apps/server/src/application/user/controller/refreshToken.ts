import { jwtConfig } from '@app/config';
import { useHttpHandler } from '@app/middleware';
import { generateTokenForUser, verifyToken } from '@app/utils';
import type { Request, Response } from '@gln-libs/node-infrastructure';

export const refreshToken = useHttpHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.resError('permission denied!');
      return;
    }

    const { success, user } = verifyToken({
      token: refreshToken,
      secretKey: jwtConfig.secretRefreshToken,
    });
    if (!success) {
      res.resError('Refresh Token invalid!');
      return;
    }

    const accessToken = generateTokenForUser(req, res, user);

    return res.status(200).json({ data: { accessToken } });
  }
);
