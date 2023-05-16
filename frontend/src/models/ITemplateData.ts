import {IIngredientData} from "./IIngredientData";

export interface ITemplateData {
    name: string,
    cost: string,
    ingredients: IIngredientData[]
}