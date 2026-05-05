import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAvatar,
  deleteAvatar,
  deleteUser,
  getUserDetails,
  getUserFriendDetail,
  loginUser,
  registerUser,
  updateUser,
} from "./authService";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (registerCredentials, thunkApi) => {
    try {
      return await registerUser(registerCredentials);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "user register failed",
      });
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (loginCredentials) => {
    try {
      return await loginUser(loginCredentials);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "Login Failed",
      });
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkApi) => {
    try {
      return await fetchFunction("user/logoutUser", "GET");
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "logout failed",
      });
    }
  },
);

export const getUserDetailsThunk = createAsyncThunk(
  "auth/getUserDetails",
  async (_, thunkApi) => {
    try {
      return await getUserDetails();
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "User detail fetch failed",
      });
    }
  },
);

export const getUserFriendDetailThunk = createAsyncThunk(
  "auth/getUserFriendDetail",
  async (usernameCredentials, thunkApi) => {
    try {
      return await getUserFriendDetail(usernameCredentials);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "Friend not found",
      });
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async (updatedUserCredentails, thunkApi) => {
    try {
      return await updateUser(updatedUserCredentails);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "User detail not updated",
      });
    }
  },
);

export const addAvatarThunk = createAsyncThunk(
  "auth/addAvatar",
  async (avatarCredentials, thunkApi) => {
    try {
      return await addAvatar(avatarCredentials);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "avatar add failed",
      });
    }
  },
);

export const deleteAvatarThunk = createAsyncThunk(
  "auth/,deleteAvatar",
  async (deleteAvatarCrenditals, thunkApi) => {
    try {
      return await deleteAvatar(deleteAvatarCrenditals);
    } catch (error) {
      return thunkApi.rejectWithValue({
        success: false,
        message: error.message || "Avatar deletion failed",
      });
    }
  },
);

export const deleteUserThunk = createAsyncThunk(
  "auth/deleteUser",
  async (deleteUserCredentials,thunkApi) => {
    try {
      return await deleteUser(deleteUserCredentials)
    } catch (error) { 
      return thunkApi.rejectWithValue({
        success:false,
        message:error.message || "user deletion failed"
      })
    }
  },
);
