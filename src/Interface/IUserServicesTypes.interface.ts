

export interface BaseResponse {
    success: boolean;
    message?: string
    err?: 'AUTH_ERR' | 'CONFLICT' | 'SERVER_ERR' | 'NOT_FOUND'
}

export interface AuthorizeResponse extends BaseResponse {
    user?: { username: string, _id: string }
    token?: string
}

export interface GetResponse extends BaseResponse {
    users?: Array<{ username: string, email: string }>
    user?: { username: string, email: string }
}

export interface GetContactsResponse extends BaseResponse {
    chats: Record<string, {
        _id: string
        username: string
        nickname?: string
        messages?: Array<{
            message: string,
            isOwner: boolean,
            messageId: string
        }>
    }>
}