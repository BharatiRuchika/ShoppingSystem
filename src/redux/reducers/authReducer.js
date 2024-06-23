
// import { ADD_TODO, TOGGLE_TODO } from "../actions/todoActions";
import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
    user: null,
    authSuccess: "",
    authError: ""
}

// reducer using redux-toolkit
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action)=>{
            console.log('payload',action.payload)
            state.user = action.payload
            state.authError = ""
            state.authSuccess = "User login successfully"
        },
        signup: (state, action) => {
            state.user = action.payload
            state.authError = ""
            state.authSuccess = "User Register Successfully"
        },
        logout: (state, action) => {
            state.user = null
            state.authError = ""
            state.authSuccess = "Logout Successfully"
        },
        error: (state, action) => {
            state.user = null
            state.authError = action.payload
            state.authSuccess = ""
        },
        clearAuthNoty: (state, action) => {
            state.authSuccess = ""
            state.authError = ""
        }
    }
})

export const authReducer = authSlice.reducer
export const actions = authSlice.actions
console.log('actions',actions)
export const authSelector = (state) => state.auth
