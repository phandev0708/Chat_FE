import { createSlice } from '@reduxjs/toolkit';

export interface DeleteMessage {
    ID: string;
    RoomId: string;
    DeletedAt: string;
}
const initialState = {
    ID: '',
    RoomId: '',
    DeletedAt: '',
};
const deleteMessage = createSlice({
    name: 'deleteMessage',
    initialState,
    reducers: {
        newDeleteMessage(state, action) {
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = deleteMessage;

export const { newDeleteMessage } = actions;

export default reducer;
