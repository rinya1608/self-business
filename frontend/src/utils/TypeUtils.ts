export function checkType<T>(obj: any): obj is T {
    return obj;
}

export function isNumber(str: string, precision: number = 2): boolean {
    return new RegExp("^\\d{0,1000}(\\.\\d{0," + precision + "})?$").test(str)
}