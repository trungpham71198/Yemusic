import { Router } from 'express';

import { refreshToken, signIn, signUp } from './controller';
const userRouter = Router();

userRouter.route('/user/sign-up').post(signUp);
userRouter.route('/user/sign-in').post(signIn);
userRouter.route('/user/refresh-token').post(refreshToken);

export default userRouter;
