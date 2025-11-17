import React from 'react'
import { UserContext } from './UserContext'
import { fetchFunction } from '../../fetchFunction'

const UserState = (props) => {

  const registerUser = async (data) => {
    const registerUserResponse = await fetchFunction("user/registerUser", "POST", data)

    return registerUserResponse
  }

  const loginUser = async ({ email, password }) => {
    const loginUserResponse = await fetchFunction("user/loginUser", "POST", { email, password })

    return loginUserResponse
  }

  const logoutUser = async () => {
    const logoutUserResponse = await fetchFunction("user/logoutUser", "GET")

    return logoutUserResponse
  }

  const getUserDetails = async () => {
    const getUserDetailsResponse = await fetchFunction("user/getUserDetails", "GET")

    return getUserDetailsResponse
  }
  const getUserFriendDetail = async (username) => {
    const getUserFriendDetailResponse = await fetchFunction(`user/getUserFriendDetails/${username}`, "GET")
    return getUserFriendDetailResponse
  }

  const updateUser = async (data) => {
    const updateUserResponse = await fetchFunction("user/updateUser", "PATCH", data)

    return updateUserResponse
  }

  const addAvatar = async (avatarLink) => {
    const addAvatarResponse = await fetchFunction("user/addAvatar", "POST",avatarLink)

    

    return addAvatarResponse
  }
 
  const deleteAvatar = async (avatarPublicId) => {
    const deleteAvatarResponse = await fetchFunction(`user/deleteAvatar/${avatarPublicId}`, "DELETE")

    return deleteAvatarResponse
  }
  const deleteUser = async (username, password) => {
    const deleteUserResponse = await fetchFunction("user/deleteUser", "DELETE", { username, password })


    
    return deleteUserResponse
  }

  return (
    <UserContext.Provider value={{ registerUser, loginUser, logoutUser, getUserDetails, getUserFriendDetail, updateUser, addAvatar,  deleteAvatar, deleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
