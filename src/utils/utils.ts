export const ParseConversationId = (array: string[]) => {
    return array.sort().join('-');
}
