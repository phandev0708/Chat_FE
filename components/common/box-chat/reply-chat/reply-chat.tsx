const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import { TypographyOneLineStyle } from '@/styles/index';
import { Box, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export interface IReplyChatProps {
    message: string;
    name: string | undefined;
    listFile?: any[];
}

export default function ReplyChat(props: IReplyChatProps) {
    const { message, name, listFile } = props;
    return (
        <Stack flex={1} p={1} sx={{ backgroundColor: '#6f7c89', borderRadius: 1 }}>
            <Stack
                p={1}
                sx={{ borderLeft: '1px solid #69a2db' }}
                direction={'row'}
                gap={1}
                alignItems={'center'}
            >
                <ImageList
                    cols={!listFile ? 0 : listFile.length > 10 ? 10 : listFile.length + 1}
                    rowHeight={80}
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    {listFile != undefined &&
                        listFile?.map((item, index) => (
                            <ImageListItem key={index}>
                                <Image
                                    src={BACKEND_DOMAIN + item.Path}
                                    alt="Picture"
                                    width={200}
                                    height={200}
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '70px',
                                        height: '70px',
                                    }}
                                />
                            </ImageListItem>
                        ))}
                </ImageList>

                <Box width={'90%'}>
                    <Box>
                        <Typography color={'#c1c6d9'} variant={'body2'}>
                            {name}
                        </Typography>
                        <TypographyOneLineStyle color={'#c1c6d9'} fontSize="small">
                            {message}
                        </TypographyOneLineStyle>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
}
