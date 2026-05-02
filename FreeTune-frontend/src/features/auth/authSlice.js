import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userData: null,
    loading: {
        registeruser: false,
        loginuser: false,
        logoutuser: false,
        updateDetails: false,
        add: false,
        deleteuser: false,
        getDetailOfUser: false,
        deleteAvatar: false,
    },
    success: null,
    message: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loading.login = true
            state.userData = action.payload.userData
        }
    }
})

export const { login } = authSlice.actions
export default authSlice.reducer 
