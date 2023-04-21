export interface profile {
    ID: string;
    Avatar: string;
    CompanyId: CompanyId;
    Email: string;
    DOB: string;
    FileSize: number;
    Gender: string;
    LastLogin: string;
    LastOnline: string;
    Name: string;
    NumPad: string;
    Phone: string;
    RoleGroupId: string;
    TwoFactorEnable: string;
    UserCreate: string;
    IsAdminGroup?: boolean;
}

export interface CompanyId {
    CompanyCode: string;
    CompanyDB: string;
    CompanyEmail: string;
    CompanyName: string;
    CompanyPhone: string;
    CompanySize: string;
    CreatedAt: string;
    ID: string;
    Logo: string;
    WebsiteLink: string;
}
