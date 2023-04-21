export interface PutProfile {
    ID: string;
    DOB?: Date;
    Gender?: boolean;
    Name?: string;
    Phone?: string;
    IsAccept?: boolean;
}
export interface UserChat {
    ID: string;
    CompanyId?: string;
    Email?: string;
    Avatar?: string;
    Name?: string;
    IsOnline?: boolean;
}
export interface PutProfileAvatar {
    ID: string;
    DOB?: string;
    Gender?: boolean;
    Name?: string;
    Phone?: string;
    Avatar: string;
    FileSize: number;
}
type NewType = string;

export interface UserChangePassword {
    ID: string;
    OldPassword: string;
    NewPassword: string;
}
export interface VerifyCodeInterface {
    UserId: string;
    Code: string;
}
export interface ForgotPWModel {
    Email: string;
}

export interface SearchUser {
    Key: string;
}
