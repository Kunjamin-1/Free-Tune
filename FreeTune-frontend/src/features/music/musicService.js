import { fetchFunction } from "../../fetchFunction";

export const getAllMusic = async () => {
  return await fetchFunction("music/getAllMusic");
};

export const uploadMusic = async (data) => {
  return await fetchFunction("music/uploadMusic", "POST", data);
};

export const shareMusic = async ({username, musicId}) => {
  return await fetchFunction(`music/shareMusic/${musicId}`, "POST", {
    username,
  });
};

export const getAllSharedMusic = async () => {
  return await fetchFunction(`music/getAllSharedMusic/`, "GET");
};

export const addSharedMusic = async ({
  sharedMusicId,
  title,
  audioFileLink,
  artistName,
  thumbnailLink,
  duration,
}) => {
  return await fetchFunction("music/addSharedMusic", "POST", {
    sharedMusicId,
    title,
    audioFileLink,
    artistName,
    thumbnailLink,
    duration,
  });
};

export const removeSharedMusic = async (sharedMusicId) => {
  return await fetchFunction(
    `music/removeSharedMusic/${sharedMusicId}`,
    "DELETE",
  );
};

export const deleteMusic = async (musicId) => {
  return await fetchFunction(`music/deleteMusic/${musicId}`, "DELETE");
};
