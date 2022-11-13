import type { Request, Response } from '@gln-libs/node-infrastructure';
import type { CoreType } from 'vcc-schema';
import { mixed, string } from 'vcc-schema';

type TRouterConfig = {
  validateSchema?: CoreType<unknown>;
  private?: boolean;
};

const routerConfig: Record<string, TRouterConfig> = {
  '/song/s': {
    validateSchema: mixed({
      search: string(),
      token: string().optional(),
      apiKey: string().optional(),
    }),
    private: false,
  },
  '/user/sign-up': {
    validateSchema: mixed({
      email: string().email(),
      password: string().min(6),
      displayName: string().min(1),
    }),
    private: false,
  },
  '/user/sign-in': {
    validateSchema: mixed({
      account: string().min(1),
      password: string().min(6),
    }),
    private: false,
  },
} as const;

export const validate = (req: Request, res: Response): void => {
  const validateInput = routerConfig[req.route.path]?.validateSchema;

  if (!validateInput) return;

  const { success, error } = validateInput.validate(req.body);

  if (success) return;

  throw res.resError(error.format());
};
