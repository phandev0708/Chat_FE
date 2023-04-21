import { profile } from '@/models/profile';
import { ChatRoom, Mess, UserReadChat } from '@/models/user-infor';
import { createSlice } from '@reduxjs/toolkit';

interface ReadChat {
    ChatRoom: ChatRoom;
    LastChatRoom: Mess;
    UserInfo: profile;
    UserRead: UserReadChat[];
}

const chatRoom: ChatRoom = {
    ID: '',
    IsGroup: false,
    RoomImage: '',
    RoomName: '',
};

const lastChatRoom: Mess = {
    ID: '',
    CreatedAt: '',
    ShortLink: '',
    Text: '',
    Type: '',
    UserCreate: '',
    Status: '',
};
const CompanyId = {
    CompanyCode: '',
    CompanyDB: '',
    CompanyEmail: '',
    CompanyName: '',
    CompanyPhone: '',
    CompanySize: '',
    CreatedAt: '',
    ID: '',
    Logo: '',
    WebsiteLink: '',
};
const userInfo: profile = {
    ID: '',
    Avatar: '',
    CompanyId: CompanyId,
    Email: '',
    DOB: '',
    FileSize: 0,
    Gender: '',
    LastLogin: '',
    LastOnline: '',
    Name: '',
    NumPad: '',
    Phone: '',
    RoleGroupId: '',
    TwoFactorEnable: '',
    UserCreate: '',
};

const initialState: ReadChat = {
    ChatRoom: chatRoom,
    LastChatRoom: lastChatRoom,
    UserInfo: userInfo,
    UserRead: [],
};

const readChat = createSlice({
    name: 'readMessage',
    initialState,
    reducers: {
        readMessage(state, action) {
            // console.log('action.payload', action.payload);
            return (state = action.payload);
        },
    },
});

const { reducer, actions } = readChat;

export const { readMessage } = actions;

export default reducer;
