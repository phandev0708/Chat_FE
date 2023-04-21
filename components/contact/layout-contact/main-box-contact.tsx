import { Box, Stack, Typography } from '@mui/material';

export interface IMainBoxConTactProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function MainBoxConTact(props: IMainBoxConTactProps) {
    const { title, icon, children } = props;
    return (
        <Stack sx={{ backgroundColor: '#393939' }} flex={1}>
            <Stack sx={{ padding: '0 20px', py: 2, background: '#262626' }}>
                <Typography variant="h6" color={'#e1e9f1'}>
                    {title}
                </Typography>
            </Stack>
            {children}
        </Stack>
    );
}
