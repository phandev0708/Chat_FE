import { Stack } from '@mui/material';
import * as React from 'react';

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Stack
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            sx={{
                display: value === index ? 'flex' : 'none',
            }}
            flex={1}
        >
            {value === index && children}
        </Stack>
    );
}
