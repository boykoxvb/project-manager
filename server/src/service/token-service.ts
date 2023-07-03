const jwt = require('jsonwebtoken')
import AppDataSource from "../orm"
import { User } from "../orm/entity"
import { Token } from "../orm/entity/Token"

const tokenRep = AppDataSource.getRepository(Token)

class TokenService {
    
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(user: User, refreshToken: string): Promise<Token> {
        const tokenData = await tokenRep.findOne({relations: {user:true}, where: {user: {id: user.id}}})
        if (tokenData) {
            tokenData.refresh_token = refreshToken
            return await tokenRep.save(tokenData)
        }
        const token = new Token(refreshToken, user)
        await tokenRep.save(token)
        return token
    }

    async removeToken(refresh_token: string) {
        const tokenData = await tokenRep.delete({refresh_token: refresh_token})
        return tokenData
    }

    async findRefreshToken(refresh_token: string) {
        const tokenData = await tokenRep.findOne({where: {refresh_token: refresh_token}})
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
 

}

export default new TokenService()