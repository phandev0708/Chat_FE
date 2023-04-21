export interface PostRole {
    RoleGroupName: string;
    KeyShort: string;
    Description: string;
    IsCreateRole: boolean;
    IsReadRole: boolean;
    IsUpdateRole: boolean;
    IsDeleteRole: boolean;
    IsCreateUser: boolean;
    IsReadUser: boolean;
    IsUpdateUser: boolean;
    IsDeleteUser: boolean;
    AppRoleList?: AppRoleList[];
    IsCheckCustomer: boolean;
}

export interface PutCRUDRoleApp {
    ID: string;
    IsCreate: boolean;
    IsRead: boolean;
    IsUpdate: boolean;
    IsDelete: boolean;
}

export interface AppRoleList {
    AppId: string;
    IsCreate: boolean;
    IsRead: boolean;
    IsUpdate: boolean;
    IsDelete: boolean;
}
export interface AddAppRole {
    RoleGroupId: string;
    AppId: string;
}

export interface PutBasicRole {
    ID: string;
    RoleGroupName?: string;
    KeyShort?: string;
    Description?: string;
    IsCreateRole: boolean;
    IsReadRole: boolean;
    IsUpdateRole: boolean;
    IsDeleteRole: boolean;
    IsCreateUser: boolean;
    IsReadUser: boolean;
    IsUpdateUser: boolean;
    IsDeleteUser: boolean;
    IsCheckCustomer: boolean;
}
export interface PutRoleUser {
    UserId: string;
    RoleGroupId?: string;
}

export interface UpdateRoleUser {
    RoomId: string;
    UserCreate: string;
    UserUpdate: string;
    IsAdmin: boolean;
}
