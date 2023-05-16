import {IResourceType} from "./IResourceType";

export interface IIngredient {
    id: number,
    count: number,
    resourceType: IResourceType
}