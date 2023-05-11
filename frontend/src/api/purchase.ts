import {AppDispatch} from "../store/store";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {Response} from "../models/Response";
import {IPage} from "../models/IPage";
import {statusResolve} from "../utils/errorUtils";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";
import {purchaseSlice} from "../store/reducers/PurchaseSlice";
import {IPurchase} from "../models/IPurchase";
import {IPurchaseData} from "../models/IPurchaseData";

export const getPageWithPurchases = (page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(purchaseSlice.actions.purchaseFetching())
    let res = await fetch('/api/purchase?page=' + (page - 1) + '&size=' + size, {
        method: 'get',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<IPurchase>>>;
        else {
            statusResolve(response.status);
        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(purchaseSlice.actions.purchaseFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(purchaseSlice.actions.purchaseFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        console.log(e);
    });

}

export const addPurchase = (data: IPurchaseData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/purchase', {
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

export const deletePurchase = (id: number) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/purchase/' + id, {
        method: 'delete',
        headers: getJwtTokenHeader()
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