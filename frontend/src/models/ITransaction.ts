import {IResource} from "./IResource";

export interface ITransaction {
    id: number,
    date: string,
    sum: string,
    resource: IResource
}