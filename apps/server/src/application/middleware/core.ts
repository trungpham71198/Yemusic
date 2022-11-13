import cors from 'cors';
import type { Handler } from 'express';

export const corsMiddleware = (options?: cors.CorsOptions): Handler =>
  cors({
    ...options,
  });
