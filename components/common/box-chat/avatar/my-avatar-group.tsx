import { profile } from '@/models/profile';
import { UserChat } from '@/models/user-model';
import { Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';

const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IMyAvatarGroupProps {
    listUser: profile[];
    avatar?: string;
}

export default function MyAvatarGroup(props: IMyAvatarGroupProps) {
    const { listUser, avatar } = props;
    //children
    return avatar ? (
        <Avatar alt="Group" src={avatar} sx={{ width: 50, height: 50 }} />
    ) : (
        <Grid
            container
            sx={{
                width: '55px',
                '&>*:nth-of-type(n+3)': {
                    mt: '-4px',
                },
                '&>*:nth-of-type(even)': {
                    ml: '-2px',
                },
            }}
            spacing={0}
        >
            {listUser.slice(0, 3).map((res, index) => (
                <Grid xs={6} key={'grid' + res.ID + index}>
                    <Avatar
                        alt={res.Name}
                        src={res.Avatar ? BACKEND_DOMAIN_ERP + res.Avatar : ''}
                        sx={{
                            width: 26,
                            height: 26,
                            border: '1px solid white',
                            zIndex: 3 - index,
                        }}
                    />
                </Grid>
            ))}
            {listUser.length > 3 && (
                <Grid xs={6}>
                    <Avatar
                        sx={{
                            width: 26,
                            height: 26,
                            border: '1px solid white',
                            fontSize: 16,
                            pt: '2px',
                        }}
                    >
                        {listUser.length - 3}
                    </Avatar>
                </Grid>
            )}
        </Grid>
    );
}
