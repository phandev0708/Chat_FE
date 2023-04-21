import { MainLayout } from '@/components/common/layout';
import MainPhonebook from '@/components/contact/layout-contact/main-phonebook';
import { useAuth } from '@/hooks/auth-hook';
import { profileMock } from '@/mocks/profile-mock';
import { Stack } from '@mui/material';
import { createContext } from 'react';
export interface IPhonebookProps {}
export const AuthContext = createContext({ profile: profileMock });

export default function Phonebook(props: IPhonebookProps) {
    const { profile } = useAuth();

    return (
        <>
            <AuthContext.Provider value={{ profile: profile?.data }}>
                <Stack direction={'row'}>
                    <MainPhonebook></MainPhonebook>
                </Stack>
            </AuthContext.Provider>
        </>
    );
}
Phonebook.Layout = MainLayout;
