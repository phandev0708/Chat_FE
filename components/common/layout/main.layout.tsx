import { useAuth } from '@/hooks/auth-hook';
import { LayoutProps } from '@/models/common';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { AuthUser } from '../auth';
import NavBarChat from '../nav-bar/nav-bar-chat';
export interface MainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
    // get user
    const { profile, firstLoading } = useAuth();

    const convertProfileType: any = profile;
    const dataProfile = convertProfileType?.data || {};

    const [leftDrawerOpened, setLeftDrawerOpened] = useState(false);
    const handleLeftDrawerToggle = () => {
        setLeftDrawerOpened(!leftDrawerOpened);
    };

    return (
        <AuthUser>
            <Stack
                sx={{
                    height: '100vh',
                    width: '100vw',
                    position: 'relative',
                }}
            >
                <Stack
                    style={{
                        background: '#fff',
                        height: '100vh',
                    }}
                    flexDirection="row"
                >
                    <Stack
                        style={{
                            width: '80px',
                            minHeight: '100vh',
                        }}
                        flexShrink={0}
                    >
                        <NavBarChat profile={profile?.data}></NavBarChat>
                    </Stack>
                    <Stack flex={1}>{children}</Stack>
                </Stack>
            </Stack>
        </AuthUser>
    );
}
