import {AppDispatch} from "../store/store";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";
import {ISaleData} from "../models/ISaleData";

export const addSale = (data: ISaleData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    return await fetch('/api/sale', {
        method: 'post',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IMessage>>;
        else {
            throw response.status;
        }
    }).then((r => {
        if (r.error != null) {
            dispatch(messageSlice.actions.messageFetchingError(r.error));

        } else if (r.body != null) {
            dispatch(messageSlice.actions.messageFetchingSuccess(r.body));
        }
        return r;
    })).catch(e => {
        console.log(e);
    });
}