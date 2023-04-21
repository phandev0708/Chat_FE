import { styled, Typography } from '@mui/material';
export const TypographyOneLineStyle = styled(Typography)(({ theme }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}));
