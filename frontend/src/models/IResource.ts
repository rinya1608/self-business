import {IResourceType} from "./IResourceType";

export interface IResource {
    id: number,
    count: number,
    unitPrice: number,
    type: IResourceType
}