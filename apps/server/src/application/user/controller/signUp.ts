import { useHttpHandler } from '@app/middleware';
import { generateHash, generateTokenForUser } from '@app/utils';
import { createNewUser, findUserByEmail } from '@datasource/mongo/repository';
import { createNewPlaylist } from '@datasource/mongo/repository/playlist.repository';
import type { Request, Response } from '@gln-libs/node-infrastructure';

import type { TSignUpInput, TUser } from '../interface';

function generatePassword(password: string): string {
  return generateHash(password);
}

export const signUp = useHttpHandler(async (req: Request, res: Response) => {
  const { email, password, displayName }: TSignUpInput = req.body;

  const isEmail = await findUserByEmail(email);
  if (isEmail) {
    res.resError('Email already exists.');
    return;
  }

  const user: TUser = await createNewUser({
    email,
    password: generatePassword(password),
    displayName,
  });

  const playlist = await createNewPlaylist({
    name: 'Liked Tracks',
    owner: user.id,
  });

  const accessToken = generateTokenForUser(req, res, user, true);

  res.resSuccess({
    me: user,
    playlists: [playlist],
    accessToken,
  });
});
