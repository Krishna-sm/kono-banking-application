import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice= createSlice({
    name:'SidebarSlice',
    initialState:{ 
        isToggle:false
    },
    reducers:{
        setIsToggle(state,action){
            state.isToggle = !state.isToggle
        }
    }
})

export const {setIsToggle} = SidebarSlice.actions

export const SidebarSlicePath = (state)=> state.SidebarSlice.isToggle