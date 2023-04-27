import {IError} from "./IError";

export interface Response <T> {
    body: T | null,
    error: IError | null
}