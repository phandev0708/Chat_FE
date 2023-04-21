import { GroupChatInit } from '@/mocks/group-chat';
import { createSlice } from '@reduxjs/toolkit';

const initialState = GroupChatInit;
const addRoom = createSlice({
    name: 'addRoom',
    initialState,
    reducers: {
        newAddRoom(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
        closeAddRoom(state) {
            return (state = initialState);
        },
    },
});

const { reducer, actions } = addRoom;

export const { newAddRoom, closeAddRoom } = actions;

export default reducer;
