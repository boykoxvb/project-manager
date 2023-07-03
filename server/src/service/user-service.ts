import {User} from '../orm/entity/User'
import AppDataSource from '../orm'
import mailService from './mail-service'
import { v4 } from 'uuid'
import tokenService from './token-service'
import UserDto from '../dto/user-dto'
import ApiError from '../exceptions/api-error'

const bcrypt = require('bcrypt')

const userRep = AppDataSource.getRepository(User)

class UserService {

    async registration(
        login: string, 
        name: string, 
        email: string, 
        password: string
        ) {
        const loginCandidate = await userRep.findOne({where: {login: login}})
        if (loginCandidate) throw ApiError.BadRequrest(`Пользователь с логином ${login} уже существует`)
        const emailCandidate = await userRep.findOne({where: {email: email}})
        if (emailCandidate) throw ApiError.BadRequrest(`Пользователь с email ${email} уже существует`)
        const hashPassword = await bcrypt.hash(password, 3)
        const activation_link = v4()
        let user = new User(name, login, hashPassword, email, activation_link)
        user = await userRep.save(user)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(user, tokens.refreshToken)

        // await userRep.delete({id: user.id})

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activation_link}`)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activation_link: string) {
        const user = await userRep.findOne({where: {activation_link: activation_link}})
        if (!user) throw ApiError.BadRequrest('Нерабочая ссылка активации')
        user.is_activated = true
        await userRep.save(user)
        console.log('ACTIVATING USER')
    }

    async login(email: string, password: string) {
        const user = await userRep.findOne({where: {email: email}})
        if (!user) throw ApiError.BadRequrest(`Пользователь с email ${email} не был найден`)
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) throw ApiError.BadRequrest(`Неверный пароль`)

        const userDto = new UserDto(user)
        
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(user, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refresh_token: string) {
        const token = await tokenService.removeToken(refresh_token)
        return token
    }

    async refresh(refresh_token: string) {
        const userData = tokenService.validateRefreshToken(refresh_token)
        const tokenFromDB = await tokenService.findRefreshToken(refresh_token)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await userRep.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(user, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

}

export default new UserService()