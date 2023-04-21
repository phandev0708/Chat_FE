import { Status } from '@/components/common/box-chat/avatar/avatar_chat';
import { GroupChat } from '@/models/user-infor';
export const ChatRoom = {
    ID: '',
    RoomImage: '',
    RoomName: '',
    IsGroup: false,
};

export const LastChat = {
    ID: '',
    ShortLink: '',
    Text: '',
    Type: '',
    UserCreate: '',
    CreatedAt: '',
};
export const UserChat = {
    ID: '',
    Avatar: '',
    Name: '',
};

export const GroupChatInit: GroupChat = {
    IsOnline: Status.offline,
    ChatRoom: ChatRoom,
    LastChat: LastChat,
    UserChat: UserChat,
    MessUnread: 0,
};
