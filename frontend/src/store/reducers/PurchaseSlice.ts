import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {IResource} from "../../models/IResource";
import {IPurchase} from "../../models/IPurchase";

export interface PurchaseSlice extends IDefaultState {
    purchasePage: IPage<IPurchase> | null
}

const initialState: PurchaseSlice = {
    purchasePage: null,
    error: null,
    isLoading: false
}

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        purchaseFetching(state) {
            state.isLoading = true;
            state.purchasePage = null;
            state.error = null;
        },
        purchaseFetchingSuccess(state, action: PayloadAction<IPage<IPurchase>>) {
            state.purchasePage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        purchaseFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.purchasePage = null;
            state.isLoading = false;
        },
        purchaseFetchingClear(state) {
            state.error = null;
            state.purchasePage = null;
            state.isLoading = false;
        }
    }
})

export default purchaseSlice.reducer;