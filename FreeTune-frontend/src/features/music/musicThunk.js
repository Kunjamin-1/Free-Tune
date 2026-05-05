import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSharedMusic, deleteMusic, getAllMusic, getAllSharedMusic, removeSharedMusic, shareMusic, uploadMusic } from "./musicService";


const getAllMusicThunk = createAsyncThunk(
    "blog/getAllMusic",
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

const uploadMusicThunk = createAsyncThunk(
    "blog/uploadMusic",
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

const shareMusicThunk = createAsyncThunk(
    "blog/shareMusic",
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


const getAllSharedMusicThunk = createAsyncThunk(
    "blog/getAllSharedMusic",
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


const addSharedMusicThunk = createAsyncThunk(
    "blog/addSharedMusic",
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


const removeSharedMusicThunk = createAsyncThunk(
    "blog/removeSharedMusic",
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
 

const deleteMusicThunk = createAsyncThunk(
    "blog/deleteMusic",
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

