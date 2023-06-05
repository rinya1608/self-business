import {IClientInfoData} from "./IClientInfoData";
import {IOrderTemplateData} from "./IOrderTemplateData";

export interface IOrderData {
    date: string,
    clientInfo: IClientInfoData,
    templates: IOrderTemplateData[]
}