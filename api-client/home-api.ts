import { LoginPayload, PayLoadMess, RegisterPayload } from '@/models/index';
import axiosClient from './axios-client';

export const homeApi = {
    getAllUser(idCompany: string) {
        return axiosClient.get(`/user/get-all-user-by-company/${idCompany}`);
    },
    getAllUserOutsideGroupChat(roomId: string) {
        return axiosClient.get(`/user-room/get-user-outside-group-chat/${roomId}`);
    },
    getAllUserInGroupChat(roomId: string) {
        return axiosClient.get(`/user-room/get-all-user-in-group-chat/${roomId}`);
    },
    getListMessChat(payload: PayLoadMess) {
        return axiosClient.post(`user-room/chat/paginate`, payload);
    },
    getAllGroupChat() {
        return axiosClient.get(`/user-room/chat-list`);
    },
    getFileAndLink(payload: PayLoadMess) {
        return axiosClient.post(`/user-room/get-file-and-link-by-room`, payload);
    },
    getImage(payload: PayLoadMess) {
        return axiosClient.post(`/user-room/load-more-image`, payload);
    },
    getFile(payload: PayLoadMess) {
        return axiosClient.post(`/user-room/load-more-file`, payload);
    },
    getLink(payload: PayLoadMess) {
        return axiosClient.post(`/user-room/load-more-link`, payload);
    },
    getAllGroupChatSort(sortName: string) {
        return axiosClient.get(`/user-room/list-room-chat/${sortName}`);
    },
};
