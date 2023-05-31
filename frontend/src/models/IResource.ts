import {IResourceType} from "./IResourceType";

export interface IResource {
    id: number,
    count: number,
    price: string,
    unitPrice: string,
    typeName: string,
    unit: string
}