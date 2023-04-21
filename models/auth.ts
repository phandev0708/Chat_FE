export interface LoginPayload {
    Email: string;
    password: string;
}

export interface RegisterPayload {
    Phone?: string;
    Password: string;
    Email: string;
    LinkFb?: string;
    Name: string;
    IsAccept?: boolean;
    CompanyId?: string;
    IsCompany?: boolean;
    CompanyName?: string;
    CompanyPhone?: string;
    CompanyEmail?: string;
    CompanySize?: string;
    TaxNumber?: string;
}

export interface ChangePassByAdmin {
    UserId: string;
    NewPassword: string;
}
