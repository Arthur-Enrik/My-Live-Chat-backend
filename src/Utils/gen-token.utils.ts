import jwt from 'jsonwebtoken'

const genToken = (_id: string, email: string): string => {
    const jwtHash = process.env.JWT_HASH as string

    if (!jwtHash) {
        throw new Error('Jwt hash not found')
    }

    const token = jwt.sign({
        _id,
        email
    }, jwtHash)

    return token
}

export { genToken }