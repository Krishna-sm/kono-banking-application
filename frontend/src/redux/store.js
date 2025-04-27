import { configureStore } from "@reduxjs/toolkit";
import { SidebarSlice } from "./slice/sidebarSlice";

export const store = configureStore({
    reducer:{
        [SidebarSlice.name]:SidebarSlice.reducer
    }
})