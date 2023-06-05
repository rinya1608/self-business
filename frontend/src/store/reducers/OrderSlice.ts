import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {IOrder} from "../../models/IOrder";

export interface OrderSlice extends IDefaultState {
    orderPage: IPage<IOrder> | null
}

const initialState: OrderSlice = {
    orderPage: null,
    error: null,
    isLoading: false
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderFetching(state) {
            state.isLoading = true;
            state.orderPage = null;
            state.error = null;
        },
        orderFetchingSuccess(state, action: PayloadAction<IPage<IOrder>>) {
            state.orderPage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        orderFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.orderPage = null;
            state.isLoading = false;
        },
        orderFetchingClear(state) {
            state.error = null;
            state.orderPage = null;
            state.isLoading = false;
        }
    }
})

export default orderSlice.reducer;