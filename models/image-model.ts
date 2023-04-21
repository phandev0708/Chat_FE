import { Mess } from '@/models/user-infor';
export interface ImageModel {
    Id: string;
    Alt: string;
    Url: string;
}
export interface dataFileModel {
    data: fileInfo[];
    paginate: {
        limit: number;
        page: string;
        total: number;
    };
}
export interface dataLinkModel {
    data: Mess[];
    paginate: {
        limit: number;
        page: string;
        total: number;
    };
}
export interface fileInfo {
    ID: string;
    CreatedAt: string;
    Path: string;
}
