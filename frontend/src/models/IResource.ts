import {IResourceType} from "./IResourceType";

export interface IResource {
    id: number,
    count: number,
    unitPrice: string,
    type: IResourceType
}