export interface CreateSingleChatRoom {
    UserInvite: string;
}

export interface PostChatData {
    Text: string;
    ChatRoom: string;
    Type: string;
    Path?: string;
    FileUploads?: string[];
    MentionList: string[];
}

export interface ChatPaginate {
    roomId: string;
    page: string;
    limit: string;
}

export interface PostGroupChat {
    UserInviteList: string[];
    RoomName: string;
    RoomImage: string;
    IsInvite: boolean;
    IsOnlyAdminChat: boolean;
    FileSize: number;
}
export interface ProfileChat {
    ID: string;
    RoomName?: string;
    RoomImage?: string;
    FileSize?: number;
}
export interface UpdateChat {
    // ChatId: string;
    RoomId: string;
    UserCreate: string;
}
export interface ChatFindModel {
    // ChatId: string;
    ID: string;
    Text: string;
    UserName: string;
    Avatar: string;
    CreatedAt: string;
}
