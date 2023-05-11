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
import {transactionSlice} from "../store/reducers/TransactionSlice";
import {ITransaction} from "../models/ITransaction";

export const getPageWithTransaction = (page: number, size: number) => async (dispatch: AppDispatch) => {
    dispatch(transactionSlice.actions.transactionFetching())
    let res = await fetch('/api/transaction?page=' + (page - 1) + '&size=' + size, {
        method: 'get',
        headers: getJwtTokenHeader()
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<IPage<ITransaction>>>;
        else {
            statusResolve(response.status);
        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(transactionSlice.actions.transactionFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(transactionSlice.actions.transactionFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        console.log(e);
    });

}