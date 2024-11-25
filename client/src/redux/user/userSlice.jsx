import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    message: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.message = 'Sign In successfull';

        },
        signInFailure: (state, action) => {
            state.message = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})

export const {signInStart, signInFailure, signInSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserStart, signOutUserSuccess, signOutUserFailure} = userSlice.actions;

export default userSlice.reducer;