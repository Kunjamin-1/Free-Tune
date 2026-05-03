const getAllMusic = async () => {
  return await fetchFunction("music/getAllMusic");
};

const uploadMusic = async (data) => {
  return await fetchFunction("music/uploadMusic", "POST", data);
};

const shareMusic = async (username, musicId) => {
  return await fetchFunction(`music/shareMusic/${musicId}`, "POST", {
    username,
  });
};

const getAllSharedMusic = async () => {
  return await fetchFunction(`music/getAllSharedMusic/`, "GET");
};

const addSharedMusic = async ({
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

const removeSharedMusic = async (sharedMusicId) => {
  return await fetchFunction(
    `music/removeSharedMusic/${sharedMusicId}`,
    "DELETE",
  );
};

const deleteMusic = async (musicId) => {
  return await fetchFunction(`music/deleteMusic/${musicId}`, "DELETE");
};
