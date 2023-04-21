import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

export interface IInProcessLoadingProps {}

export function InProcessLoading(props: IInProcessLoadingProps) {
    return (
        <Stack>
            <Stack sx={{ flexDirection: 'row' }}>
                <Avatar src={'/gif/ai.gif'} />
                <Stack sx={{ ml: 1 }}>
                    <Typography sx={{ color: '#fff' }}>Oryza AI Chat</Typography>
                    <Stack sx={{ flexDirection: 'row' }}>
                        <Typography
                            sx={{ color: '#fff', fontStyle: 'italic', mr: 2, fontSize: '13px' }}
                        >
                            Đang nạp dữ liệu
                        </Typography>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontStyle: 'italic',
                                webkitAnimation: 'rotating 1s linear infinite',
                                MozAnimation: 'rotating 1s linear infinite',
                                animation: 'rotating 1s linear infinite',
                                fontSize: '13px',
                            }}
                        >
                            /
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
