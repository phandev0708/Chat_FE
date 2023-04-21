import { Accordion, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }: any) => ({
    background: '#262626',
    boxShadow: 'none',
    border: 'none',
    '& .MuiAccordionSummary-root': {
        '& .MuiAccordionSummary-content': {
            color: '#fff',
        },
    },
    '& .MuiAccordionDetails-root': {
        background: '#262626',
        '& .MuiTypography-root': {
            color: theme.palette.text.secondary,
        },
    },
}));
