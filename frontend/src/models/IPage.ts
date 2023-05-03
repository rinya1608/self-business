export interface IPage <T> {
    content: T[],
    totalPages: number,
    totalElements: number
}