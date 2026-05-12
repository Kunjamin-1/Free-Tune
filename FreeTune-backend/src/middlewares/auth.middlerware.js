import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req?.cookies?.accessToken ||
    req?.header("Authorization")?.replace("Bearer ", "");
  console.log("cookies:", req.cookies);
  console.log("auth header:", req.header("Authorization"));

  if (!token) {
    throw new ApiError(401, "you are not authorized");
  }

  let decodedJWT;
  try {
    decodedJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }

  console.log("hi");

  if (!decodedJWT) {
    throw new ApiError(401, "your token is invalid");
  }

  const user = await User.findById(decodedJWT._id).select(
    "-password -refreshToken -avatarPublicId",
  );

  if (!user) {
    throw new ApiError(500, "Error occured while authorizing you");
  }

  req.user = user;
  next();
});

export { verifyJWT };
