import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.string().min(4).max(5),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:', fromZodError(parsedEnv.error).message)
  process.exit(1)
}

export const env = parsedEnv.data
export const IS_PROD = env.NODE_ENV === 'production'
