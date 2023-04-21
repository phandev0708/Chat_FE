import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserRemove: '',
    ID: '',
    RoomId: '',
};
const deleteRoom = createSlice({
    name: 'deleteRoom',
    initialState,
    reducers: {
        deleteRoomChat(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = deleteRoom;

export const { deleteRoomChat } = actions;

export default reducer;
