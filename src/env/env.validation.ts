import { z } from 'zod'

const EnvSchema = z
  .object({
    NODE_ENV: z
      .union([
        z.literal('development'),
        z.literal('production'),
        z.literal('test'),
      ])
      .default('development'),
    DOMAIN: z.string(),
    SERVER_URL: z.string(),
    DATABASE_URL: z.string(),
    DATABASE_DIRECT_URL: z.string(),
  })
  .transform((env) => ({
    nodeEnv: env.NODE_ENV,
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    domain: env.DOMAIN,
    server: {
      url: env.SERVER_URL,
    },
  }))

export function createEnvValues() {
  return class EnvValues {} as {
    new (): z.infer<typeof EnvSchema>
  }
}

export class EnvValues extends createEnvValues() {}

export function validate(raw: Record<string, unknown>) {
  try {
    return { values: EnvSchema.parse(raw) }
  } catch (error) {
    const isZodError = error instanceof z.ZodError
    if (!isZodError) throw new Error('Unknown error parsing .env file')

    console.error(`Invalid .env file. See below for detailed info.`)
    console.info('\n')
    console.info(error.format())

    // Not throwing error for a cleaner message
    process.exit(1)
  }
}
