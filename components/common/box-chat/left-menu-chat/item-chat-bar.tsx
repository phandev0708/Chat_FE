import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Avatar, Badge, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import MyAvatarGroup from '../avatar/my-avatar-group';
import AvatarChat, { Status } from '../avatar/avatar_chat';
import { useContext, useEffect, useState } from 'react';
import StreamIcon from '@mui/icons-material/Stream';
import GroupsIcon from '@mui/icons-material/Groups';

export interface IItemChatBarProps {
    idRoom: string;
    title: string;
    idMe: string;
    status: Status;
    avatar?: string;
    lastMessage?: string;
    time?: string | undefined | null;
    unread?: number;
    isGroup?: boolean;
    members?: string[];
    isBlocked?: boolean;
    idUser?: string;
}

export default function ItemChatBar(props: IItemChatBarProps) {
    const {
        idRoom,
        title,
        status,
        avatar,
        lastMessage,
        time,
        unread,
        isGroup,
        isBlocked,
        idUser,
        idMe,
    } = props;
    const socket = useSelector((state: any) => {
        return state.onlineOffline;
    });
    const [unreadNumber, setUnreadNumber] = useState(unread || 0);
    const newMess = useSelector((state: any) => {
        return state.newChat;
    });
    const readChat = useSelector((state: any) => {
        return state.readMessage;
    });
    // console.log('readChat', readChat);
    // console.log('socket ghght', socket);
    useEffect(() => {
        if (unread) {
            setUnreadNumber(unread);
        }
    }, [unread]);
    useEffect(() => {
        if (newMess?.ID && newMess.RoomId === idRoom && newMess?.UserCreate !== idMe) {
            setUnreadNumber((pre) => pre + 1);
        }
    }, [idRoom, newMess]);
    useEffect(() => {
        if (
            readChat?.ChatRoom?.ID &&
            readChat?.ChatRoom?.ID === idRoom &&
            readChat.UserInfo?.ID == idMe
        ) {
            setUnreadNumber(0);
        }
    }, [idRoom, readChat]);
    return (
        <>
            <ListItemButton sx={{ columnGap: 1 }}>
                {isGroup ? (
                    avatar ? (
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <IconButton
                                    sx={{
                                        background: '#fff',
                                        ':hover': {
                                            background: '#fff',
                                        },
                                        width: 20,
                                        height: 20,
                                        mt: '-9px',
                                        border: '1px solid #fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <StreamIcon
                                        sx={{
                                            color: '#067DC0',
                                            width: 15,
                                            height: 15,
                                            webkitAnimation: 'rotating 5s linear infinite',
                                            MozAnimation: 'rotating 5s linear infinite',
                                            animation: 'rotating 5s linear infinite',
                                        }}
                                    />
                                </IconButton>
                            }
                        >
                            <Avatar src={avatar} sx={{ border: '2px solid #56595D' }} />
                        </Badge>
                    ) : (
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <IconButton
                                    sx={{
                                        background: '#fff',
                                        ':hover': {
                                            background: '#fff',
                                        },
                                        width: 20,
                                        height: 20,
                                        mt: '-9px',
                                        border: '1px solid #fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <StreamIcon
                                        sx={{
                                            color: '#067DC0',
                                            width: 15,
                                            height: 15,
                                            webkitAnimation: 'rotating 5s linear infinite',
                                            MozAnimation: 'rotating 5s linear infinite',
                                            animation: 'rotating 5s linear infinite',
                                        }}
                                    />
                                </IconButton>
                            }
                        >
                            <IconButton
                                sx={{
                                    background: '#C4CDD5',
                                    ':hover': {
                                        background: '#C4CDD5',
                                    },
                                    border: '2px solid #56595D',
                                }}
                            >
                                <GroupsIcon sx={{ color: '#fff' }} />
                            </IconButton>
                        </Badge>
                    )
                ) : (
                    <AvatarChat
                        status={
                            idUser && socket.ID && socket.ID === idUser ? socket.online : status
                        }
                        avatar={avatar}
                    ></AvatarChat>
                )}
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                >
                    <Stack justifyContent={'space-between'}>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography color={'#e1e9f1'}>{title}</Typography>
                        </Stack>
                        <Stack>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color={unreadNumber > 0 ? '#fff' : '#abb4d2'}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                width="175px"
                            >
                                {lastMessage}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
                            {isBlocked && (
                                <NotificationsOffIcon sx={{ fontSize: '16px', color: '#abb4d2' }} />
                            )}
                            <Typography
                                variant="caption"
                                lineHeight={1}
                                color={unreadNumber > 0 ? '#fff' : '#abb4d2'}
                            >
                                {time}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'end'}
                            sx={{ pt: 1 }}
                        >
                            {unreadNumber != undefined && unreadNumber > 0 && (
                                <Avatar
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        fontSize: '10px',
                                        background: 'rgba(195, 24, 24)',
                                        fontWeight: 700,
                                    }}
                                >
                                    {unreadNumber > 9 ? '9+' : unreadNumber}
                                </Avatar>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </ListItemButton>
        </>
    );
}
