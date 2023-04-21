import styled from '@emotion/styled';
import { Avatar, Badge } from '@mui/material';
export const StyledBadge = styled(Badge)(({ theme, color }: any) => ({
    '& .MuiBadge-badge': {
        backgroundColor: color,
        color: color,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: `1px solid white`,
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(1)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
export const SmallAvatar = styled(Avatar)(({ theme }: any) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));
