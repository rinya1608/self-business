import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {ITemplate} from "../../models/ITemplate";

export interface TemplateSlice extends IDefaultState {
    templatePage: IPage<ITemplate> | null
}

const initialState: TemplateSlice = {
    templatePage: null,
    error: null,
    isLoading: false
}

export const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        templateFetching(state) {
            state.isLoading = true;
            state.templatePage = null;
            state.error = null;
        },
        templateFetchingSuccess(state, action: PayloadAction<IPage<ITemplate>>) {
            state.templatePage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        templateFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.templatePage = null;
            state.isLoading = false;
        },
        templateFetchingClear(state) {
            state.error = null;
            state.templatePage = null;
            state.isLoading = false;
        }
    }
})

export default templateSlice.reducer;