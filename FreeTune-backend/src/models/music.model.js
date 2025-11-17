import mongoose, { Schema } from "mongoose";

const musicSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    audioFile: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    duration: {
        type: Number,
        default: 0,
    },
    isShared: {
        type: Boolean,
        default: false
    },
    audioPublicId: {
        type: String,
    },
    thumbnailPublicId: {
        type: String,
    }

}, { timestamps: true })

export const Music = mongoose.model("Music", musicSchema)