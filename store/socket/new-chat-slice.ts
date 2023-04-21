import { Mess } from '@/models/user-infor';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Mess = {
    ID: '',
    ShortLink: '',
    Text: '',
    Type: '',
    UserCreate: '',
    CreatedAt: '',
    IsPin: false,
    IsSystem: false,
    Avatar: '',
    Name: '',
    files: [],
    Status: '',
};

const newChat = createSlice({
    name: 'newMessage',
    initialState,
    reducers: {
        newMessage(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = newChat;

export const { newMessage } = actions;

export default reducer;
