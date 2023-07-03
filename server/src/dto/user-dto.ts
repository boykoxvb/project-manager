import { User } from "../orm/entity"

class UserDto {
    public email
    public id
    public isActivated

    public constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.isActivated = user.is_activated
    }
}

export default UserDto