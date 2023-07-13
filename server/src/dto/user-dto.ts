import { User } from "../orm/entity"

class UserDto {
    public email: string | undefined
    public id: string | undefined
    public isActivated: boolean | undefined

    public constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.isActivated = user.is_activated
    }
}

export default UserDto