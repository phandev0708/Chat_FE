import { UserChat } from '@/models/user-model';
import { createSlice } from '@reduxjs/toolkit';

export interface UpdateMessage {
    ChatID: string;
    Votes: string[];
    UserVote: UserChat;
}
const initialState = {
    ChatID: '',
    Votes: null,
};
const updateMessage = createSlice({
    name: 'updateMessage',
    initialState,
    reducers: {
        updateMessageAction(state, action) {
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = updateMessage;

export const { updateMessageAction } = actions;

export default reducer;
