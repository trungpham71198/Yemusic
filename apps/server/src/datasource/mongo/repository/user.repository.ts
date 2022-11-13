import type { UserDocument } from '../models';
import { User } from '../models';

type TUser = {
  id: string;
  isValidEmail: boolean;
  isBlocked: boolean;
  password?: string;
  displayName?: string;
  desc?: string;
  avatarUrl?: string;
  email?: string;
  username?: string;
  phone?: string;
  gender?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const findUserByEmail = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email }).select('_id').lean();

  return !!user;
};

function getUserResponse(user: UserDocument): TUser {
  const { _id, password, __v, ...userResponse }: UserDocument = user;

  return {
    id: _id.toString(),
    ...userResponse,
  } as TUser;
}

export const createNewUser = async (input: {
  email: string;
  password: string;
  displayName: string;
}): Promise<TUser> => {
  const newUser = await User.create(input);

  const user: UserDocument = newUser.toObject();

  return getUserResponse(user);
};

export const getUserByAccount = async (account: string): Promise<TUser> => {
  const user = await User.findOne({
    $or: [{ email: account }, { username: account }, { phone: account }],
  })
    .select('-__v')
    .lean();

  return {
    ...getUserResponse(user),
    password: user.password,
  };
};
