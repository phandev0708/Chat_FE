import { styled, Tab } from '@mui/material';
export const TabStyle = styled(Tab)(({ theme }) => ({
    padding: theme.spacing(0, 4),
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'row',
    minHeight: '50px',
    gap: '10px',
}));
