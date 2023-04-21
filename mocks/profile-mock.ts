import { CompanyId, profile } from '@/models/profile';
import { GroupChat } from '@/models/user-infor';

export const CompanyIdMock: CompanyId = {
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
export const profileMock: profile = {
    ID: '',
    Avatar: '',
    CompanyId: CompanyIdMock,
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
    IsAdminGroup: false,
};
export const conversationsMock: GroupChat[] = [];
