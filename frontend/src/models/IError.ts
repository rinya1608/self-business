import {IValidError} from "./IValidError";

export interface IError {
    code: string,
    message: string,
    validErrors: IValidError[] | null
}

