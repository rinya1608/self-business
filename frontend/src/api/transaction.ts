import {AppDispatch} from "../store/store";
import {getJwtTokenHeader} from "../utils/jwtUtils";
import {Response} from "../models/Response";
import {IPage} from "../models/IPage";
import {statusResolve} from "../utils/errorUtils";
import {transactionSlice} from "../store/reducers/TransactionSlice";
import {ITransaction} from "../models/ITransaction";
import {TransactionFilterData} from "../models/TransactionFilterData";
import {transactionStatisticSlice} from "../store/reducers/TransactionStatisticSlice";
import {ITransactionStatistic} from "../models/ITransactionStatistic";

export const getPageWithTransaction = (page: number, size: number, filter: TransactionFilterData) => async (dispatch: AppDispatch) => {
    dispatch(transactionSlice.actions.transactionFetching())
    let res = await fetch('/api/transaction?page=' + (page - 1) + '&size=' + size, {
        method: 'post',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(filter)
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
        dispatch(transactionSlice.actions.transactionFetchingClear())
        console.log(e);
    });

}

export const getTransactionalStatistic = (filter: TransactionFilterData) => async (dispatch: AppDispatch) => {
    dispatch(transactionStatisticSlice.actions.transactionStatisticSliceFetching())
    return await fetch('/api/transaction/statistic', {
        method: 'post',
        headers: getJwtTokenHeader(),
        body: JSON.stringify(filter)
    }).then(response => {
        if (response.ok)
            return response.json() as Promise<Response<ITransactionStatistic>>;
        else {
            statusResolve(response.status);
        }
    }).then((r => {
        if (r) {
            if (r.error != null) {
                dispatch(transactionStatisticSlice.actions.transactionStatisticSliceFetchingError(r.error));
            } else if (r.body != null) {
                dispatch(transactionStatisticSlice.actions.transactionStatisticSliceFetchingSuccess(r.body));
            }
            return r;
        }
    })).catch(e => {
        dispatch(transactionStatisticSlice.actions.transactionStatisticSliceFetchingClear())
        console.log(e);
    });

}