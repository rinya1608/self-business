import {LOGIN, MAIN} from "../constants/Urls";

export function statusResolve(status: number) {
    switch (status) {
        case 401:
            window.location.href = LOGIN;
    }
}