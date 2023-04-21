import { Status } from '@/components/common/box-chat/avatar/avatar_chat';
import { VoteCreate, VoteInfo } from './vote';

export interface GroupChat {
    IsOnline: Status;
    ChatRoom: ChatRoom;
    LastChat?: Mess;
    UserChat: UserChat;
    MessUnread: number;
}

export interface ChatRoom {
    ID: string;
    RoomImage: string;
    RoomName: string;
    IsGroup: boolean;
    IsInvite?: boolean;
    IsAutoAcceptMember?: boolean;
    IsOnlyAdminChat?: boolean;
}

export interface Mess {
    ID: string;
    ShortLink?: string;
    Text: string;
    Type: string;
    UserCreate: string;
    CreatedAt: string;
    IsPin?: boolean;
    IsSystem?: boolean;
    Avatar?: string;
    Name?: string;
    RoomId?: string;
    files?: Files[];
    Status?: string;
    DeleteAt?: string;
    ChatReply?: ChatReply;
    Vote?: VoteInfo;
    ListUserJSON?: string;
}
export interface ChatReply {
    ID: string;
    ShortLink: string;
    Text: string;
    Type: string;
    UserCreate: string;
    CreatedAt: string;
    IsPin?: boolean;
    IsSystem?: boolean;
    Avatar?: string;
    Name?: string;
    RoomId?: string;
    files?: Files[];
    StatusMess?: string;
    DeleteAt?: string;
    ChatRoom?: any;
}

export interface UserReadChat {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeleteAt: string;
    UserId: string;
}

export interface Files {
    ID: string;
    Path: string;
    FileName: string;
    FileSize: string;
}
export interface UserChat {
    ID: string;
    Avatar: string;
    Name: string;
}

export interface ChatMess {
    Text: string;
    Type: string;
    UserCreate: string;
    RoomId: string;
    files?: any[];
    ReplyChatId?: string;
    TypeChat?: string;
    Vote?: VoteCreate;
    MentionList?: any[];
}

export interface Group {
    ID: string;
    RoomImage: string;
    RoomName: string;
    UserChats: UserChat[];
    UserCreate: string;
}
