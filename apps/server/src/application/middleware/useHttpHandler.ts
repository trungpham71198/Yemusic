import type {
  NextFunction,
  Request,
  Response,
} from '@gln-libs/node-infrastructure';

import { validate } from '../middleware';

export function useHttpHandler(
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown> => {
    try {
      // Verify input
      await validate(req, res);

      return Promise.resolve(fn(req, res, next)).catch(next);
    } catch (error) {
      next(error);
    }
  };
}
