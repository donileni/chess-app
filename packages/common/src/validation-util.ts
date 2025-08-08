import { fromError } from "zod-validation-error";
import type z from "zod/v4";

const errorToString = (error: z.ZodError): string =>
    fromError(error).toString();

export const ValidationUtil = {
    errorToString,
};
