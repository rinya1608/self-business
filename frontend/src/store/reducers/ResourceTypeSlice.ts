import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDefaultState} from "../../models/IDefaultState";
import {IError} from "../../models/IError";
import {IPage} from "../../models/IPage";
import {IResourceType} from "../../models/IResourceType";

export interface ResourceTypeState extends IDefaultState {
    resourceTypePage: IPage<IResourceType> | null
}

const initialState: ResourceTypeState = {
    resourceTypePage: null,
    error: null,
    isLoading: false
}

export const resourceTypeSlice = createSlice({
    name: "resourceType",
    initialState,
    reducers: {
        resourceTypeFetching(state) {
            state.isLoading = true;
            state.resourceTypePage = null;
            state.error = null;
        },
        resourceTypeFetchingSuccess(state, action: PayloadAction<IPage<IResourceType>>) {
            state.resourceTypePage = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        resourceTypeFetchingError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            state.resourceTypePage = null;
            state.isLoading = false;
        },
        resourceTypeFetchingClear(state) {
            state.error = null;
            state.resourceTypePage = null;
            state.isLoading = false;
        }
    }
})

export default resourceTypeSlice.reducer;