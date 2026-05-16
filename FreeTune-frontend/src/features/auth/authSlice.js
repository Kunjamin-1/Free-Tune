import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./authThunk";

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
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return (
          action.type.startsWith("auth/") && action.type.endsWith("/pending")
        );  
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];
        state.loading[actionName] = true;

      },
    );
    builder.addMatcher(
      (action) => {
        return (
          action.type.startsWith("auth/") && action.type.endsWith("/fulfilled")
        );
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];

        state.loading[actionName] = false;
        state.message = action.payload?.message || undefined;
        state.success = action.payload?.success || null;
        state.userData = action.payload?.body ?? null;
      },
    );
    builder.addMatcher(
      (action) => {
        return (
          action.type.startsWith("auth/") && action.type.endsWith("/rejected")
        );
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];

        state.loading[actionName] = false ;
        state.message = action.payload?.message || undefined;
        state.success = action.payload?.success || null;
        state.userData = action.payload.body?.userData ?? null;
      },
    );
  },
});

// export const { login } = authSlice.actions;
export default authSlice.reducer;
