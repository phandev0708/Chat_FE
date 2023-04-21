import { Status } from '@/components/common/box-chat/avatar/avatar_chat';
import { createSlice } from '@reduxjs/toolkit';

interface Online {
    ID: string;
    online: Status;
}
const initialState: Online = {
    ID: '',
    online: Status.offline,
};

const onlineOffline = createSlice({
    name: 'online-offline',
    initialState,
    reducers: {
        offline(state, action) {
            state.ID = action.payload.ID;
            state.online = Status.offline;
        },
        online(state, action) {
            state.ID = action.payload.ID;
            state.online = Status.online;
        },
    },
});

const { reducer, actions } = onlineOffline;

export const { offline, online } = actions;

export default reducer;
