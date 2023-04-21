import { createSlice } from '@reduxjs/toolkit';

export interface UpdateRoomManagerGroup {
    RoomId: string;
    IsInvite: boolean;
    IsOnlyAdminChat: boolean;
    IsAutoAcceptMember: boolean;
}
const initialState = {
    RoomId: '',
    IsInvite: '',
    IsOnlyAdminChat: '',
    IsAutoAcceptMember: '',
};
const updateRoomManagerGroup = createSlice({
    name: 'updateRoomManagerGroup',
    initialState,
    reducers: {
        updateRoomManagerAction(state, action) {
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = updateRoomManagerGroup;

export const { updateRoomManagerAction } = actions;

export default reducer;
