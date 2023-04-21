import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Avatar, List, ListItemButton, Stack, Typography } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import MyAvatarGroup from '../avatar/my-avatar-group';
import AvatarChat, { Status } from '../avatar/avatar_chat';
import { useContext, useEffect, useState } from 'react';
import { GroupChat } from '@/models/user-infor';
import ItemChatBar from './item-chat-bar';
import { getCurrentHouse } from '@/ultis/format-time';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface ITabPanelItemProps {
    dataGroup: GroupChat[];
    profile: any;
    setInforUser: any;
}

export default function TabPanelItem(props: ITabPanelItemProps) {
    const { dataGroup, profile, setInforUser } = props;
    return dataGroup.length > 0 ? (
        <Stack
            sx={{
                width: '100%',
                bgcolor: '#393939',
                overflow: 'auto',
                maxHeight: 'calc(100vh - 150px)',
            }}
        >
            {dataGroup &&
                dataGroup?.map((item: GroupChat) => {
                    if (item?.LastChat?.CreatedAt) {
                        const online = item.IsOnline ? Status.online : Status.offline;
                        const filterUser = (data: string) => {
                            if (data) {
                                const result = JSON.parse(data);
                                console.log('result', result);
                                if (result.length > 0) {
                                    if (result.length > 3) {
                                        return `${result[0].Name}, ${result[1].Name} và ${
                                            result.length - 2
                                        } người khác`;
                                    } else {
                                        return result.length == 3
                                            ? `${result[0].Name}, ${result[1].Name} và ${result[2].Name}`
                                            : result.length == 2
                                            ? `${result[0].Name} và ${result[1].Name}`
                                            : `${result[0].Name}`;
                                    }
                                } else {
                                    return 'ai đó vào nhóm!';
                                }
                            }
                            return null;
                        };

                        const dataParse =
                            item.LastChat?.Type == 'json'
                                ? filterUser(
                                      item.LastChat?.ListUserJSON ? item.LastChat?.ListUserJSON : ''
                                  )
                                : [];
                        let lastMessage = item.LastChat?.IsSystem
                            ? item.LastChat?.Type == 'json'
                                ? item?.LastChat?.UserCreate === profile?.ID
                                    ? `${item.LastChat?.Text} ${dataParse}`
                                    : `${item?.LastChat?.Name} ${item.LastChat?.Text} ${dataParse}`
                                : item?.LastChat?.UserCreate === profile?.ID
                                ? `${item.LastChat?.Text}`
                                : `${item?.LastChat?.Name} ${item.LastChat?.Text}`
                            : item.LastChat?.Type == 'VOTE'
                            ? item.LastChat?.UserCreate == profile?.ID
                                ? `đã tạo cuộc bình chọn`
                                : `${item?.LastChat?.Name} đã tạo cuộc bình chọn`
                            : item.LastChat?.Text;

                        if (item.LastChat?.Type == 'file') {
                            if (item.LastChat?.UserCreate == profile?.ID) {
                                lastMessage = 'đã gửi file';
                            } else {
                                lastMessage = `${item?.LastChat?.Name} đã gửi file`;
                            }
                        }

                        //Thêm phân biệt ai chat
                        if (item.LastChat?.UserCreate == profile?.ID) {
                            lastMessage = 'Bạn: ' + lastMessage;
                        }

                        //check tin nhắn bị thu hổi
                        if (item.LastChat?.DeleteAt) {
                            if (item.LastChat?.UserCreate == profile?.ID) {
                                lastMessage = 'Bạn: đã thu hồi một tin nhắn';
                            } else {
                                lastMessage = 'Tin nhắn đã bị xóa';
                            }
                        }

                        // item.IsOnline = Status.online;
                        // console.log(index, item);
                        return (
                            <Stack
                                onClick={() => {
                                    const newItem = { ...item, IsOnline: online };
                                    // console.log(newItem, 'new');

                                    setInforUser(newItem);
                                }}
                                key={item.ChatRoom?.ID}
                            >
                                <ItemChatBar
                                    idRoom={item?.ChatRoom?.ID}
                                    idUser={item?.UserChat?.ID}
                                    title={
                                        item.ChatRoom?.IsGroup
                                            ? item.ChatRoom?.RoomName
                                            : item.UserChat?.Name
                                    }
                                    isGroup={item?.ChatRoom?.IsGroup || false}
                                    status={online}
                                    lastMessage={lastMessage}
                                    unread={item.MessUnread}
                                    time={getCurrentHouse(item?.LastChat?.CreatedAt + '') + ''}
                                    isBlocked={false}
                                    avatar={
                                        item.ChatRoom?.IsGroup
                                            ? item.ChatRoom?.RoomImage
                                                ? BACKEND_DOMAIN + item.ChatRoom?.RoomImage
                                                : ''
                                            : item.UserChat?.Avatar
                                            ? BACKEND_DOMAIN_ERP + item.UserChat?.Avatar
                                            : ''
                                    }
                                    idMe={profile?.ID}
                                ></ItemChatBar>
                            </Stack>
                        );
                    }
                })}
        </Stack>
    ) : (
        <></>
    );
}
