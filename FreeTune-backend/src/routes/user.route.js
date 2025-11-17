import { Router } from "express";
import { addAvatarOfUser, deleteAvatarOfUser, deleteUser, getDetailOfUser, getDetailsOfUserFriend, loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";
import { upload } from "../middlewares/multer.middlerware.js";
const router = Router()

router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logoutUser").get(verifyJWT, logoutUser)
router.route("/updateUser").patch(verifyJWT, updateUser)
router.route("/addAvatar").post(upload.single('avatar'), verifyJWT, addAvatarOfUser)
router.route("/deleteAvatar/:publicId").delete(verifyJWT, deleteAvatarOfUser)
router.route("/getUserDetails").get(verifyJWT, getDetailOfUser)
router.route("/getUserFriendDetails/:friendUserName").get(verifyJWT, getDetailsOfUserFriend)
router.route("/deleteUser").delete(verifyJWT, deleteUser)

export default router