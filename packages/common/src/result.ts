import { createResultWithType, type ResultWithType } from "@banjoanton/utils";

export type ErrorType =
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR"
    | "BAD_REQUEST";

export const Result = createResultWithType<ErrorType>();
export type ResultType<T = void> = ResultWithType<T, ErrorType>;
export type AsyncResultType<T = void> = Promise<ResultType<T>>;
