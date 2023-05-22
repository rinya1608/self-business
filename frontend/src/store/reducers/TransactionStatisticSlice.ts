import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {ITransaction} from "../../models/ITransaction";
import {ITransactionStatistic} from "../../models/ITransactionStatistic";

export interface TransactionStatisticSlice extends IDefaultState {
    transactionStatistic: ITransactionStatistic | null
}

const initialState: TransactionStatisticSlice = {
    transactionStatistic: null,
    error: null,
    isLoading: false
}

export const transactionStatisticSlice = createSlice({
    name: "transactionStatistic",
    initialState,
    reducers: {
        transactionStatisticSliceFetching(state) {
            state.isLoading = true;
            state.transactionStatistic = null;
            state.error = null;
        },
        transactionStatisticSliceFetchingSuccess(state, action: PayloadAction<ITransactionStatistic>) {
            state.transactionStatistic = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        transactionStatisticSliceFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.transactionStatistic = null;
            state.isLoading = false;
        },
        transactionStatisticSliceFetchingClear(state) {
            state.error = null;
            state.transactionStatistic = null;
            state.isLoading = false;
        }
    }
})

export default transactionStatisticSlice.reducer;