import {ITypeInfo} from "./ITypeInfo";
import {ITemplateInfo} from "./ITemplateInfo";
import {IDateInfo} from "./IDateInfo";

export interface ITransactionStatistic {
    income: string,
    expenses: string,
    typeInfo: ITypeInfo[],
    templateInfo: ITemplateInfo[],
    dateInfo: IDateInfo[]
}