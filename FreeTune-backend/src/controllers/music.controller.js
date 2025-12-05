import { Music } from "../models/music.model.js";
import { Share } from "../models/share.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

// 1) uploadMusic - done
// 2) deleteMusic -done
// 3) getAllMusic - done
// 4) shareYourMusic - done
// 5) addSharedMusic -done
// 6) getAllSharedMusic - done
// 7) removeSharedMusic - done

const uploadMusic = asyncHandler(async (req, res) => {
    const { title, artistName } = req.body

    if (!title) {
        throw new ApiError(400, "title is required")
    }

    const audioFileLocalLink = req?.files?.audioFile[0]?.path
    let thumbnailLocalLink = null

    if (!audioFileLocalLink) {
        throw new ApiError(400, "audio file is required")
    }
    if (req.files.thumbnail) {
        thumbnailLocalLink = req?.files?.thumbnail[0]?.path
    }

    const audioFileLink = await uploadOnCloudinary(audioFileLocalLink)
    const thumbnailLink = await uploadOnCloudinary(thumbnailLocalLink)

    if (!audioFileLink) {
        throw new ApiError(401, "error occured while saving audio file")
    }

    const musicCollection = await Music.create(
        {
            user: req?.user?._id,
            title,
            audioFile: audioFileLink?.url || "",
            artistName: artistName || null,
            thumbnail: thumbnailLink?.url || null,
            duration: audioFileLink?.duration,
            audioPublicId: audioFileLink?.public_id,
            thumbnailPublicId: thumbnailLink?.public_id || null
        }
    )
    if (!musicCollection) {
        throw new ApiError(505, "error occured while saving music")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, musicCollection, "music uploaded successfully")
        )

})

const getAllMusic = asyncHandler(async (req, res) => {

    const allMusic = await Music.find({ user: req?.user?._id }).select("-audioPublicId -thumbnailPublicId")
    console.log(allMusic)
    if (!allMusic) {
        throw new ApiError(500, "error occured while fetching all music")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, allMusic, "Music fetched successfully")
        )
})

const shareMusic = asyncHandler(async (req, res) => {

    const musicId = req.params.sharedMusicId.trim();

    const { username } = req.body

    if (!musicId) {
        throw new ApiError(401, "provide music id")
    }

    if (!username) {
        throw new ApiError(400, "provide username whom you want to share")
    }

    const musicExists = await Music.findById(musicId)

    if (!musicExists) {
        throw new ApiError(400, "no such music is uploaded")
    }

    const userExists = await User.findOne({ username })

    if (!userExists) {
        throw new ApiError(400, "username does not exists")
    }

    const sharedMusic = await Share.create(
        {
            sharedBy: req?.user?._id,
            musicShared: musicId,
            sharedTo: userExists?._id
        }
    )

    if (!sharedMusic) {
        throw new ApiError(500, "error occured while sharing the song")
    }

    const musicShared = await Share.findById(sharedMusic?._id).populate({
        path: "musicShared",
        select: "-user -createdAt -updatedAt -__v"
    }).populate({
        path: "sharedBy",
        select: "avatar username"
    })

    return res
        .status(200)
        .json(new ApiResponse(200, musicShared, "music shared successfully"))
})

const getAllSharedMusic = asyncHandler(async (req, res) => {

    const sharedMusic = await Share.find({ sharedTo: req?.user?._id }).populate({
        path: "musicShared",
        select: "-user -createdAt -audioPublicId -thumbnailPublicId -updatedAt -__v"
    }).populate({
        path: "sharedBy",
        select: "username avatar"
    }).catch(error => {
        throw new ApiError(500, error)
    })

    if (sharedMusic.length === 0) {
        return res.status(200).json(new ApiResponse(200, null, "no music has shared"))
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, sharedMusic, "all shared music has fetched successfully")
        )

})

const addSharedMusic = asyncHandler(async (req, res) => {

    const { sharedMusicId, title, audioFileLink, artistName, thumbnailLink, duration } = req.body

    if (!title) {
        throw new ApiError(400, "title is required")
    } else if (!sharedMusicId) {
        throw new ApiError(400, "id is required")
    } else if (!audioFileLink) {
        throw new ApiError(400, "audio link is required")
    }


    const sharedMusicAdded = await Music.create(
        {
            user: req?.user?._id,
            title,
            audioFile: audioFileLink,
            artistName: artistName || null,
            thumbnail: thumbnailLink || null,
            duration: Number(duration),
            isShared: true,
        }
    )

    if (!sharedMusicAdded) {
        throw new ApiError(505, "error occured while saving the music")
    }

    const removeSharedMusicFromNotification = await Share.findByIdAndDelete(sharedMusicId)

    if (!removeSharedMusicFromNotification) {
        throw new ApiError(404, "removing music from notification failed")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, sharedMusicAdded, "music added successfully"))

})

const removeSharedMusic = asyncHandler(async (req, res) => {

    const musicId = req?.params?.removeSharedMusicId.trim()

    if (!musicId) {
        throw new ApiError(400, "provide id to delete music")
    }

    const removeResponse = await Share.findOneAndDelete({ musicShared: musicId })

    if (!removeResponse) {
        throw new ApiError(500, "error occured while deleting the shared music")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, removeResponse, "shared music deleted successfully")
        )
})

const deleteMusic = asyncHandler(async (req, res) => {

    const musicId = req?.params?.deleteMusicId.trim()

    let deleteAudioFromCloud = null
    let deleteThumbnailFromCloud = null

    if (!musicId) {
        throw new ApiError(402, "provide music id")
    }

    const musicCollection = await Music.findById(musicId)

    if (!musicCollection) {
        throw new ApiError(500, "no such music is uploaded")
    }

    if (musicCollection?.user !== req?.user?._id || musicCollection?.isShared  ) {
        throw new ApiError(401, "not authorized to delete this music")
    }

    const finalResult = await Music.findByIdAndDelete(musicId).select("-audioPublicId -thumbnailPublicId")


    const doesUserWithSameAudioExists = await Music.find({ audioFile: musicCollection?.audioFile })

    const doesUserWithSameThumbnailExists = await Music.find({ thumbnail: musicCollection?.thumbnail })

    if (doesUserWithSameAudioExists.length === 0 || doesUserWithSameThumbnailExists.length === 0) {
        deleteAudioFromCloud = await deleteFromCloudinary(musicCollection?.audioPublicId, "video")

        deleteThumbnailFromCloud = await deleteFromCloudinary(musicCollection?.thumbnailPublicId, "image")

        if (!deleteAudioFromCloud) {
            throw new ApiError(500, "error occured while deleting the music")
        }
    }

    if (!finalResult) {
        throw new ApiError(500, "error occured while deleting the music")
    }



    return res.status(200).json(new ApiResponse(200, finalResult, "music deleted successfully"))
})

export {
    uploadMusic,
    getAllMusic,
    shareMusic,
    getAllSharedMusic,
    addSharedMusic,
    removeSharedMusic,
    deleteMusic
}