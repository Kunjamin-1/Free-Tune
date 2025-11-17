import ApiError from "../utils/ApiError.js"


export const sendError = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                statusCode: err.statusCode
            })
    }

    
}