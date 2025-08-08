import { isBrowser } from "@banjoanton/utils";
import pino, { type TransportTargetOptions } from "pino";
import { Env } from "./env";
// * Pino import needs to be default to work in the browser

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sharedTransport: any;

const setupServerLogger = () => {
    const env = Env.server();
    const targets: TransportTargetOptions[] = [];
    const isProduction = env.NODE_ENV === "production";

    if (isProduction) {
        targets.push({
            target: "pino/file", // Default Pino file target, which in reality writes to stdout
            options: { destination: 1 }, // '1' represents stdout
            level: env.LOG_LEVEL ?? "info",
        });
    } else {
        targets.push({
            target: "pino-pretty",
            options: {
                colorize: true,
                ignore: "hostname,pid",
            },
            level: "trace",
        });
    }

    if (!sharedTransport) {
        sharedTransport = pino.transport({
            targets,
        });
    }

    const base = {
        env: env.NODE_ENV,
    };

    return pino(
        {
            level: env.LOG_LEVEL ?? "info",
            base,
            errorKey: "error",
        },
        sharedTransport
    );
};

export const createLogger = (name: string) => {
    if (isBrowser()) {
        const clientVariables = Env.client();
        return pino({ name, level: clientVariables.VITE_LOG_LEVEL || "info" });
    }

    const logger = setupServerLogger();
    return logger.child({ name });
};
