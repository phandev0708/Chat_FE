import ImageIcon from '@mui/icons-material/Image';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';

export interface IIconButtonProps {
    title: string;
    Icon: any;
    handleSubmit: any;
}

export default function IconButton({ title, Icon, handleSubmit }: IIconButtonProps) {
    return (
        <Stack alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={handleSubmit}>
            <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.4)' }}>
                <Icon></Icon>
            </Avatar>
            <Typography variant={'body2'} textAlign={'center'} color={'secondary'}>
                {title}
            </Typography>
        </Stack>
    );
}
