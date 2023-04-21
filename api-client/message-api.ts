import { LoginPayload, PayLoadCreateSingle, PayLoadMess, RegisterPayload } from '@/models/index';
import axiosClient from './axios-client';

export const messageApi = {
    getAllUser(idCompany: string) {
        return axiosClient.get(`/user/get-all-user-by-company/${idCompany}`);
    },
    createSingleChat(payload: PayLoadCreateSingle) {
        return axiosClient.post(`/user-room/create-single-chat`, payload);
    },
};
