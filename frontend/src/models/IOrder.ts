import {IOrderTemplate} from "./IOrderTemplate";
import {IClientInfo} from "./IClientInfo";

export interface IOrder {
    id: number,
    date: string,
    status: string,
    templates: IOrderTemplate[],
    clientInfo: IClientInfo,
    cost: string
}