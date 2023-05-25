import {IDefaultState} from "./IDefaultState";
import {IUser} from "./IUser";

export interface ICurrentUser {
    jwtToken: string,
    user: IUser
}