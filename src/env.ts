import * as dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_DIALECT: z.string(),
  JWT_SECRET: z.string()
});

export const env = envSchema.parse(process.env);
