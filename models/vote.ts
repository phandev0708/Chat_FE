export interface VoteInfo {
    ID: string;
    Description: string;
    Title: string;
    UserCreate: string;
    CreatedAt: string;
    IsMultiVote?: boolean;
    SumUserRoom: number;
    ChatId: any;
    DeleteAt?: string;
    VoteDeadline?: string;
    VoteItems: VoteItemInfo[];
    RoomId?: any;
}
export interface VoteItemInfo {
    ID: string;
    Title: string;
    Description: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeleteAt: string;
    UserCreate: string;
    UserVotes: UserVoteInfo[];
}
export interface UserVoteInfo {
    ID: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeleteAt?: string;
    UserCreate: string;
    Description?: string;
    Avatar?: string;
    Name?: string;
}
export interface VoteCreate {
    Title: string;
    SumUserRoom?: number;
    Description?: string;
    VoteDeadline?: string;
    IsMultiVote: boolean;
    VoteItem: VoteItemCreate[];
}

export interface VoteItemCreate {
    Title: string;
    Description?: string;
}
export interface ChoiceVotes {
    VoteItemId: string;
}

export interface CreateUserVote {
    ChatId: string;
    UserCreate: string;
    ListVoteItem: CreateVoteItem[];
}
export interface CreateVoteItem {
    VoteItemId: string;
}
