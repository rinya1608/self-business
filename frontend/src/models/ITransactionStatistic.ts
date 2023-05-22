import {ITypeInfo} from "./ITypeInfo";
import {ITemplateInfo} from "./ITemplateInfo";

export interface ITransactionStatistic {
    income: string,
    expenses: string,
    typeInfo: ITypeInfo[],
    templateInfo: ITemplateInfo[]
}