import { profileMock } from '@/mocks/profile-mock';
import { profile } from '@/models/profile';
import { UserChat } from '@/models/user-model';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserRemove: '',
    UserCreate: '',
    RoomId: '',
};
const removeMember = createSlice({
    name: 'removeMember',
    initialState,
    reducers: {
        newRemoveMember(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = removeMember;

export const { newRemoveMember } = actions;

export default reducer;
