export function checkType<T>(obj: any): obj is T {
    return obj;
}

export function isNumber(str: string): boolean {
    return /^\d{0,1000}(\.\d{0,2})?$/.test(str)
}