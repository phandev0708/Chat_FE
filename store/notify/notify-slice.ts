import { profile } from '@/models/profile';
import { ChatRoom, Mess, UserReadChat } from '@/models/user-infor';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
};

const countNotify = createSlice({
    name: 'countNotify',
    initialState,
    reducers: {
        countNotification(state, action) {
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = countNotify;

export const { countNotification } = actions;

export default reducer;
