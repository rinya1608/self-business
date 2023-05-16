import {IIngredient} from "./IIngredient";

export interface ITemplate {
    id: number,
    name: string,
    cost: string,
    netProfit: string,
    ingredients: IIngredient[]
}