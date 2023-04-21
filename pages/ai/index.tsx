import { MainLayout } from '@/components/common/layout';
import { SeoPage } from '@/components/common/seo';
import { ChatAI } from '@/components/index';
import { Stack } from '@mui/material';
import React from 'react';

export interface IAIPagesProps {}

export default function AIPages(props: IAIPagesProps) {
    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <SeoPage title={'Oryza AI Chat'} />
            <ChatAI />
        </Stack>
    );
}
AIPages.Layout = MainLayout;
