import { IUser } from "../../Interface/IUser.interface.js"

import { BaseResponse } from "../../Interface/IUserServicesTypes.interface.js"
import { AuthorizeResponse } from "../../Interface/IUserServicesTypes.interface.js"
import { GetResponse } from "../../Interface/IUserServicesTypes.interface.js"

import { User } from "../../Model/user.model.js"

import { hash, compare, genSalt } from 'bcrypt'
import { genToken } from "../../Utils/gen-token.utils.js"
import { v4 } from "uuid"

class UserServices {
    register = async (username: string, email: string, password: string): Promise<BaseResponse> => {
        try {
            const userExist = await User.findOne({ email: email }).lean()
            if (userExist) {
                return {
                    success: false,
                    message: 'Este email já está em uso!'
                } as BaseResponse
            }

            const salt: string = await genSalt(10)
            const passwordHash: string = await hash(password, salt)

            const _id: string = v4()
            await User.create({ _id, username, email, password: passwordHash })

            return {
                success: true,
                message: 'Usuario cadastrado com sucesso!'
            } as BaseResponse
        } catch (error) {
            console.log(error)
            throw new Error('Ocorreu um erro no servidor')
        }
    }

    authorize = async (email: string, password: string): Promise<AuthorizeResponse> => {
        try {
            const user = await User.findOne({ email: email }).select('+password').lean() as IUser

            if (!user) {
                return {
                    success: false,
                    message: 'Usuário não encontrado'
                } as AuthorizeResponse
            }

            if (!(await compare(password, user.password))) {
                return {
                    success: false,
                    err: 'AUTH_ERR',
                    message: 'Senha incorreta'
                } as AuthorizeResponse
            } else {
                const token = genToken(user._id, user.email)
                return {
                    success: true,
                    message: 'Usuario autenticado',
                    token,
                    user: { username: user.username, _id: user._id }
                } as AuthorizeResponse
            }
        } catch (error) {
            throw new Error('Ocorreu um erro no servidor')
        }
    }

    delete = async (_id: string): Promise<BaseResponse> => {
        try {
            const userDeleted = await User.findByIdAndDelete(_id)
            if (!userDeleted) {
                return {
                    success: false,
                    message: 'Usuario não encontrado'
                } as BaseResponse
            }
            return {
                success: true,
                message: 'Usuario deletado com sucesso!'
            } as BaseResponse
        } catch (error) {
            throw new Error('Ocorreu um erro no servidor')
        }
    }

    get = async (_id: string): Promise<GetResponse> => {
        try {
            const user = await User.findById(_id)
            if (!user) {
                return {
                    success: false,
                    message: 'Usuário não encontrado'
                } as GetResponse
            } else {
                return {
                    success: true,
                    user: { username: user.username, email: user.email, _id: user._id }
                } as GetResponse
            }
        } catch (error) {
            console.log(error)
            throw new Error('Ocorreu um erro no servidor')
        }
    }
}

export { UserServices }