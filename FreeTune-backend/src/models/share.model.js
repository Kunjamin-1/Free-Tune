import mongoose, { Schema } from "mongoose";

const shareSchema = new Schema({

    sharedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    musicShared: {
        type: Schema.Types.ObjectId,
        ref: "Music",
        required: true
    },
    sharedTo:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    

}, { timestamps: true })

export const Share = mongoose.model("Share", shareSchema)