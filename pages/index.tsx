import MainChat from '@/components/common/box-chat/main/main-chat';
import { MainLayout } from '@/components/common/layout';
import NavBarChat from '@/components/common/nav-bar/nav-bar-chat';
import { useAuth } from '@/hooks/auth-hook';
import { profileMock, conversationsMock } from '@/mocks/profile-mock';
import { Stack } from '@mui/material';
import { createContext } from 'react';

export const ExampleContext = createContext({ profile: profileMock });
export const UserRoleContext = createContext({ profileUserInGroup: profileMock });
export const ConversationsContext = createContext({
    conversations: conversationsMock,
    setConversations: (data: any) => {},
});

export interface HomeOAccountProps {}
export default function Home(props: HomeOAccountProps) {
    const { profile } = useAuth();
    return (
        <ExampleContext.Provider value={{ profile: profile?.data }}>
            <MainChat></MainChat>
        </ExampleContext.Provider>
    );
}
Home.Layout = MainLayout;
