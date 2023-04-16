import React from "react";
import ReactDOM from 'react-dom';
import { createBrowserRouter } from "react-router-dom";
import App from './App'
import { GlobalProvider } from "./App";

ReactDOM.render(
    <React.StrictMode>
        <GlobalProvider>
            <App />

        </GlobalProvider>
    </React.StrictMode>
    , document.getElementById('root'));