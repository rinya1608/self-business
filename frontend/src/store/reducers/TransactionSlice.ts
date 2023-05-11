import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {ITransaction} from "../../models/ITransaction";

export interface TransactionSlice extends IDefaultState {
    transactionPage: IPage<ITransaction> | null
}

const initialState: TransactionSlice = {
    transactionPage: null,
    error: null,
    isLoading: false
}

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        transactionFetching(state) {
            state.isLoading = true;
            state.transactionPage = null;
            state.error = null;
        },
        transactionFetchingSuccess(state, action: PayloadAction<IPage<ITransaction>>) {
            state.transactionPage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        transactionFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.transactionPage = null;
            state.isLoading = false;
        },
        transactionFetchingClear(state) {
            state.error = null;
            state.transactionPage = null;
            state.isLoading = false;
        }
    }
})

export default transactionSlice.reducer;