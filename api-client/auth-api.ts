import { LoginPayload, RegisterPayload } from '@/models/index';
import axiosClient from './axios-client';

export const authApi = {
    login(payload: LoginPayload) {
        return axiosClient.post('/login', payload);
    },

    logout() {
        return axiosClient.post('/logout');
    },
    register(payload: RegisterPayload) {
        return axiosClient.post('/register', payload);
    },
    registerByAdmin(payload: RegisterPayload) {
        return axiosClient.post('/register/by-admin', payload);
    },
    getProfile() {
        return axiosClient.get('/user/profile');
    },
    createByImportExCel(payLoad: any): any {
        return axiosClient.post(`user/create-by-import-excel`, payLoad);
    },
};
