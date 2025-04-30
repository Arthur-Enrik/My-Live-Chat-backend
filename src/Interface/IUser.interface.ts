export interface IUser {
    _id: string
    username: string
    email: string
    password: string
}

export interface IUserAuthRequest {
    email: string
    password: string
}

export interface IUserRegisterRequest {
    username: string
    email: string
    password: string
}