import { LoginPayload, RegisterPayload } from '@/models/index';
import axiosClient from './axios-client';

export const chatApi = {
    getAllTextByRoomId(payLoad: any) {
        return axiosClient.post(`/chat/get-all-text`, payLoad);
    },
    findChatId(chatId: string) {
        return axiosClient.get(`user-room/chat/find-by-chat-id/${chatId}`);
    },
};
