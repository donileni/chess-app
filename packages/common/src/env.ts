import { isBrowser } from "@banjoanton/utils";
import { z } from "zod";
import { ValidationUtil } from "./validation-util";

const allClient = () => {
    if (!isBrowser()) {
        throw new Error("Client env is only available in the browser");
    }
    // @ts-ignore - Vite injects the env
    return import.meta.env as Record<string, string>;
};

const allServer = () => {
    if (isBrowser()) {
        throw new Error("Server env is only available in Node");
    }
    return process.env;
};

const logLevelSchema = z
    .union([
        z.literal("trace"),
        z.literal("debug"),
        z.literal("info"),
        z.literal("warn"),
        z.literal("error"),
    ])
    .default("info")
    .optional();

const ServerEnvSchema = z.object({
    PORT: z.coerce.number().min(1000),
    NODE_ENV: z
        .union([
            z.literal("development"),
            z.literal("testing"),
            z.literal("production"),
        ])
        .default("development"),
    LOG_LEVEL: logLevelSchema,
    DATABASE_URL: z.string(),
});

const server = () => {
    if (isBrowser()) {
        throw new Error("Server env is only available in Node");
    }

    const env = allServer();
    const parsed = ServerEnvSchema.safeParse(env);
    if (!parsed.success) {
        throw new Error(ValidationUtil.errorToString(parsed.error));
    }
    return parsed.data;
};

const ClientEnvSchema = z.object({
    VITE_LOG_LEVEL: logLevelSchema,
    PROD: z.boolean(),
    DEV: z.boolean(),
});

const client = () => {
    if (!isBrowser()) {
        throw new Error("Client env is only available in the browser");
    }
    const env = allClient();
    const parsed = ClientEnvSchema.safeParse(env);
    if (!parsed.success) {
        throw new Error(ValidationUtil.errorToString(parsed.error));
    }
    return parsed.data;
};

export const Env = { server, client, allClient, allServer };
