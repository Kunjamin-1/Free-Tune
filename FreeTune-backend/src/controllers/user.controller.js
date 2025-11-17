import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessTokenRefreshToken = async (user) => {
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: true })
    return { accessToken, refreshToken }
}

const option = {
    secure: true,        
    sameSite: "None",     
    httpOnly: true       
}

// 1) registeruser - done
// 2) loginuser - done
// 3) logoutuser - done
// 4) updateDetails  - done
// 5) add avatar - done
// 6) deleteuser - done
// 7) getDetailOfUser - done
// 8) deleteAvatar -done


const registerUser = asyncHandler(async (req, res) => {

    const { username, fullName, email, password } = req.body

    if (!username || !fullName || !email || !password) {
        throw new ApiError(400, "All field are required")
    }

    const usernameExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })

    if (usernameExists) {
        throw new ApiError(400, "user with this username already exists")
    } else if (emailExists) {
        throw new ApiError(400, "user with this email already exists")
    }

    const newUser = await User.create(
        {
            username,
            email,
            fullName,
            password
        })
    if (!newUser) {
        throw new ApiError(500, "registration failed")
    }
    const createdUser = await User.findOne(newUser._id).select("-password -refreshToken -avatarPublicId")

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "user register succesfully")
        )
})

const loginUser = asyncHandler(async (req, res) => {

 
    const { email, password } = req.body
    console.log(email)
    if (!email || !password) {
        throw new ApiError(400, "Email and Password both are required")
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "email does not exist")
    }

    const isPasswordValid = await user.isPasswordValid(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "incorrect password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(user)
    console.log(accessToken)
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Error occured while generate your token")
    }

    const updatedUser = await User.findOne({ email }).select("-password -refreshToken -avatarPublicId")

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(200, { updatedUser, accessToken }, "user loggedIn successfully")
        )

})

const logoutUser = asyncHandler(async (req, res) => {

    const updatedUser = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken -avatarPublicId")

    if (!updatedUser) {
        throw new ApiError(500, "error occured while logging out")
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, updatedUser, "user loggedOut successfully")
        )
})

const updateUser = asyncHandler(async (req, res) => {
    const { username, fullName, email } = req?.body

    let userWithThisUserName
    let userWithThisEmail

    if (username) {
        userWithThisUserName = await User.findOne({ username })
    }

    if (email) {
        userWithThisEmail = await User.findOne({ email })
    }

    if (userWithThisEmail) {
        throw new ApiError(400, "username already exists")
    }
    if (userWithThisEmail) {
        throw new ApiError(400, "email already exists")
    }


    const updatedUserObj = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: req?.body
        },
        {
            new: true
        }
    ).select("-password -refreshToken -avatarPublicId")

    if (!updatedUserObj) {
        throw new ApiError(501, "error occured while updating user")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUserObj, "user detail updated successfully")
        )
})

const addAvatarOfUser = asyncHandler(async (req, res) => {

    const avatarLocalLink = req?.file?.path

    if (!avatarLocalLink) {
        throw new ApiError(401, "provide a image for avatar")
    }
    let avatar
    let deletePreviousAvatar
    let user = await User.findById(req?.user?._id)

    if (!user?.avatar) {
        avatar = await uploadOnCloudinary(avatarLocalLink)

    } else if (user?.avatar && user?.avatarPublicId) {

        deletePreviousAvatar = await deleteFromCloudinary(user?.avatarPublicId)

        avatar = await uploadOnCloudinary(avatarLocalLink)
    }

    if (!avatar) {
        throw new ApiError(502, "error occured while uploading your avatar")
    }

    user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: {
                avatar: avatar?.url,
                avatarPublicId: avatar?.public_id
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "your avatar has saved successfully")
        )
})

const deleteAvatarOfUser = asyncHandler(async (req, res) => {

    let user = await User.findById(req?.user?._id)
    if (!user?.avatarPublicId) {
        throw new ApiError(401, "avatar is not uploaded")
    }

    if (user?.avatarPublicId !== req?.params?.publicId) {
        throw new ApiError(401, "unauthorized to delete avatar")
    }

    const avatar = await deleteFromCloudinary(user?.avatarPublicId, "image")


    if (!avatar) {
        throw new ApiError(502, "error occured while deleting you avatar")
    }

    user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: {
                avatar: null,
                avatarPublicId: null
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken -avatarPublicId")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "avatar deleted successfully")
        )
})

const getDetailOfUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req?.user?._id).select("-password -refreshToken")
    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "user detail fetched successfully")
        )

})

const getDetailsOfUserFriend = asyncHandler(async (req, res) => {

    const friendUserName = req?.params?.friendUserName.trim()
 
    if (!friendUserName) {
        throw new ApiError(401, "provide username")
    }

    const user = await User.findOne({username: friendUserName }).select("-password -refreshToken -avatarPublicId")

    if (!user) {
        throw new ApiError(402, "username does not exists")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,user,"friend found")
        )


})

const deleteUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new ApiError(400, "Username and Password are required")
    }

    if (username !== req?.user?.username) {
        throw new ApiError(405, "invalid username")
    }

    const user = await User.findOneAndDelete(username).select("-password -refreshToken -avatarPublicId")

    if (!user) {
        throw new ApiError(501, "error occured while deleting your account")
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, user, "user account deleted successfully")
        )

})

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    addAvatarOfUser,
    deleteAvatarOfUser,
    getDetailOfUser,
    getDetailsOfUserFriend,
    deleteUser
}
