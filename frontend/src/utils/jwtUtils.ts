export function getJwtToken(): string | null {
    let token = localStorage.getItem("token");
    if (token != null) {
        return 'Bearer ' + token;
    }
    return null;
}

export function getJwtTokenHeader(): HeadersInit | undefined {
    let token = localStorage.getItem("token");
    if (token != null) {
        return {'Authorization' : 'Bearer ' + token};
    }
    return undefined;
}