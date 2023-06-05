import {AppDispatch} from "../store/store";
import {Response} from "../models/Response";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {IPage} from "../models/IPage";
import {messageSlice} from "../store/reducers/MesageSlice";
import {IMessage} from "../models/IMessage";
import {statusResolve} from "../utils/errorUtils";
import {IOrderData} from "../models/IOrderData";
import {IOrder} from "../models/IOrder";
import {orderSlice} from "../store/reducers/OrderSlice";
import {OrderStatus} from "../constants/OrderStatus";
import {IOrderFilter} from "../models/IOrderFilter";


export const addOrder = (data: IOrderData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/order', {
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

export const updateOrder = (id: number, data: IOrderData) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    let res = await fetch('/api/order/' + id, {
        method: 'put',
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

export const getPageWithOrders = (data: IOrderFilter, page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.orderFetching())
    return await fetch('/api/order/all?page=' + (page - 1) + '&size=' + size, {
        method: 'post',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<IOrder>>>;
        else {
            statusResolve(response.status);
        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(orderSlice.actions.orderFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(orderSlice.actions.orderFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        console.log(e);
    });

}

export const changeOrderStatus = (id: number, command: string) => async (dispatch: AppDispatch) => {
    dispatch(messageSlice.actions.messageFetching())
    return  fetch('/api/order/' + id + '/' + command, {
        method: 'put',
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