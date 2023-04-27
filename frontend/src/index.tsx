import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);