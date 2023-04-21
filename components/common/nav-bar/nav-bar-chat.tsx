import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudIcon from '@mui/icons-material/Cloud';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ListIcon from '@mui/icons-material/List';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { profile } from '@/models/profile';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import Image from 'next/image';
export interface INavBarChatProps {
    profile: profile;
}

export default function NavBarChat(props: INavBarChatProps) {
    const router = useRouter();
    const [menuItem, setmenuItem] = useState<'contact' | 'chat' | 'notify' | 'setting' | 'ai'>(
        'chat'
    );
    const countNotify = useSelector((state: any) => {
        return state.countNotify;
    });
    const [countMessUnread, setCountMessUnread] = useState(0);
    const newMess = useSelector((state: any) => {
        return state.newChat;
    });
    useEffect(() => {
        if (newMess?.ID && newMess?.UserCreate !== props.profile?.ID) {
            setCountMessUnread((pre) => pre + 1);
        }
    }, [newMess]);
    useEffect(() => {
        setCountMessUnread(countNotify);
    }, [countNotify]);
    return (
        <Stack
            justifyContent={'space-between'}
            flex={1}
            sx={{ backgroundColor: '#262626' }}
            minWidth={80}
        >
            <Stack alignItems={'center'} py={2} gap={4}>
                <Avatar
                    alt="O Chat"
                    src={
                        props.profile?.Avatar
                            ? BACKEND_DOMAIN_ERP + props.profile?.Avatar
                            : 'https://themesbrand.com/chatvia/layouts/assets/images/logo.svg'
                    }
                />

                <Stack gap={2}>
                    <Stack sx={{ position: 'relative', alignItems: 'flex-end' }}>
                        <IconButton
                            size={'large'}
                            color="primary"
                            sx={{
                                backgroundColor: menuItem === 'chat' ? '#3e4a56' : 'transparent',
                            }}
                            onClick={() => {
                                setmenuItem('chat');
                                router.push('/');
                            }}
                        >
                            <ChatIcon />
                        </IconButton>
                        {countMessUnread > 0 && (
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    borderRadius: '10px',
                                    bgcolor: 'rgba(195, 24, 24)',
                                    width: '20px',
                                    height: '20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}
                                >
                                    {countMessUnread < 9 ? countMessUnread : '9+'}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                    <Tooltip title={'Oryza AI Chat'}>
                        <IconButton
                            size={'medium'}
                            color="primary"
                            sx={{
                                backgroundColor: menuItem === 'ai' ? '#3e4a56' : 'transparent',
                            }}
                            onClick={() => {
                                setmenuItem('ai');
                                router.push('/ai');
                            }}
                        >
                            <Stack
                                sx={{
                                    borderRadius: '50px',
                                    overflow: 'hidden',
                                    width: 35,
                                    height: 35,
                                }}
                            >
                                <Image
                                    src={'/gif/ai.gif'}
                                    alt={''}
                                    width={35}
                                    height={35}
                                    style={{ borderRadius: '50%' }}
                                />
                            </Stack>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Danh Bạ'}>
                        <IconButton
                            size={'large'}
                            color="primary"
                            sx={{
                                backgroundColor: menuItem === 'contact' ? '#3e4a56' : 'transparent',
                                width: 51,
                                height: 51,
                            }}
                            onClick={() => {
                                setmenuItem('contact');
                                router.push('/contact');
                            }}
                        >
                            <ListIcon />
                        </IconButton>
                    </Tooltip>
                    <Stack sx={{ position: 'relative', alignItems: 'flex-end' }}>
                        <IconButton size={'large'} color="primary" sx={{ width: 51, height: 51 }}>
                            <NotificationsNoneIcon />
                        </IconButton>
                        {/* {countNotify > 0 && (
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    borderRadius: '10px',
                                    bgcolor: 'rgba(223, 46, 56, 0.7)',
                                    width: '20px',
                                    height: '20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}
                                >
                                    {countNotify < 9 ? countNotify : '9+'}
                                </Typography>
                            </Stack>
                        )} */}
                    </Stack>
                </Stack>
            </Stack>

            <Stack alignItems={'center'} py={2} gap={2}>
                <IconButton size={'large'} color="primary">
                    <CloudIcon />
                </IconButton>
                <IconButton size={'large'} color="primary">
                    <Brightness7Icon />
                </IconButton>
                <IconButton size={'large'} color="primary">
                    <SettingsIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}
