import { z } from 'zod';
import 'dotenv/config';

const envVarsSchema = z.object({
    NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string(),
});

const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
    throw new Error(`Config validation error: ${envVars.error}`);
}

const config = {
    env: envVars.data.NODE_ENV,
    port: parseInt(envVars.data.PORT, 10),
    database_url: envVars.data.DATABASE_URL,
};

export default config;
