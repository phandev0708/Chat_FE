import CallIcon from '@mui/icons-material/Call';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import VideocamIcon from '@mui/icons-material/Videocam';
import { AvatarGroup, Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';
import AvatarChat, { Status } from '../avatar/avatar_chat';
import SearchIcon from '@mui/icons-material/Search';
import DialogSearchInchat from '../../dialog/dialog-search-inchat';
import { useEffect, useState } from 'react';
import { chatApi } from '@/api/chat-api';
export interface IHeaderBoxChatProps {
    idRoom: string;
    title: string;
    avatar: string;
    setOpen: () => void;
    status: Status;
    open: boolean;
    setListMess: any;
    setPageMax: any;
    pageMax: number;
    setPageMin: any;
    pageMin: number;
    setIndex: any;
    setOpenLoading: any;
}

export default function HeaderBoxChat({
    avatar,
    setOpen,
    title,
    status,
    open,
    idRoom,
    setListMess,
    setPageMax,
    pageMax,
    setPageMin,
    pageMin,
    setIndex,
    setOpenLoading,
}: IHeaderBoxChatProps) {
    const [openSearch, setOpenSearch] = useState(false);
    return (
        <Stack sx={{ padding: '0 20px', backgroundColor: '#262626', py: 1 }}>
            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <Box>
                        <AvatarGroup total={1}>
                            <AvatarChat
                                status={status.toString() as Status}
                                avatar={avatar}
                            ></AvatarChat>
                        </AvatarGroup>
                    </Box>
                    <Stack>
                        <Typography variant="h6" color={'#e1e9f1'}>
                            {title}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction={'row'} gap={2}>
                    <IconButton
                        onClick={() => {
                            setOpenSearch(true);
                        }}
                    >
                        <SearchIcon sx={{ color: '#e1e9f1' }} />
                    </IconButton>
                    <IconButton>
                        <CallIcon sx={{ color: '#e1e9f1' }}></CallIcon>
                    </IconButton>
                    <IconButton>
                        <VideocamIcon sx={{ color: '#e1e9f1' }}></VideocamIcon>
                    </IconButton>
                    <IconButton onClick={setOpen}>
                        {open ? (
                            <MenuOpenIcon sx={{ color: '#e1e9f1' }}></MenuOpenIcon>
                        ) : (
                            <MenuIcon sx={{ color: '#e1e9f1' }}></MenuIcon>
                        )}
                    </IconButton>
                </Stack>
                <DialogSearchInchat
                    open={openSearch}
                    onClose={() => {
                        setOpenSearch(false);
                    }}
                    idRoom={idRoom}
                    setListMess={setListMess}
                    setPageMax={setPageMax}
                    pageMax={pageMax}
                    setPageMin={setPageMin}
                    pageMin={pageMin}
                    setIndex={setIndex}
                    setOpenLoading={setOpenLoading}
                ></DialogSearchInchat>
            </Stack>
        </Stack>
    );
}
