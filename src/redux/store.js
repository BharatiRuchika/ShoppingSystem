
// const redux = require("redux");

import * as redux from "redux";
import { authReducer } from "./reducers/authReducer";
import { productReducer } from "./reducers/productReducer";
// import { noteReducer } from "./reducers/noteReducer";
import { configureStore } from "@reduxjs/toolkit";
// import { notificationReducer } from "./reducers/notificationReducer"
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer
        // notes: noteReducer,
        // notification: notificationReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware)
})