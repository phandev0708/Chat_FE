export interface PostCustomer {
    Name: string;
    Email: string;
    Phone: string;
    JobPosition: string;
    CompanyName: string;
    City: string;
    CompanySize: string;
    Product: string;
}
export interface PutCustomer {
    ID: string;
    Name?: string;
    Email?: string;
    Phone?: string;
    JobPosition?: string;
    CompanyName?: string;
    City?: string;
    CompanySize?: string;
    Product?: string;
    Status?: string;
}
