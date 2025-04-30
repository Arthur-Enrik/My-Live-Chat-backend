import { connect, disconnect } from 'mongoose'

const conn = async (dbUser: string, dbPassword: string): Promise<void> => {
    if (!dbUser || !dbPassword) {
        let errors: string[] = []
        if (!dbUser) {
            const message = 'Database user not be specified'
            errors.push(message)
        }
        if (!dbPassword) {
            const message = 'Database password not be specified'
            errors.push(message)
        }
        throw errors
    } else {
        try {
            await connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.u56fjaz.mongodb.net/Chat?retryWrites=true&w=majority&appName=Cluster0`)
        } catch (error) {
            disconnect()
            throw error
        }
    }
}

export { conn }