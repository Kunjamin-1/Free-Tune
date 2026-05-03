import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails, loginUser, registerUser } from "./authService";

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
  async (_,thunkApi) => {
    try {
    return await getUserDetails()
    } catch (error) {
        return thunkApi.rejectWithValue({
            success:false,
            message:error.message || "User detail fetch failed"
        })
    }
  },
);

export const getUserFriendDetailThunk = createAsyncThunk("auth/");

async (username) => {
  return await fetchFunction(`user/getUserFriendDetails/${username}`, "GET");
};

export const updateUserThunk = createAsyncThunk("auth/");

async (data) => {
  return await fetchFunction("user/updateUser", "PATCH", data);
};

export const addAvatarThunk = createAsyncThunk("auth/");

async (avatarLink) => {
  return await fetchFunction("user/addAvatar", "POST", avatarLink);
};

export const deleteAvatarThunk = createAsyncThunk("auth/");

async (avatarPublicId) => {
  return await fetchFunction(`user/deleteAvatar/${avatarPublicId}`, "DELETE");
};

export const deleteUserThunk = createAsyncThunk("auth/");

async (username, password) => {
  return await fetchFunction("user/deleteUser", "DELETE", {
    username,
    password,
  });
};
