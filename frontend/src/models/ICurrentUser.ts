import {IDefaultState} from "./IDefaultState";

export interface ICurrentUser {
    jwtToken: string,
    email: string,
    name: string
}