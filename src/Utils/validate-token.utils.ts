import jwt from 'jsonwebtoken'

import { IPayload } from '../Interface/IPayload.interface.js'

const validateToken = (token: string): IPayload => {
    const SECRET = process.env.JWT_HASH as string

    const decoded = jwt.verify(token, SECRET) as IPayload
    return decoded
}

export { validateToken }