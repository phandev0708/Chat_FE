import { GroupChat, Mess } from '@/models/user-infor';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ChatInput from './chat-input';
import HeaderBoxChat from './header-box-chat';
import MessageView from '../message/message-view';
import { useContext, useEffect, useState } from 'react';
import { UserChat } from '@/models/user-model';
import { SocketContext } from '../../socket';
import { UpdateChat } from '@/models/chat-model';
import { IntroChat } from '../../intro';
import { profile } from '@/models/profile';
const drawerWidth = 350;

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

export interface IBoxChatProps {
    inforUser: GroupChat;
    open: boolean;
    setOpen: any;
    listUser: UserChat[];
    listUserRead: profile[];
}

export default function BoxChat({
    inforUser,
    open,
    setOpen,
    listUser,
    listUserRead,
}: IBoxChatProps) {
    const socketOnline = useSelector((state: any) => {
        return state.onlineOffline;
    });
    const [messReply, setMessReply] = useState<Mess | null>(null);
    const [lastChatId, setLastChatId] = useState(inforUser?.LastChat?.ID);
    const [listMess, setListMess] = useState<Mess[]>([]);
    const [pageMax, setPageMax] = useState(1);
    const [pageMin, setPageMin] = useState(0);
    const [index, setIndex] = useState<{ ID: string; Text: string }>({ ID: '', Text: '' });
    const [openLoading, setOpenLoading] = useState(false);
    // 100% - 350px - 340px
    // console.log('socket', socket);
    return (
        <Stack flex={1}>
            <>
                <Main open={open}>
                    {!inforUser.ChatRoom?.ID ? (
                        // <Stack
                        //     sx={{ backgroundColor: '#262626' }}
                        //     flex={1}
                        //     height={'100vh'}
                        // ></Stack>
                        <IntroChat />
                    ) : (
                        <Stack flex={1} sx={{ height: '100vh' }} direction={'column'}>
                            <HeaderBoxChat
                                key={inforUser.ChatRoom?.ID}
                                idRoom={inforUser.ChatRoom?.ID}
                                title={
                                    inforUser.ChatRoom?.IsGroup
                                        ? inforUser.ChatRoom?.RoomName
                                        : inforUser.UserChat?.Name
                                }
                                setOpen={() => setOpen((prev: any) => !prev)}
                                avatar={
                                    inforUser.ChatRoom?.IsGroup
                                        ? inforUser.ChatRoom?.RoomImage
                                            ? BACKEND_DOMAIN + inforUser.ChatRoom?.RoomImage
                                            : ''
                                        : inforUser.UserChat?.Avatar
                                        ? BACKEND_DOMAIN_ERP + inforUser.UserChat?.Avatar
                                        : ''
                                }
                                status={
                                    inforUser.UserChat?.ID &&
                                    socketOnline.ID &&
                                    socketOnline.ID === inforUser.UserChat?.ID
                                        ? socketOnline.online
                                        : inforUser.IsOnline
                                }
                                open={open}
                                setListMess={setListMess}
                                setPageMax={setPageMax}
                                pageMax={pageMax}
                                setPageMin={setPageMin}
                                pageMin={pageMin}
                                setIndex={setIndex}
                                setOpenLoading={setOpenLoading}
                            ></HeaderBoxChat>
                            <MessageView
                                inforUser={inforUser}
                                setMessReply={setMessReply}
                                listUser={listUser}
                                setLastChatId={setLastChatId}
                                setListMess={setListMess}
                                listMess={listMess}
                                setPageMax={setPageMax}
                                pageMax={pageMax}
                                setPageMin={setPageMin}
                                pageMin={pageMin}
                                indexChat={index}
                                setIndexChat={setIndex}
                                openLoading={openLoading}
                                setOpenLoading={setOpenLoading}
                            ></MessageView>
                            <ChatInput
                                inforUser={inforUser}
                                messReply={messReply}
                                setMessReply={setMessReply}
                                lastChatId={lastChatId}
                                listUser={listUser}
                                listUserRead={listUserRead}
                            ></ChatInput>
                        </Stack>
                    )}
                </Main>
            </>
        </Stack>
    );
}
