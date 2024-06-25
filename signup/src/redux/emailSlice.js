import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:'',
}


const emailSlice=createSlice({
    name: 'email',
    initialState,

    reducers:{
        setemail: (state, action) => {
            state.email = action.payload;
          }

    }
});

export const { setemail } = emailSlice.actions;
export default emailSlice.reducer;

