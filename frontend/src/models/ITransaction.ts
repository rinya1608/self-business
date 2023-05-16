import {IResource} from "./IResource";
import {ITemplate} from "./ITemplate";

export interface ITransaction {
    id: number,
    date: string,
    sum: string,
    resource: IResource | null,
    template: ITemplate | null
}