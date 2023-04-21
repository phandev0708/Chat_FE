const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || '';
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import { useAuth } from '@/hooks/auth-hook';
import { LayoutProps } from '@/models/common';
import { countNotification } from '@/redux/notify';
import {
    createRoom,
    deleteRoomChat,
    newAddMember,
    newAddRoom,
    newDeleteMessage,
    newInfoRoom,
    updateRole,
    updateRoomManagerAction,
} from '@/redux/socket';
import { newMessage } from '@/redux/socket/new-chat-slice';
import { offline, online } from '@/redux/socket/online-offile';
import { readMessage } from '@/redux/socket/read-message-slice';
import { newRemoveMember } from '@/redux/socket/remove-user-slice';
import { updateMessageAction } from '@/redux/socket/update-message-slice';
import { enqueueSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'Socket.IO-client';

export interface ISocketCustomProps {}
export const SocketContext: any = createContext({ socket: null });

export default function SocketCustom({ children }: LayoutProps) {
    // const useSocketCustom = UseSocketCustom();
    const { profile } = useAuth();
    const dispath = useDispatch();
    const [socketClient, setSocketClient] = useState<any>(null);
    // const [socketServer, setSocketServer] = useState<Socket | null>(null);
    useEffect(() => {
        if (profile?.data?.ID) {
            const socket = io(BACKEND_DOMAIN, { withCredentials: true });
            socket.on('connect', () => {
                // console.log('socket connected');
                socket.on('join', (idSocket) => {
                    // console.log('idSocket', idSocket);
                    socket.emit('join', { SocketId: idSocket, UserId: profile?.data?.ID });
                });
            });
            setSocketClient(socket);

            return () => {
                socket.disconnect();
                setSocketClient(null);
            };
        }
    }, [profile?.data?.ID]);
    useEffect(() => {
        if (socketClient && profile?.data?.ID) {
            // if (!profile?.data?.ID) return;
            // console.log('connecting.......');

            socketClient.on('userOnline', (data: any) => {
                // console.log('userOnline', data);

                const action = online({ ID: data });
                dispath(action);
            });
            socketClient.on('userOffline', (data: any) => {
                // console.log('userOffline', data);
                const action = offline({ ID: data });
                dispath(action);
            });
            socketClient.on('newMessage', (data: any) => {
                const action = newMessage(data);
                dispath(action);
            });
            socketClient.on('status-create-room', (data: any) => {
                const action = createRoom(data);
                dispath(action);
            });
            socketClient.on('new-room', (data: any) => {
                console.log('new-room', data);
                const action = newAddRoom(data);
                dispath(action);
            });
            socketClient.on('delete-message', (data: any) => {
                // console.log('delete-message', data);
                dispath(newDeleteMessage(data));
            });
            socketClient.on('received-read-message', (data: any) => {
                // console.log('read-message', data);
                dispath(readMessage(data));
            });
            socketClient.on('add-member', (data: any) => {
                // console.log('add-member', data);
                dispath(newAddMember(data));
            });
            socketClient.on('update-role-user', (data: any) => {
                // console.log('update-role-user', data);
                dispath(updateRole(data));
            });
            socketClient.on('remove-user-in-room', (data: any) => {
                // console.log('remove-user-in-room', data);
                dispath(newRemoveMember(data));
            });
            socketClient.on('update-info-room', (data: any) => {
                // console.log('update-info-room', data);
                dispath(newInfoRoom(data));
            });
            socketClient.on('get-unread', (data: any) => {
                // console.log('get-unread', data);
                dispath(countNotification(data));
            });
            socketClient.on('vote', (data: any) => {
                // console.log(data);
                dispath(
                    updateMessageAction({
                        ChatID: data.ID,
                        Votes: data.Vote,
                        UserVote: data.UserCreate,
                    })
                );
            });
            socketClient.on('delete-room', (data: any) => {
                console.log('delete-room', data);
                dispath(deleteRoomChat(data));
            });
            socketClient.on('update-setting-room', (data: any) => {
                console.log('update-setting-room', data);
                dispath(updateRoomManagerAction(data));
            });
            socketClient.on('disconnect', () => {
                console.log('socket disconnected');
            });

            socketClient.on('error', (mess: any) => {
                // console.log('socket error', mess);
                enqueueSnackbar(mess.message, { variant: 'error' });
            });
        }

        // setSocketServer(socket);
    }, [dispath, profile?.data?.ID, socketClient]);

    return (
        <SocketContext.Provider value={{ socket: socketClient }}>{children}</SocketContext.Provider>
    );
}
