import IUserData from "../dto/interfaces/IUserData";
import ApiError from "../exceptions/api-error";
import tokenService from "../service/token-service";

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) return next(ApiError.UnauthorizedError())

        const access_token = authorizationHeader.split(' ')[1]
        if (!access_token) return next(ApiError.UnauthorizedError())

        const userData = tokenService.validateAccessToken(access_token)
        if (!userData) return next(ApiError.UnauthorizedError())
        
        req.userData = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}