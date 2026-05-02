import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allMusicData: {},
    userMusicData: {},
    loading: {
        uploadMusic: false,
        deleteMusic: false,
        getAllMusic: false,
        shareYourMusic: false,
        addSharedMusic: false,
        getAllSharedMusic: false,
        removeSharedMusic: false,
    },
    success: null,
    message: null,

}

const musicSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
})

export const {} = musicSlice.actions
export default musicSlice.reducer