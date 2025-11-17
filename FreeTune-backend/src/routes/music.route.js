import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlerware.js";
import { uploadMusic, addSharedMusic, deleteMusic, getAllMusic, getAllSharedMusic, removeSharedMusic, shareMusic  } from "../controllers/music.controller.js";
import { upload } from "../middlewares/multer.middlerware.js";

const router = Router()

router.route("/uploadMusic").post(
    upload.fields(
        [
            {
                name:"audioFile",
                maxCount:1
            },
            {
                name:"thumbnail",
                maxCount:1,
            }
        ]
    ),verifyJWT,uploadMusic)
    
router.route("/getAllMusic").get(verifyJWT,getAllMusic)
router.route("/shareMusic/:sharedMusicId").post(verifyJWT,shareMusic)
router.route("/getAllSharedMusic").get(verifyJWT,getAllSharedMusic)
router.route("/addSharedMusic").post(verifyJWT,addSharedMusic)
router.route("/removeSharedMusic/:removeSharedMusicId").delete(verifyJWT,removeSharedMusic)
router.route("/deleteMusic/:deleteMusicId").delete(verifyJWT,deleteMusic)

export default router