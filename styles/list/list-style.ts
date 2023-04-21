import styled from '@emotion/styled';

export const ListItem = styled('li')(({ theme }: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
}));
