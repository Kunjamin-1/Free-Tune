import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMusicData: [],
  allSharedSongs: [],
  loading: {
    uploadMusic: false,
    deleteMusic: false,
    getAllMusic: false,
    shareYourMusic: false,
    addSharedMusic: false,
    getAllSharedMusic: false,
    removeSharedMusic: false,
  },
  isSongPlaying: false,
  currentSong: {},
  success: null,
  message: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsSongPlaying: (state, action) => {
      state.isSongPlaying = action.payload.isSongPlaying;
    },

    setCurrentSong: (state, action) => {
      state.currentSong = action.payload?.currentSong;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return (
          action.type.startsWith("music/") && action.type.endsWith("/pending")
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
          action.type.startsWith("music/") && action.type.endsWith("/fulfilled")
        );
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];
        state.loading[actionName] = false;
        state.message = action.payload?.message || undefined;
        state.success = action.payload?.success || false;
        if (actionName === "getAllMusic") {
          state.allMusicData = action.payload?.body ?? [];
        } else if (actionName === "getAllSharedMusic") {
          state.allSharedSongs = action.payload?.body ?? [];
        }
      },
    );

    builder.addMatcher(
      (action) => {
        return (
          action.type.startsWith("music/") && action.type.endsWith("/rejected")
        );
      },
      (state, action) => {
        const actionName = action.type.split("/")[1];

        state.loading[actionName] = false;

        state.message = action.payload?.message || "request failed";
        state.success = action.payload?.success || false;
      },
    );
  },
});

export const {setIsSongPlaying,setCurrentSong} = musicSlice.actions;
export default musicSlice.reducer;
