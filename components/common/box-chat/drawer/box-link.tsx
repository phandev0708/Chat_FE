import { homeApi } from '@/api/home-api';
import { dataLinkModel } from '@/models/image-model';
import { Mess } from '@/models/user-infor';
import { StyledAccordion } from '@/styles/Accodion/accodion-style';
import { getCurrentHouse } from '@/ultis/format-time';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import {
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IBoxLinkProps {
    Links: dataLinkModel;
    roomId: string;
}

export default function BoxLink({ Links, roomId }: IBoxLinkProps) {
    const [listLink, setListLink] = useState<Mess[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        (async () => {
            if (!roomId || page == 1) return;
            const payload = {
                roomId: roomId,
                page: page.toString(),
                limit: '6',
            };
            const { data } = await homeApi.getLink(payload);
            setListLink((pre) => pre && [...pre, ...data]);
        })();
    }, [page]);
    useEffect(() => {
        setListLink(Links?.data);
        setPage(Number(Links?.paginate?.page));
    }, [Links]);
    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Link</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ width: '100%', bgcolor: '#262626' }}>
                    {listLink &&
                        listLink.length > 0 &&
                        listLink?.map((item: any, i: number) => {
                            return (
                                <ListItem
                                    key={i}
                                    sx={{
                                        position: 'relative',
                                        '&:hover .button-action': {
                                            display: 'flex',
                                        },
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <InsertLinkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Tooltip title={item.Link} placement="top">
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                    whiteSpace="nowrap"
                                                    width="200px"
                                                    sx={{
                                                        color: '#0066FF !important',
                                                        '&:hover': {
                                                            color: '#0066FF !important',
                                                            textDecoration: 'underline',
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        window.open(item.Link, '_blank');
                                                    }}
                                                >
                                                    {item.Link}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography>
                                                    {getCurrentHouse(item.CreatedAt)}
                                                </Typography>
                                            }
                                        />
                                    </Tooltip>
                                    <Stack
                                        sx={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            right: 0,
                                            top: 0,
                                            backgroundColor: 'black',
                                            display: 'none',
                                        }}
                                        className="button-action"
                                    >
                                        {/* <Button
                                            sx={{ color: 'white', minWidth: '20px' }}
                                            size="small"
                                        >
                                            <ShareIcon fontSize="small" />
                                        </Button> */}
                                        <Tooltip title={'Copy'} placement="top">
                                            <Button
                                                sx={{ color: 'white', minWidth: '20px' }}
                                                onClick={() => {
                                                    navigator.clipboard
                                                        .writeText(item.Link)
                                                        .then(() =>
                                                            enqueueSnackbar('Copy thành công', {
                                                                variant: 'success',
                                                            })
                                                        )
                                                        .catch((error) =>
                                                            enqueueSnackbar('Lỗi khi copy', {
                                                                variant: 'success',
                                                            })
                                                        );
                                                }}
                                            >
                                                <ContentCopyIcon fontSize="small" />
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </ListItem>
                            );
                        })}
                </List>
                {listLink && listLink.length < Links?.paginate?.total && (
                    <Stack
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            pt: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            cursor: 'pointer',
                        }}
                        onClick={() => setPage((pre) => pre + 1)}
                    >
                        Xem thêm...
                    </Stack>
                )}
            </AccordionDetails>
        </StyledAccordion>
    );
}
