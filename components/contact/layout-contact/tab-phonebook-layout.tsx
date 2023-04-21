import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';

export interface ITabPhonebookLayoutProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function TabPhonebookLayout(props: ITabPhonebookLayoutProps) {
    const { title, icon, children } = props;
    return (
        <Stack>
            <Stack>
                {icon}
                <Typography>{title}</Typography>
            </Stack>
        </Stack>
    );
}
