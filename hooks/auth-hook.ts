import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { authApi } from '../api-client';
import { LoginPayload } from '../models';

const HOURSE_TO_MILISECOND = 0;

export function useAuth(options?: Partial<AudioConfiguration>) {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR('/user/profile', {
        dedupingInterval: HOURSE_TO_MILISECOND,
        revalidateOnFocus: true,
        ...options,
    });

    async function login(loginData: LoginPayload) {
        await authApi.login(loginData);

        await mutate();
    }
    async function logout() {
        await authApi.logout();

        mutate({}, false);
    }
    const firstLoading = profile === undefined && error === undefined;

    return {
        profile,
        error,
        firstLoading,
        login,
        logout,
    };
}
