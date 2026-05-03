export const registerUser = async (registerCredentials) => {
  return await fetchFunction("user/registerUser", "POST", registerCredentials);
};

export const loginUser = async (loginCredentials) => {
  return await fetchFunction("user/loginUser", "POST", loginCredentials);
};

export const logoutUser = async () => {
  return await fetchFunction("user/logoutUser", "GET");
};

export const getUserDetails = async () => {
  return await fetchFunction("user/getUserDetails", "GET");
};
export const getUserFriendDetail = async (username) => {
  return await fetchFunction(`user/getUserFriendDetails/${username}`, "GET");
};

export const updateUser = async (data) => {
  return await fetchFunction("user/updateUser", "PATCH", data);
};

export const addAvatar = async (avatarLink) => {
  return await fetchFunction("user/addAvatar", "POST", avatarLink);
};

export const deleteAvatar = async (avatarPublicId) => {
  return await fetchFunction(`user/deleteAvatar/${avatarPublicId}`, "DELETE");
};

export const deleteUser = async (username, password) => {
  return await fetchFunction("user/deleteUser", "DELETE", {
    username,
    password,
  });
};
