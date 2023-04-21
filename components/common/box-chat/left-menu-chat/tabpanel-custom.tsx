import { Stack } from '@mui/material';
import React from 'react';

export interface ITabPanelCustomProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export default function TabPanelCustom(props: ITabPanelCustomProps) {
    const { children, value, index, ...other } = props;

    return (
        <Stack
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Stack>
    );
}
