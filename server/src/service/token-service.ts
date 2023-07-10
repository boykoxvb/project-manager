const jwt = require('jsonwebtoken')
import IUserData from "../dto/interfaces/IUserData"
import AppDataSource from "../orm"
import { User } from "../orm/entity"
import { Token } from "../orm/entity/Auth/Token"

const tokenRep = AppDataSource.getRepository(Token)

class TokenService {
    
    generateTokens(payload: any) {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            access_token,
            refresh_token
        }
    }

    async saveToken(user: User, refresh_token: string): Promise<Token> {
        const tokenData = await tokenRep.findOne({relations: {user:true}, where: {user: {id: user.id}}})
        if (tokenData) {
            tokenData.refresh_token = refresh_token
            return await tokenRep.save(tokenData)
        }
        const token = new Token(refresh_token, user)
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

    validateAccessToken(token: string): IUserData {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string): IUserData {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
 

}

export default new TokenService()