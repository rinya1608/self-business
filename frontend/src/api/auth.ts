import {AppDispatch} from "../store/store";
import {ICurrentUser} from "../models/ICurrentUser";
import {IRegData} from "../models/IRegData";
import {currentUserSlice} from "../store/reducers/CurrentUserSlice";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {IAuthData} from "../models/IAuthData";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";

export const auth = (req: IAuthData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.userFetching())
        const res = await fetch('/api/auth/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(response => {
            return response.json() as Promise<Response<ICurrentUser>>
        }).then((r => {
            if (r.error != null) {
                dispatch(currentUserSlice.actions.userFetchingError(r.error))

            } else if (r.body != null) {
                dispatch(currentUserSlice.actions.userFetchingSuccess(r.body))
                localStorage.setItem('token', r.body.jwtToken)
            }
            return r;
        })).catch(e => {
            console.log(e)
        });


    } catch (e) {

    }
}

export const reg = (req: IRegData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(messageSlice.actions.messageFetching)
        const res = await fetch('/api/auth/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        }).then(response => {
            return response.json() as Promise<Response<IMessage>>
        }).then((r => {
            if (r.error != null) {
                dispatch(messageSlice.actions.messageFetchingError(r.error))

            } else if (r.body != null) {
                dispatch(messageSlice.actions.messageFetchingSuccess(r.body.message))
            }
            return r;
        })).catch(e => {
            console.log(e)
        });


    } catch (e) {

    }
}

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.userFetching())
        let res = await fetch('/api/users/current', {
            method: 'post',
            headers: getJwtTokenHeader()
        }).then(response => {
            return response.json() as Promise<Response<ICurrentUser>>
        }).then((r => {
            if (r.error != null) {
                dispatch(currentUserSlice.actions.userFetchingError(r.error))

            } else if (r.body != null) {
                dispatch(currentUserSlice.actions.userFetchingSuccess(r.body))
            }
            return r;
        })).catch(e => {
            console.log(e)
        });

    } catch (e) {
        console.warn(e);
    }
}