import { GroupChatInit } from '@/mocks/group-chat';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    status: 0,
};

const newRoom = createSlice({
    name: 'newRoom',
    initialState,
    reducers: {
        createRoom(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
        closeRoom(state) {
            return (state = initialState);
        },
    },
});

const { reducer, actions } = newRoom;

export const { createRoom, closeRoom } = actions;

export default reducer;
