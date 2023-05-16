import {ITemplate} from "./ITemplate";
import {ITransaction} from "./ITransaction";

export interface ISale {
    id: number,
    template: ITemplate,
    transactional: ITransaction
}