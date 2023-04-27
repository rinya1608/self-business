import {ICurrentUser} from "../../models/ICurrentUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";

interface MessageState extends IDefaultState {
    message: string | null
}

const initialState: MessageState = {
    message: null,
    error: null,
    isLoading: false
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        messageFetching(state) {
            state.isLoading = true;
            state.message = null;
            state.error = null;
        },
        messageFetchingSuccess(state, action: PayloadAction<string>) {
            state.message = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        messageFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.message = null;
            state.isLoading = false;
        }
    }
})

export default messageSlice.reducer;