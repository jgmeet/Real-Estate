import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    message: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            console.log('Singin started')
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
            state.loading = false;
            state.message = 'Sign In successfull';

        },
        signInFailure: (state, action) => {
            console.log(action.payload)
            state.message = action.payload;
            state.loading = false;
        },
    },
})

export const {signInStart, signInFailure, signInSuccess} = userSlice.actions;
export default userSlice.reducer;