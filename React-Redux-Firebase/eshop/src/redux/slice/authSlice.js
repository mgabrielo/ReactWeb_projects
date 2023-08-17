import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null,
}

const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const { email, userName, userId } = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.userId = userId;
            state.userName = userName
            // console.log(action.payload)
        },
        REMOVE_ACTIVE_USER: (state, action) => {
            state.isLoggedIn = false;
            state.email = null
            state.userId = null
            state.userName = null

        }
    }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authslice.actions

export const selectIsLoggedIn = (state) => state.auth;
// export const selectEmail = (state) => state.auth.email;
// export const selectUserName = (state) => state.auth.userName;
// export const selectUserId = (state) => state.auth.userName;

export default authslice.reducer


