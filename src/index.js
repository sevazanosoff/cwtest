import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <CssBaseline />
            <App />
        </Provider>
    </BrowserRouter>
);
