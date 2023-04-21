export interface UserChatModel {
    ID: string;
    Email: string;
    Avatar: string;
    Name: string;
    IsOnline: boolean;
    CompanyId: string;
}
export interface UserMentionModel {
    id: string;
    display?: string;
    avatar?: string;
}
