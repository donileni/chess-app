const isError = (err: unknown): err is Error =>
    typeof err === "object" && err !== null && "message" in err;

const toError = (err: unknown): Error => {
    if (isError(err)) {
        return err;
    }
    if (typeof err === "string") {
        return new Error(err);
    }
    return new Error(JSON.stringify(err));
};

const toErrorMessage = (err: unknown): string => {
    if (isError(err)) {
        return err.message;
    }
    if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
};

const getErrorStack = (err: unknown): string | undefined => {
    if (isError(err) && err.stack) {
        return err.stack;
    }
    return undefined;
};

export const ErrorUtil = {
    isError,
    toError,
    toErrorMessage,
    getErrorStack,
};
