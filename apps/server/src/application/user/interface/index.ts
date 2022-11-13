export type TSignUpInput = {
  email: string;
  password: string;
  displayName: string;
};

export type TNewUser = {
  email: string;
  password: string;
  displayName: string;
};

export type TUser = {
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

export type TSignInInput = {
  account: string;
  password: string;
};
