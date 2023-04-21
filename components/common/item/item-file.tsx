import {
    Avatar,
    Button,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IItemFileProps {
    onClick?: () => void;
    name: string;
    size?: string;
    time?: string;
    children?: React.ReactNode;
}

export default function ItemFile(props: IItemFileProps) {
    return (
        <ListItemButton
            sx={{
                position: 'relative',
                '&:hover #share-btn-action': {
                    display: 'flex',
                },
            }}
        >
            <ListItemAvatar>
                <Avatar variant="rounded">
                    <InsertDriveFileIcon />
                </Avatar>
            </ListItemAvatar>

            <ListItemText
                disableTypography
                primary={props.name}
                secondary={
                    <Stack direction={'row'} justifyContent="space-between">
                        <Typography fontSize={14}>{props.size}</Typography>
                        <Typography fontSize={14}>{props.time}</Typography>
                    </Stack>
                }
                sx={{
                    color: '#e1e9f1',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    // display: '-webkit-box',
                    // '-webkit-line-clamp': '1',
                    // '-webkit-box-orient': 'vertical',
                    // overflow: 'hidden',
                    // 'text-overflow': 'ellipsis',
                    '& .MuiStack-root': { color: '#9aa1b9' },
                }}
            />

            <Stack
                id="share-btn-action"
                position={'absolute'}
                right={0}
                top={0}
                sx={{ backgroundColor: 'black', display: 'none' }}
                direction={'row'}
            >
                {props.children}
            </Stack>
        </ListItemButton>
    );
}
