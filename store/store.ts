import { configureStore } from '@reduxjs/toolkit';
import toastSlice from './toast/toastSlice';
import onlineOffline from './socket/online-offile';
import newChat from './socket/new-chat-slice';
import userSlice from './user-list/user';
import newRoom from './socket/new-room-slice';
import addRoom from './socket/add-room-slice';
import deleteMessage from './socket/delete-message-slice';
import readChat from './socket/read-message-slice';
import updateMessage from './socket/update-message-slice';
import addMember from './socket/add-member-slice';
import countNotify from './notify/notify-slice';
import updateRoleUser from './socket/update-role-user-slice';
import newRemoveMember from './socket/remove-user-slice';
import updateInfoRoom from './socket/update-info-room-slice';
import deleteRoomChat from './socket/delete-room-slice';
import updateRoomManagerGroup from './socket/update-manager-group';

const rootReducer = {
    toast: toastSlice,
    onlineOffline: onlineOffline,
    newChat: newChat,
    userList: userSlice,
    newRoom: newRoom,
    addRoom: addRoom,
    deleteMessage: deleteMessage,
    readMessage: readChat,
    updateMessage: updateMessage,
    addMember: addMember,
    countNotify: countNotify,
    updateRoleUser: updateRoleUser,
    newRemoveMember: newRemoveMember,
    updateInfoRoom: updateInfoRoom,
    deleteRoomChat: deleteRoomChat,
    updateRoomManagerGroup: updateRoomManagerGroup,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
