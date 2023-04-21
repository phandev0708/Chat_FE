import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from '@/ultis/theme';
import { createContext, useMemo, useState } from 'react';
import { PaletteMode } from '@mui/material';
import { getDesignTokens } from '@/ultis/palette_mode';
import SocketCustom from '@/components/common/socket/socket-custome';
import { SWRConfig } from 'swr';
import axiosClient from '@/api/axios-client';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { SnackbarProvider } from 'notistack';
import { AppPropsWithLayout } from '@/models/common';
import { EmptyLayout } from '@/components/common/layout';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SWRConfig
                    value={{
                        fetcher: (url) => axiosClient.get(url),
                        shouldRetryOnError: false,
                    }}
                >
                    <SnackbarProvider>
                        <SocketCustom>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SocketCustom>
                    </SnackbarProvider>
                </SWRConfig>
            </ThemeProvider>
        </Provider>
    );
}
