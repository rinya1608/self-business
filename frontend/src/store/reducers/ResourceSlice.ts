import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {IResource} from "../../models/IResource";

export interface ResourceState extends IDefaultState {
    resourcePage: IPage<IResource> | null
}

const initialState: ResourceState = {
    resourcePage: null,
    error: null,
    isLoading: false
}

export const resourceSlice = createSlice({
    name: "resource",
    initialState,
    reducers: {
        resourceFetching(state) {
            state.isLoading = true;
            state.resourcePage = null;
            state.error = null;
        },
        resourceFetchingSuccess(state, action: PayloadAction<IPage<IResource>>) {
            state.resourcePage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        resourceFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.resourcePage = null;
            state.isLoading = false;
        },
        resourceFetchingClear(state) {
            state.error = null;
            state.resourcePage = null;
            state.isLoading = false;
        }
    }
})

export default resourceSlice.reducer;