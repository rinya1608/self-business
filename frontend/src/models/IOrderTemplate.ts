import {ITemplate} from "./ITemplate";
import {ErrorIngredient} from "./ErrorIngredient";

export interface IOrderTemplate {
    template: ITemplate,
    count: number,
    errorIngredient: ErrorIngredient
}