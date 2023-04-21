import { homeApi } from '@/api/home-api';
import { GroupChat } from '@/models/user-infor';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { getCurrentHouse } from '@/ultis/format-time';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, List, Stack, Tab, Tabs, Typography } from '@mui/material';
import { ConversationsContext, ExampleContext } from 'pages';

import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogCreateGroup from '../create-room/dialog-create-group';
import { Status } from '../avatar/avatar_chat';
import useDebounce from '@/hooks/useDebounce';
import { removeAccents } from '@/ultis/index';
import { useRouter } from 'next/router';
import { PayLoadCreateSingle, PayLoadMess } from '@/models/index';
import { messageApi } from '@/api/message-api';
import TabPanelItem from './tabpanel-item';
import TabPanelCustom from './tabpanel-custom';
import { enqueueSnackbar } from 'notistack';

export interface IChatBarProps {
    setInforUser: any;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function ChatBar({ setInforUser }: IChatBarProps) {
    const [valueParent, setvalueParent] = useState(0);
    const [dataSearch, setDataSearch] = useState<string>('');
    const [listUserSearch, setListUserSearch] = useState<any[]>([]);

    const dataDebonce = useDebounce(dataSearch, 200);

    const [value, setValue] = useState(0);
    // const [conversations, setConversations] = useState<GroupChat[]>([]);
    const { conversations, setConversations } = useContext(ConversationsContext);
    const [listRoomUnread, setListRoomUnread] = useState<GroupChat[]>([]);

    const { profile } = useContext(ExampleContext);
    const newMess = useSelector((state: any) => {
        return state.newChat;
    });
    const addRoom: GroupChat = useSelector((state: any) => {
        return state.addRoom;
    });
    const removeRoom = useSelector((state: any) => {
        return state.deleteRoomChat;
    });
    const newDeleteMessage = useSelector((state: any) => {
        return state.deleteMessage;
    });

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const router = useRouter();
    const { idInvite } = router.query;
    const readChat = useSelector((state: any) => {
        return state.readMessage;
    });
    const updateInfo = useSelector((state: any) => {
        return state.updateInfoRoom;
    });
    useEffect(() => {
        if (
            readChat?.ChatRoom?.ID &&
            listRoomUnread.length > 0 &&
            readChat.UserInfo?.ID == profile?.ID
        ) {
            const index = listRoomUnread.findIndex(
                (item) => item.ChatRoom?.ID == readChat?.ChatRoom?.ID
            );
            if (index !== -1) {
                listRoomUnread.splice(index, 1);
            }
            setListRoomUnread(listRoomUnread.length == 0 ? [] : listRoomUnread);
        }
    }, [readChat]);
    useEffect(() => {
        if (!idInvite) {
            return;
        }
        const rID = idInvite as string;
        const payload: PayLoadCreateSingle = {
            UserInvite: rID,
            UserCreate: profile?.ID,
        };
        (async () => {
            const { data } = await messageApi.createSingleChat(payload);
            const value: GroupChat = {
                ChatRoom: {
                    ID: data?.ID,
                    IsGroup: false,
                    RoomImage: data?.RoomImage,
                    RoomName: data?.RoomName,
                },
                IsOnline: data?.UserChat?.IsOnline ? Status.online : Status.offline,
                UserChat: {
                    ID: data?.UserChat?.ID,
                    Avatar: data?.UserChat?.Avatar,
                    Name: data?.UserChat?.Name,
                },
                MessUnread: 0,
            };
            // console.log(value);
            // console.log(data);
            setInforUser(value);
        })();
    }, [idInvite]);
    useEffect(() => {
        (async () => {
            const idCompany = profile?.CompanyId?.ID;
            let dataGroupChat: GroupChat[] = [];
            if (idCompany) {
                const { data } = await homeApi.getAllGroupChat();
                setConversations(data);
                if (data.length > 0) {
                    const roomUnread: GroupChat[] = [];
                    data.map((res: GroupChat) => {
                        if (res.MessUnread > 0) {
                            roomUnread.push(res);
                        }
                    });
                    setListRoomUnread(roomUnread);
                }
                dataGroupChat = data;
            }
        })();
    }, [profile?.ID]);
    useEffect(() => {
        if (newMess?.ID) {
            // console.log(sendMess);
            setConversations((prev: GroupChat[]) => {
                const index = prev.findIndex((item: any) => item.ChatRoom?.ID === newMess?.RoomId);
                if (index !== -1) {
                    const newItem = { ...prev[index], LastChat: newMess };
                    prev.splice(index, 1);
                    prev.unshift(newItem);
                    return [...prev];
                }
                return [...prev];
            });
            if (listRoomUnread.length > 0) {
                const checkRoom = listRoomUnread.filter(
                    (res) => res.ChatRoom?.ID == newMess?.RoomId
                );
                if (checkRoom.length <= 0 && conversations.length > 0) {
                    const checkNewMessInRoom = conversations.filter(
                        (item) => item.ChatRoom?.ID == newMess?.RoomId
                    );
                    if (checkNewMessInRoom.length > 0) {
                        setListRoomUnread((pre) => [...pre, checkNewMessInRoom[0]]);
                    }
                }
            } else {
                if (conversations.length > 0) {
                    const checkNewMessInRoom = conversations.filter(
                        (item) => item.ChatRoom?.ID == newMess?.RoomId
                    );
                    if (checkNewMessInRoom.length > 0) {
                        setListRoomUnread((pre) => [...pre, checkNewMessInRoom[0]]);
                    }
                }
            }
        }
    }, [newMess?.ID]);

    useEffect(() => {
        if (addRoom) {
            //add first item
            setConversations((prev: any) => [addRoom, ...prev]);
        }
    }, [addRoom]);

    useEffect(() => {
        if (conversations.length > 0 && removeRoom.UserRemove == profile?.ID) {
            const dataResult: GroupChat[] = [];
            let roomName = '';
            conversations.map((res) => {
                if (res.ChatRoom?.ID != removeRoom.RoomId) {
                    dataResult.push(res);
                } else {
                    roomName = res?.ChatRoom?.RoomName;
                }
            });
            enqueueSnackbar(`Bạn đã rời khỏi nhóm chat ${roomName}`, { variant: 'warning' });
            setConversations(dataResult);
        }
    }, [removeRoom]);

    useEffect(() => {
        if (newDeleteMessage?.ID) {
            setConversations((prev: any) => {
                const index = prev.findIndex(
                    (item: any) => item.ChatRoom?.ID === newDeleteMessage?.RoomId
                );
                if (index !== -1) {
                    // console.log(newDeleteMessage);
                    const lastChat = {
                        ...prev[index].LastChat,
                        DeleteAt: newDeleteMessage?.DeleteAt,
                    };
                    const newItem: any = { ...prev[index], LastChat: lastChat };
                    prev.splice(index, 1);
                    prev.unshift(newItem);
                    return [...prev];
                }
                return [...prev];
            });
        }
    }, [newDeleteMessage?.ID]);

    useEffect(() => {
        if (dataDebonce.trim().length > 0) {
            let searchDebonce = removeAccents(dataDebonce.toLowerCase().trim());
            const data: any[] = [];
            conversations.forEach((item) => {
                if (
                    (item.ChatRoom?.IsGroup &&
                        removeAccents(item.ChatRoom?.RoomName.toLowerCase().trim()).indexOf(
                            searchDebonce
                        ) !== -1) ||
                    (!item.ChatRoom?.IsGroup &&
                        removeAccents(item.UserChat?.Name.toLowerCase().trim()).indexOf(
                            searchDebonce
                        ) !== -1)
                ) {
                    data.push(item);
                }
            });
            setListUserSearch(data);
        } else {
            setListUserSearch(conversations);
        }
    }, [dataDebonce, conversations]);

    useEffect(() => {
        if (conversations.length > 0) {
            const dataResult: GroupChat[] = [];
            conversations.map((res) => {
                if (res.ChatRoom?.ID == updateInfo.RoomId) {
                    const chatRoom = {
                        ...res.ChatRoom,
                        RoomImage: updateInfo.RoomImage
                            ? updateInfo.RoomImage
                            : res.ChatRoom?.RoomImage,
                        RoomName: updateInfo.RoomName
                            ? updateInfo.RoomName
                            : res.ChatRoom?.RoomName,
                    };
                    dataResult.push({ ...res, ChatRoom: chatRoom });
                } else {
                    dataResult.push(res);
                }
            });
            setConversations(dataResult);
        }
        if (listRoomUnread.length > 0) {
            const dataResult: GroupChat[] = [];
            listRoomUnread.map((res) => {
                if (res.ChatRoom?.ID == updateInfo.RoomId) {
                    const chatRoom = {
                        ...res.ChatRoom,
                        RoomImage: updateInfo.RoomImage
                            ? updateInfo.RoomImage
                            : res.ChatRoom?.RoomImage,
                        RoomName: updateInfo.RoomName
                            ? updateInfo.RoomName
                            : res.ChatRoom?.RoomName,
                    };
                    dataResult.push({ ...res, ChatRoom: chatRoom });
                } else {
                    dataResult.push(res);
                }
            });
            setListRoomUnread(dataResult);
        }
        if (listUserSearch.length > 0) {
            const dataResult: GroupChat[] = [];
            listUserSearch.map((res) => {
                if (res.ChatRoom?.ID == updateInfo.RoomId) {
                    const chatRoom = {
                        ...res.ChatRoom,
                        RoomImage: updateInfo.RoomImage
                            ? updateInfo.RoomImage
                            : res.ChatRoom?.RoomImage,
                        RoomName: updateInfo.RoomName
                            ? updateInfo.RoomName
                            : res.ChatRoom?.RoomName,
                    };
                    dataResult.push({ ...res, ChatRoom: chatRoom });
                } else {
                    dataResult.push(res);
                }
            });
            setListUserSearch(dataResult);
        }
    }, [updateInfo]);

    return (
        <Stack width={'350px'} sx={{ backgroundColor: '#393939' }}>
            {/* <Typography variant={'h5'} color={'#e1e9f1'} px={2} pt={2}>
                Chats
            </Typography> */}
            <Stack
                sx={{ backgroundColor: '#393939' }}
                py={3}
                px={2}
                direction={'row'}
                justifyContent={'space-between'}
            >
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onClick={() => setvalueParent(1)}
                        value={dataSearch}
                        onChange={(e) => setDataSearch(e.target.value)}
                    />
                </Search>
                <Stack direction={'row'} pl={1}>
                    {valueParent === 1 ? (
                        <Button
                            onClick={() => {
                                setDataSearch('');
                                setvalueParent(0);
                            }}
                        >
                            Đóng
                        </Button>
                    ) : (
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            onClick={handleClickOpen}
                        >
                            <GroupAddIcon fontSize="small" />
                        </IconButton>
                    )}
                </Stack>
                <DialogCreateGroup
                    open={open}
                    onCloseModal={() => handleClose()}
                ></DialogCreateGroup>
            </Stack>

            <TabPanelCustom value={valueParent} index={0}>
                <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                            '& .MuiButtonBase-root': {
                                fontSize: '12px',
                            },
                        }}
                    >
                        <Tab label="Tất cả" {...a11yProps(0)} />
                        <Tab label="chưa đọc" {...a11yProps(1)} />
                        <Tab label="Nhóm" {...a11yProps(2)} />
                        <Tab label="Cá Nhân" {...a11yProps(3)} />
                    </Tabs>
                </Stack>
                <TabPanelCustom value={value} index={0}>
                    <TabPanelItem
                        dataGroup={conversations}
                        profile={profile}
                        setInforUser={setInforUser}
                    />
                </TabPanelCustom>
                <TabPanelCustom value={value} index={1}>
                    <TabPanelItem
                        dataGroup={listRoomUnread}
                        profile={profile}
                        setInforUser={setInforUser}
                    />
                </TabPanelCustom>
                <TabPanelCustom value={value} index={2}>
                    <TabPanelItem
                        dataGroup={conversations.filter((x) => x.ChatRoom.IsGroup == true)}
                        profile={profile}
                        setInforUser={setInforUser}
                    />
                </TabPanelCustom>
                <TabPanelCustom value={value} index={3}>
                    <TabPanelItem
                        dataGroup={conversations.filter((x) => x.ChatRoom.IsGroup == false)}
                        profile={profile}
                        setInforUser={setInforUser}
                    />
                </TabPanelCustom>
            </TabPanelCustom>
            <TabPanelCustom value={valueParent} index={1}>
                <Box px={2} mt={2} mb={2}>
                    <Typography variant="body2" color={'primary'} component={'h4'}>
                        Tìm kiếm gần đây
                    </Typography>
                </Box>
                <TabPanelItem
                    dataGroup={listUserSearch}
                    profile={profile}
                    setInforUser={setInforUser}
                />
            </TabPanelCustom>
        </Stack>
    );
}
