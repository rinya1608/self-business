import {IResource} from "./IResource";
import {ITransaction} from "./ITransaction";

export interface IPurchase {
    resource: IResource,
    transaction: ITransaction
}