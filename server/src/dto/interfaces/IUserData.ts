import UserDto from "../user-dto";

export default interface IUserData {
    access_token: string,
    refresh_token: string,
    user: UserDto,
}