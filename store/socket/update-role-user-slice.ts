import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserCreate: '',
    RoomId: '',
    IsAdmin: false,
    UserRole: '',
};
const updateRoleUser = createSlice({
    name: 'updateRoleUser',
    initialState,
    reducers: {
        updateRole(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = updateRoleUser;

export const { updateRole } = actions;

export default reducer;
