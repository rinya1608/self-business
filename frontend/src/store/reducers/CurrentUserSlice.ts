import {ICurrentUser} from "../../models/ICurrentUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";

export interface CurrentUserState extends IDefaultState {
    user: ICurrentUser | null
}

const initialState: CurrentUserState = {
    user: null,
    error: null,
    isLoading: false
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        userFetching(state) {
            state.isLoading = true;
            state.user = null;
            state.error = null;
        },
        userFetchingSuccess(state, action: PayloadAction<ICurrentUser>) {
            state.user = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        userFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.user = null;
            state.isLoading = false;
        },
        userFetchingClear(state) {
            state.error = null;
            state.user = null;
            state.isLoading = false;
        }
    }
})

export default currentUserSlice.reducer;