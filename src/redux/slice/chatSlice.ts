import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Message {
    id: string,
    content: string,
    sentAt: string,
    sentBy: string,
    image?: string,
};

interface ChatRoom {
    participants: string[],
    messages: Message[],
};

export interface ChatState {
    chatRoom: ChatRoom[]
};

const initialState: ChatState = {
    chatRoom: []
};

const chatSlice = createSlice({
    name: 'chatReducer',
    initialState,
    reducers: {
        saveChatRoom: (state, action) => {
            state.chatRoom = action.payload;
        },
        deleteChatRoom: (state) => initialState,
    },
    extraReducers(builder) {

    },
});

export const { saveChatRoom, deleteChatRoom } = chatSlice.actions;
export default chatSlice.reducer;