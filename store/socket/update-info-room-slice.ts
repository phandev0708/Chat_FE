import { profileMock } from '@/mocks/profile-mock';
import { profile } from '@/models/profile';
import { UserChat } from '@/models/user-model';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    RoomName: '',
    RoomImage: '',
    UserCreate: '',
    RoomId: '',
};
const updateInfoRoom = createSlice({
    name: 'updateInfoRoom',
    initialState,
    reducers: {
        newInfoRoom(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = updateInfoRoom;

export const { newInfoRoom } = actions;

export default reducer;
