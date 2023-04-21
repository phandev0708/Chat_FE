import { createSlice } from '@reduxjs/toolkit';

interface usersState {
    userList: any[];
}

let initialState: usersState = {
    userList: [],
};
const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setuserList(state, action) {
            state.userList = action.payload;
        },
    },
});

const { reducer, actions } = users;

export const { setuserList } = actions;

export default reducer;
