import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer:{},
    devTools: true
})