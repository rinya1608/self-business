import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currentUserReducer from "./reducers/CurrentUserSlice"
import messageReducer from "./reducers/MesageSlice"
import resourceTypeReducer from "./reducers/ResourceTypeSlice"
import resourceReducer from "./reducers/ResourceSlice"
import transactionReducer from "./reducers/TransactionSlice"
import purchaseReducer from "./reducers/PurchaseSlice"
import templateReducer from "./reducers/TemplateSlice"


const rootReducer = combineReducers({
    currentUserReducer,
    messageReducer,
    resourceTypeReducer,
    resourceReducer,
    transactionReducer,
    purchaseReducer,
    templateReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof setupStore.arguments.reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']