import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
export interface IHeaderAIChatProps {
    title: string;
    avatar: string;
    onRefresh: () => void;
}

export default function HeaderAIChat({ avatar, title, onRefresh }: IHeaderAIChatProps) {
    return (
        <Stack sx={{ padding: '0 20px', backgroundColor: '#1E1E1E', py: 1 }}>
            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <Box>
                        <Avatar src={avatar} />
                    </Box>
                    <Stack>
                        <Typography variant="h6" color={'#e1e9f1'}>
                            {title}
                        </Typography>
                        <Typography
                            sx={{ color: '#e1e9f170', fontSize: '13px', fontStyle: 'italic' }}
                        >
                            Giải quyết tất cả câu hỏi của bạn với thuật toán AI mới nhất
                        </Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <Tooltip title={'Làm Mới'}>
                        <IconButton
                            onClick={() => {
                                onRefresh();
                            }}
                        >
                            <CachedIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
        </Stack>
    );
}
