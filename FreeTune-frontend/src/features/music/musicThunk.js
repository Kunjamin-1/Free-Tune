import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSharedMusic, deleteMusic, getAllMusic, getAllSharedMusic, removeSharedMusic, shareMusic, uploadMusic } from "./musicService";


export const getAllMusicThunk = createAsyncThunk(
    "music/getAllMusic",
 async (_,thunkApi) => {
try {
      return await getAllMusic()
} catch (error) {
    return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "Server Is taking time",
    })
}
}
   
)

export const uploadMusicThunk = createAsyncThunk(
    "music/uploadMusic",
 async (uploadMusicCredentials,thunkApi) => {
 try {
     return await uploadMusic(uploadMusicCredentials);
 } catch (error) {
     return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "Upload music failed",
    })
 }
}

)

export const shareMusicThunk = createAsyncThunk(
    "music/shareMusic",
 async (shareMusicCredentials,thunkApi) => {
    try {
        return await shareMusic(shareMusicCredentials)
    } catch (error) {
         return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "share music failed",
    })
    }
}
)


export const getAllSharedMusicThunk = createAsyncThunk(
    "music/getAllSharedMusic",
 async (_,thunkApi) => {
 try {
     return await getAllSharedMusic();
 } catch (error) {
     return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "Server Is taking time",
    })
 }
}
)


export const addSharedMusicThunk = createAsyncThunk(
    "music/addSharedMusic",
 async (addSharedMusicCredentials,thunkApi) => {
  try {
    return await addSharedMusic(addSharedMusicCredentials)
  } catch (error) {
     return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "adding music failed",
    })
  }
}
)


export const removeSharedMusicThunk = createAsyncThunk(
    "music/removeSharedMusic",
async (removeSharedMusicCredentials,thunkApi) => {
  try {
    return await removeSharedMusic(removeSharedMusicCredentials)
  } catch (error) {
    return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "remove share  music failed",
    }) 
  }
}
)
 

export const deleteMusicThunk = createAsyncThunk(
    "music/deleteMusic",
 async (deleteMusicCredentials,thunkApi) => {
 try {
     return await deleteMusic(deleteMusicCredentials)
 } catch (error) {
     return thunkApi.rejectWithValue({
        success:false,
        message: error.message || "deleting music failed",
    })
 }
}
)

