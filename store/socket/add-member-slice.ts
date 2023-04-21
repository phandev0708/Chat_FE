import { profileMock } from '@/mocks/profile-mock';
import { profile } from '@/models/profile';
import { UserChat } from '@/models/user-model';
import { createSlice } from '@reduxjs/toolkit';

const initialState = profileMock;
const addMember = createSlice({
    name: 'addMember',
    initialState,
    reducers: {
        newAddMember(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = addMember;

export const { newAddMember } = actions;

export default reducer;
