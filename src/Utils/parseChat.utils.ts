function parseChats(mongooseChats: Map<string, any> | Record<string, any>): Record<string, any> {
    const entries = mongooseChats instanceof Map
        ? Array.from(mongooseChats.entries())
        : Object.entries(mongooseChats);

    const chats: Record<string, any> = {};

    for (const [chatId, chat] of entries) {
        chats[chatId] = {
            _id: chat._id,
            username: chat.username,
            nickname: chat.nickname,
            messages: (chat.messages || []).map((msg: any) => ({
                message: msg.message,
                isOwner: msg.isOwner,
                messageId: msg.messageId,
            }))
        };
    }

    return chats;
}

export { parseChats }