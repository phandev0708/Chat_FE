import { homeApi } from '@/api/home-api';
import { UpdateChat } from '@/models/chat-model';
import { PayLoadMess } from '@/models/payload-mess';
import { GroupChat, Mess, UserReadChat } from '@/models/user-infor';
import { UserChat } from '@/models/user-model';
import { checkOnline, checkSeenChat, getUserData } from '@/ultis/global-function';
import { Avatar, Stack, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { ExampleContext } from 'pages';
import { SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DialogShareMessage from '../../dialog/dialog-share-message';
import { SocketContext } from '../../socket';
import Message from './message';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircleLoading from '../../loading';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
export interface IMessageViewProps {
    inforUser: GroupChat;
    setMessReply: any;
    listUser: UserChat[];
    setLastChatId: any;
    setListMess: any;
    listMess: Mess[];
    setPageMax: any;
    pageMax: number;
    setPageMin: any;
    pageMin: number;
    indexChat: { ID: string; Text: string };
    setIndexChat: any;
    openLoading: boolean;
    setOpenLoading: any;
}

export default function MessageView({
    inforUser,
    setMessReply,
    listUser,
    setLastChatId,
    listMess,
    setListMess,
    setPageMax,
    pageMax,
    setPageMin,
    pageMin,
    indexChat,
    setIndexChat,
    openLoading,
    setOpenLoading,
}: IMessageViewProps) {
    // const [listMess, setListMess] = useState<Mess[]>([]);
    const [listUserRead, setListUserRead] = useState<UserReadChat[]>([]);
    const { profile } = useContext(ExampleContext);
    const { socket }: any = useContext(SocketContext);
    const boxRef = useRef<HTMLDivElement>(null);
    const messageListRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const [index, setIndex] = useState(0);
    const [isGroup, setIsGroup] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const router = useRouter();
    const { roomId } = router.query;
    const [isScroll, setIsScroll] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [isScrollDown, setIsScrollDown] = useState(false);
    const [messShare, setMessShare] = useState<Mess>();
    const newMess = useSelector((state: any) => {
        return state.newChat;
    });
    const socketOnline = useSelector((state: any) => {
        return state.onlineOffline;
    });
    const readChat = useSelector((state: any) => {
        return state.readMessage;
    });
    useEffect(() => {
        const idCompany = profile?.CompanyId?.ID;
        // console.log(inforUser);
        if (
            idCompany &&
            profile.ID &&
            inforUser?.ChatRoom?.ID &&
            inforUser?.LastChat?.UserCreate !== profile.ID
        ) {
            const payloadUpdate: UpdateChat = {
                RoomId: inforUser?.ChatRoom?.ID,
                UserCreate: profile.ID,
            };
            // console.log('first');
            if (socket) {
                socket.emit('read-message', payloadUpdate);
            }
        }
    }, [profile?.ID, inforUser.ChatRoom?.ID]);
    useEffect(() => {
        (async () => {
            if (!inforUser?.ChatRoom?.ID) return;
            const payload: PayLoadMess = {
                roomId: inforUser?.ChatRoom?.ID || (roomId as string),
                page: '1',
                limit: '20',
            };
            const { data } = await homeApi.getListMessChat(payload);
            setPageMax(data.paginate?.page);
            setTotalPage(data?.paginate?.total_page);
            setIsGroup(data.IsGroup);
            setListUserRead(data.UserReadChat);
            setListMess(data?.data);
        })();
    }, [inforUser.ChatRoom?.ID]);
    useEffect(() => {
        if (newMess?.UserCreate === profile?.ID) {
            boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
            setIndexChat({ ID: '', Text: '' });
        }
        if (pageMax == 1 && !isScroll) {
            boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
            setIndexChat({ ID: '', Text: '' });
        }
        if (
            scrollPositionRef.current !== 0 &&
            boxRef.current &&
            pageMax !== 1 &&
            !isScroll &&
            !isScrollDown
        ) {
            boxRef.current.scrollTo(
                0,
                pageMax > 2 ? scrollPositionRef.current - index : scrollPositionRef.current
            );
            setIndex(scrollPositionRef.current);
        }
    }, [listMess]);

    useEffect(() => {
        if (newMess?.ID && newMess.RoomId === inforUser?.ChatRoom?.ID && !indexChat.ID) {
            console.log('first');
            setLastChatId(newMess?.ID);
            setListMess((listMess: Mess[]) => [...listMess, newMess]);
        }
    }, [newMess?.ID]);
    useEffect(() => {
        if (indexChat.ID) {
            scrollToMessage(indexChat.ID);
        }
    }, [indexChat.ID]);
    useEffect(() => {
        if (readChat?.UserRead?.length > 0) {
            const newListUserRead: SetStateAction<UserReadChat[]> = [];
            listUserRead.map((res: UserReadChat) => {
                let check = false;
                readChat?.UserRead.map((r: any) => {
                    if (res.ID == r.ID) {
                        check = true;
                        newListUserRead.push(r);
                    }
                });
                if (!check) {
                    newListUserRead.push(res);
                }
            });
            setListUserRead(newListUserRead);
        }
        const newListMess: SetStateAction<Mess[]> = [];
        if (listMess.length > 0) {
            listMess.map((res) => {
                if (res.ID == readChat?.LastChatRoom?.ID) {
                    newListMess.push({ ...res, Status: readChat?.LastChatRoom?.Status });
                } else {
                    newListMess.push(res);
                }
            });
            setListMess(newListMess);
        }
    }, [readChat.ChatRoom?.ID, readChat?.LastChatRoom?.ID]);
    const handleScroll = async (e: any) => {
        if (boxRef.current) {
            if (boxRef.current.scrollTop === 0) {
                if (pageMax !== totalPage) {
                    if (!inforUser?.ChatRoom?.ID) return;
                    setOpenLoading(true);
                    const payload: PayLoadMess = {
                        roomId: inforUser?.ChatRoom?.ID,
                        page: (pageMax + 1).toString(),
                        limit: '20',
                    };
                    setIsScrollDown(false);
                    setPageMax((pre: any) => pre + 1);
                    const { data } = await homeApi.getListMessChat(payload);
                    setListMess((pre: any) => data?.data.concat(pre));
                    setOpenLoading(false);
                }
            }
            if (
                boxRef.current.scrollTop &&
                boxRef.current.scrollTop < boxRef.current.scrollHeight - 1100
            ) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
            scrollPositionRef.current = boxRef.current.scrollHeight;
        }
        if (
            e.currentTarget?.scrollHeight - e.currentTarget?.scrollTop ===
            e.currentTarget?.clientHeight
        ) {
            if (indexChat.ID && pageMin > 1) {
                if (!inforUser?.ChatRoom?.ID) return;
                setOpenLoading(true);
                const payload: PayLoadMess = {
                    roomId: inforUser?.ChatRoom?.ID,
                    page: (pageMin - 1).toString(),
                    limit: '20',
                };
                setIsScrollDown(true);
                setPageMin((pre: any) => pre - 1);
                const { data } = await homeApi.getListMessChat(payload);
                setListMess((pre: any) => pre.concat(data?.data));
                setOpenLoading(false);
            }
            if (pageMin <= 1) {
                setIndexChat({ ID: '', Text: '' });
            }
        }
    };
    const scrollToMessage = (messageId: string) => {
        const messageElement = document.getElementById(`message-${messageId}`);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth' });
        }
        setOpenLoading(false);
    };
    return (
        <Stack height={'83vh'} sx={{ position: 'relative' }}>
            <Stack
                ref={boxRef}
                sx={{
                    backgroundColor: '#1E1E1E',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100%',
                }}
                overflow={'auto'}
                onScroll={handleScroll}
            >
                <DialogShareMessage
                    open={openShare}
                    onCloseModal={() => setOpenShare(false)}
                    mess={messShare}
                ></DialogShareMessage>
                <Stack p={2} gap={4} ref={messageListRef}>
                    {listMess?.map((mess, key) => {
                        if (key === listMess.length - 1) {
                            return (
                                <Stack key={key} id={`message-${mess.ID}`}>
                                    <Message
                                        // key={key}
                                        userName={
                                            mess?.UserCreate === profile?.ID ? 'Bạn' : mess.Name
                                        }
                                        mess={mess}
                                        isOnline={checkOnline(
                                            listUserRead,
                                            socketOnline,
                                            listMess[listMess.length - 1]?.UserCreate
                                        )}
                                        setMessReply={setMessReply}
                                        isSeen={checkSeenChat(listUserRead, profile?.ID, listMess)}
                                        isMeLastChat={
                                            listMess[listMess.length - 1].UserCreate == profile?.ID
                                        }
                                        isLastChat={key == listMess.length - 1}
                                        totalHuman={listUser.length}
                                        handleOpenDialogShareMessage={() => {
                                            setOpenShare(true);
                                            setMessShare(mess);
                                        }}
                                    />
                                    {isGroup && (
                                        <Stack
                                            sx={{ ml: 'auto' }}
                                            key={`item-chat-${key}-box-avatar`}
                                            direction="row"
                                            spacing={'2px'}
                                        >
                                            {listUserRead.map((value: any, key2: any) => {
                                                if (value.UserId !== profile?.ID) {
                                                    const read_time = new Date(value.UpdatedAt);
                                                    const message_time = new Date(
                                                        listMess[key].CreatedAt
                                                    );
                                                    if (listMess[key + 1]) {
                                                        const message_next = new Date(
                                                            listMess[key + 1].CreatedAt
                                                        );
                                                        if (
                                                            message_time.getTime() <
                                                                read_time.getTime() &&
                                                            message_next.getTime() >
                                                                read_time.getTime()
                                                        ) {
                                                            return (
                                                                <Tooltip
                                                                    title={
                                                                        getUserData(
                                                                            value.UserId,
                                                                            listUser
                                                                        )?.Name
                                                                    }
                                                                    key={`avatar-member-chat-${key2}`}
                                                                >
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src={
                                                                            getUserData(
                                                                                value.UserId,
                                                                                listUser
                                                                            )?.Avatar
                                                                                ? `${BACKEND_DOMAIN_ERP}${
                                                                                      getUserData(
                                                                                          value.UserId,
                                                                                          listUser
                                                                                      )?.Avatar
                                                                                  }`
                                                                                : '/static/images/user.png'
                                                                        }
                                                                        sx={{
                                                                            width: '15px',
                                                                            height: '15px',
                                                                        }}
                                                                        key={`item-chat-${key2}-avatar`}
                                                                    />
                                                                </Tooltip>
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            message_time.getTime() <
                                                            read_time.getTime()
                                                        ) {
                                                            return (
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={
                                                                        getUserData(
                                                                            value.UserId,
                                                                            listUser
                                                                        )?.Avatar
                                                                            ? `${BACKEND_DOMAIN_ERP}${
                                                                                  getUserData(
                                                                                      value.UserId,
                                                                                      listUser
                                                                                  )?.Avatar
                                                                              }`
                                                                            : '/static/images/user.png'
                                                                    }
                                                                    key={`item-chat-${key2}-avatar`}
                                                                    sx={{
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    return <Stack key={key2}></Stack>;
                                                }
                                            })}
                                        </Stack>
                                    )}
                                </Stack>
                            );
                        } else {
                            return (
                                <Stack key={key} id={`message-${mess.ID}`}>
                                    <Message
                                        key={key}
                                        userName={
                                            mess?.UserCreate === profile?.ID ? 'Bạn' : mess.Name
                                        }
                                        mess={mess}
                                        isOnline={checkOnline(
                                            listUserRead,
                                            socketOnline,
                                            listMess[listMess.length - 1]?.UserCreate
                                        )}
                                        setMessReply={setMessReply}
                                        isSeen={checkSeenChat(listUserRead, profile?.ID, listMess)}
                                        isMeLastChat={
                                            listMess[listMess.length - 1].UserCreate == profile?.ID
                                        }
                                        isLastChat={key == listMess.length - 1}
                                        totalHuman={listUser.length}
                                        handleOpenDialogShareMessage={() => {
                                            setOpenShare(true);
                                            setMessShare(mess);
                                        }}
                                    />
                                    {isGroup && (
                                        <Stack
                                            sx={{ ml: 'auto' }}
                                            key={`item-chat-${key}-box-avatar`}
                                            direction="row"
                                            spacing={'2px'}
                                        >
                                            {listUserRead.map((value: any, key2: any) => {
                                                if (value.UserId !== profile?.ID) {
                                                    const read_time = new Date(value.UpdatedAt);
                                                    const message_time = new Date(
                                                        listMess[key].CreatedAt
                                                    );
                                                    if (listMess[key + 1]) {
                                                        const message_next = new Date(
                                                            listMess[key + 1].CreatedAt
                                                        );
                                                        if (
                                                            message_time.getTime() <
                                                                read_time.getTime() &&
                                                            message_next.getTime() >
                                                                read_time.getTime()
                                                        ) {
                                                            return (
                                                                <Tooltip
                                                                    title={
                                                                        getUserData(
                                                                            value.UserId,
                                                                            listUser
                                                                        )?.Name
                                                                    }
                                                                    key={`avatar-member-chat-${key2}`}
                                                                >
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src={
                                                                            getUserData(
                                                                                value.UserId,
                                                                                listUser
                                                                            )?.Avatar
                                                                                ? `${BACKEND_DOMAIN_ERP}${
                                                                                      getUserData(
                                                                                          value.UserId,
                                                                                          listUser
                                                                                      )?.Avatar
                                                                                  }`
                                                                                : '/static/images/user.png'
                                                                        }
                                                                        sx={{
                                                                            width: '15px',
                                                                            height: '15px',
                                                                        }}
                                                                        key={`item-chat-${key2}-avatar`}
                                                                    />
                                                                </Tooltip>
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            message_time.getTime() <
                                                            read_time.getTime()
                                                        ) {
                                                            return (
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={
                                                                        getUserData(
                                                                            value.UserId,
                                                                            listUser
                                                                        )?.Avatar
                                                                            ? `${BACKEND_DOMAIN_ERP}${
                                                                                  getUserData(
                                                                                      value.UserId,
                                                                                      listUser
                                                                                  )?.Avatar
                                                                              }`
                                                                            : '/static/images/user.png'
                                                                    }
                                                                    key={`item-chat-${key2}-avatar`}
                                                                    sx={{
                                                                        width: '15px',
                                                                        height: '15px',
                                                                    }}
                                                                />
                                                            );
                                                        }
                                                    }
                                                } else {
                                                    return <Stack key={key2}></Stack>;
                                                }
                                            })}
                                        </Stack>
                                    )}
                                </Stack>
                            );
                        }
                    })}
                </Stack>
            </Stack>
            {isScroll && (
                <Stack
                    sx={{
                        color: '#808080',
                        borderRadius: '20px',
                        width: '30px',
                        height: '30px',
                        bgcolor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40,
                        right: 40,
                        display: 'flex',
                        cursor: 'pointer',
                    }}
                    onClick={async () => {
                        if (indexChat && pageMin > 0) {
                            if (!inforUser?.ChatRoom?.ID) return;
                            setOpenLoading(true);
                            const payload: PayLoadMess = {
                                roomId: inforUser?.ChatRoom?.ID,
                                page: '1',
                                limit: '20',
                            };
                            setIsScrollDown(false);
                            setPageMax(1);
                            const { data } = await homeApi.getListMessChat(payload);
                            setListMess(data?.data);
                            setOpenLoading(false);
                            setIndexChat({ ID: '', Text: '' });
                        } else {
                            boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
                            setIsScroll(false);
                        }
                    }}
                >
                    <ArrowDownwardIcon />
                </Stack>
            )}
            <CircleLoading open={openLoading} />
        </Stack>
    );
}
