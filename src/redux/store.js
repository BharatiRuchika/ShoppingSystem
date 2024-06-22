
// const redux = require("redux");

import * as redux from "redux";
// import {todoReducer} from "./reducers/todoReducer";
// import { noteReducer } from "./reducers/noteReducer";
import { configureStore } from "@reduxjs/toolkit";
// import { notificationReducer } from "./reducers/notificationReducer"
// import { loggerMiddleware } from "./middlewares/loggerMiddleware";

export const store = configureStore({
    reducer:{
        // todos: todoReducer,
        // notes: noteReducer,
        // notification: notificationReducer
    },
    // middleware: [loggerMiddleware]
})