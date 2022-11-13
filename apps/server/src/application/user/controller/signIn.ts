import { useHttpHandler } from '@app/middleware';
import { compareHash, generateTokenForUser } from '@app/utils';
import { getUserByAccount } from '@datasource/mongo/repository';
import type { Request, Response } from '@gln-libs/node-infrastructure';

import type { TSignInInput } from '../interface';

function comparePassword(password: string, currentPassword: string): string {
  return compareHash(password, currentPassword);
}

export const signIn = useHttpHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { account, password }: TSignInInput = req.body;

    const user = await getUserByAccount(account);

    if (!user) {
      res.resError('Account not found!');
      return;
    }

    if (!comparePassword(password, user.password)) {
      res.resError('Password incorrect!');
      return;
    }

    delete user.password;
    const accessToken = generateTokenForUser(req, res, user, true);

    return res.status(200).json({ data: { me: user, accessToken } });
  }
);
