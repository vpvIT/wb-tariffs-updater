import dotenv from 'dotenv';
import zod from 'zod';
dotenv.config();

const configSchema = zod.object({
    POSTGRES_PORT: zod.string().regex(/^[0-9]+$/).transform((value) => parseInt(value)),
    POSTGRES_DB: zod.string(),
    POSTGRES_USER: zod.string(),
    POSTGRES_PASSWORD: zod.string(),
    NODE_ENV: zod.union([zod.undefined(), zod.enum(['development', 'production'])]),
    WB_API_KEY: zod.string(),
    GOOGLE_DOCS_IDS: zod.string().refine(
        (value) => {
            if (!value) return true;
            const numbers = value.split(',').map(id => id.trim());
            return numbers.length !== 0 && numbers.every((id) => id.length > 0);
        },
        {
            message: 'GOOGLE_DOCS_IDS должен содержать как минимум 1 айди документа',
        }
    ).transform(ids => ids.split(',').map(id => id.trim()))
});

const config = configSchema.parse({
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    WB_API_KEY: process.env.WB_API_KEY,
    GOOGLE_DOCS_IDS: process.env.GOOGLE_DOCS_IDS
});

console.log(config);

export default config;