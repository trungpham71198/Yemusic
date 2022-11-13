import type {
  NextFunction,
  Request,
  Response,
} from '@gln-libs/node-infrastructure';
import { ValidateError } from '@gln-libs/node-infrastructure';

export const errorHandlerMiddleware = async (
  error: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
): Promise<void> => {
  global.logger.error(error);

  if (!res.headersSent) {
    let message = error?.message;
    let statusCode = 400;
    const detail: Record<string, unknown> = {};

    if (error instanceof ValidateError) {
      statusCode = 422;
      if (process.env.NODE_ENV === 'production') {
        message = 'Invalid format data';
      } else {
        message = error.firstErrorMessage;
        Object.assign(detail, error.toJson());
      }
    }

    res.resError(message, detail, { statusCode });
  }
};
