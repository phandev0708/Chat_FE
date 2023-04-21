import { GroupChatInit } from '@/mocks/group-chat';
import { GroupChat } from '@/models/user-infor';
import { Box, Drawer, Stack } from '@mui/material';
import BoxChat from '../body-chat/Box-chat';
import ChatBar from '../left-menu-chat/chat-bar';
import ChatInfor from '../drawer/chat-infor';
import { createContext, useContext, useEffect, useState } from 'react';
import { ConversationsContext, ExampleContext, UserRoleContext } from 'pages';
import { homeApi } from '@/api/home-api';
import { UserChat } from '@/models/user-model';
import { useSelector } from 'react-redux';
import { UpdateRoomManagerGroup } from '@/redux/index';
import { profile } from '@/models/profile';
import { profileMock } from '@/mocks/profile-mock';
import { IntroChat } from '../../intro';
import { ChatAI } from '../../chat-ai';

export interface IMainChatProps {}
const drawerWidth = 350;

export default function MainChat(props: IMainChatProps) {
    const [inforUser, setInforUser] = useState<GroupChat>(GroupChatInit);
    const [listUser, setListUser] = useState<UserChat[]>([]);
    const [listUserChat, setListUserChat] = useState<GroupChat[]>([]);

    const { profile } = useContext(ExampleContext);
    const [listUserRead, setListUserRead] = useState<profile[]>([]);
    const [userRole, setUserRole] = useState<profile>();
    const addMem = useSelector((state: any) => {
        return state.addMember;
    });
    const updateRoleUser = useSelector((state: any) => {
        return state.updateRoleUser;
    });
    const removeUser = useSelector((state: any) => {
        return state.newRemoveMember;
    });
    const [open, setOpen] = useState(false);

    const updateInfo = useSelector((state: any) => {
        return state.updateInfoRoom;
    });
    const updateRoomManagerGroup: UpdateRoomManagerGroup = useSelector((state: any) => {
        return state.updateRoomManagerGroup;
    });
    useEffect(() => {
        if (inforUser.ChatRoom?.ID == updateInfo?.RoomId) {
            const chatRoom = {
                ...inforUser.ChatRoom,
                RoomImage: updateInfo.RoomImage
                    ? updateInfo.RoomImage
                    : inforUser.ChatRoom?.RoomImage,
                RoomName: updateInfo.RoomName ? updateInfo.RoomName : inforUser.ChatRoom?.RoomName,
            };
            setInforUser({ ...inforUser, ChatRoom: chatRoom });
        }
    }, [updateInfo]);
    useEffect(() => {
        if (inforUser.ChatRoom?.ID == updateRoomManagerGroup.RoomId) {
            const chatRoom = {
                ...inforUser.ChatRoom,
                IsInvite: updateRoomManagerGroup.IsInvite,
                IsOnlyAdminChat: updateRoomManagerGroup.IsOnlyAdminChat,
                IsOnlyAdminInvite: updateRoomManagerGroup.IsInvite,
            };
            setInforUser({ ...inforUser, ChatRoom: chatRoom });
        }
    }, [updateRoomManagerGroup]);
    useEffect(() => {
        (async () => {
            const idCompany = profile?.CompanyId?.ID;
            if (idCompany) {
                const { data } = await homeApi.getAllUser(idCompany);
                setListUser(data);
            }
        })();
    }, [profile?.CompanyId?.ID, profile?.ID]);
    useEffect(() => {
        (async () => {
            if (!inforUser?.ChatRoom?.ID) return;
            const { data } = await homeApi.getAllUserInGroupChat(inforUser?.ChatRoom?.ID);
            setListUserRead(data);
        })();
    }, [inforUser?.ChatRoom?.ID]);

    useEffect(() => {
        if (addMem.length > 0) {
            setListUserRead((pre) => pre.concat(addMem));
        }
    }, [addMem]);

    useEffect(() => {
        if (listUserRead.length > 0 && inforUser?.ChatRoom.ID == removeUser.RoomId) {
            const index = listUserRead.findIndex((item) => item.ID == removeUser?.UserRemove);
            if (index !== -1) {
                listUserRead.splice(index, 1);
            }
            setListUserRead(listUserRead);
        }
    }, [removeUser]);
    useEffect(() => {
        if (listUserRead.length > 0 && inforUser?.ChatRoom.ID == updateRoleUser.RoomId) {
            let dataResult: profile[] = [];
            listUserRead.map((res) => {
                if (res.ID == updateRoleUser.UserRole) {
                    dataResult.push({ ...res, IsAdminGroup: updateRoleUser.IsAdmin });
                } else {
                    dataResult.push(res);
                }
            });
            setListUserRead(dataResult);
        }
    }, [updateRoleUser]);
    useEffect(() => {
        if (listUserRead.length > 0) {
            const index = listUserRead.findIndex((item) => item.ID == profile?.ID);
            if (index !== -1) {
                setUserRole(listUserRead[index]);
            }
        }
    }, [listUserRead]);

    const [openAIChat, setOpenAIChat] = useState(false);

    return (
        <Stack direction="row" flex={1} sx={{ background: '#1e1e1e' }}>
            <ConversationsContext.Provider
                value={{ conversations: listUserChat, setConversations: setListUserChat }}
            >
                <UserRoleContext.Provider
                    value={{ profileUserInGroup: userRole ? userRole : profileMock }}
                >
                    <ChatBar setInforUser={setInforUser}></ChatBar>

                    {/* {!open && openAIChat ? <ChatAI /> : <IntroChat />} */}
                    <BoxChat
                        inforUser={inforUser}
                        open={open}
                        setOpen={setOpen}
                        listUser={listUser}
                        listUserRead={listUserRead}
                    ></BoxChat>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            zIndex: open ? 0 : -1,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                            },
                            // display: open ? 'flex' : 'none',
                        }}
                        variant="persistent"
                        anchor="right"
                        open={open}
                    >
                        <ChatInfor
                            inforUser={inforUser}
                            listUserRead={listUserRead}
                            setInforUser={setInforUser}
                            setOpen={setOpen}
                            profile={profile}
                        ></ChatInfor>
                    </Drawer>
                </UserRoleContext.Provider>
            </ConversationsContext.Provider>
        </Stack>
    );
}
