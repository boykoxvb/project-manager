import IUserDto from './IUserDto'

export default interface IAuthResponse {
  access_token?: string
  refresh_token?: string
  user?: IUserDto
}
