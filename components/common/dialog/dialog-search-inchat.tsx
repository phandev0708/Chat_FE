import useDebounce from '@/hooks/useDebounce';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { getCurrentHouse, removeAccents } from '@/ultis/index';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useRef, useState } from 'react';
import { chatApi } from '@/api/chat-api';
import { ChatFindModel } from '@/models/chat-model';
import HighlightedText from '../highlingt-text-search/highlight-text';
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IDialogSearchInchatProps {
    open: boolean;
    onClose: () => void;
    idRoom: string;
    setListMess: any;
    setPageMax: any;
    pageMax: number;
    setPageMin: any;
    pageMin: number;
    setIndex: any;
    setOpenLoading: any;
}

export default function DialogSearchInchat(props: IDialogSearchInchatProps) {
    const { open, onClose, idRoom, setListMess, setPageMax, setPageMin, setIndex, setOpenLoading } =
        props;
    const [dataSearch, setDataSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const dataDebonce = useDebounce(dataSearch, 500);
    const [allText, setAllText] = useState<ChatFindModel[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);

    const findData = async () => {
        if (!idRoom) return;
        const payLoad = {
            roomId: idRoom,
            page: page.toString(),
            limit: (10).toString(),
            keyFind: removeAccents(dataDebonce.toLowerCase().trim()),
        };
        const { data } = await chatApi.getAllTextByRoomId(payLoad);
        if (data) {
            setAllText(allText.concat(data.data));
            setTotalRecords(data.paginate?.total);
        } else {
            setAllText([]);
        }
    };
    useEffect(() => {
        if (dataDebonce.trim().length > 0) {
            findData();
        } else {
            setTotalRecords(0);
        }
    }, [dataDebonce]);
    useEffect(() => {
        if (page > 1) {
            findData();
        }
    }, [page]);
    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (dataDebonce.trim().length > 0) {
                findData();
            } else {
                setAllText([]);
            }
        }
    };
    const handleMoveToChatChoose = async (chatId: string) => {
        if (!chatId) return;
        setOpenLoading(true);
        const { data } = await chatApi.findChatId(chatId);
        if (data) {
            if (data.data && data.data?.data) {
                setListMess(data.data?.data);
                if (data.data?.paginate) {
                    if (data.data?.paginate?.pageMax) {
                        setPageMax(data.data?.paginate?.pageMax);
                    } else {
                        setPageMax(data.data?.paginate?.page);
                        setPageMin(data.data?.paginate?.page);
                    }
                    if (data.data?.paginate?.pageMin) {
                        setPageMin(data.data?.paginate?.pageMin);
                    }
                }
                setIndex(data.index);
                // setPageMax
            } else {
                setIndex(data.index);
            }
        }
        onClose();
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={(e: any) => {
                    onClose();
                    setPage(1);
                    setAllText([]);
                    setDataSearch('');
                    setTotalRecords(0);
                }}
                sx={{
                    '&.MuiDialog-root ': {
                        '& .MuiPaper-rounded ': {
                            backgroundColor: '#393939',
                        },
                    },
                }}
            >
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 2,
                        width: '500px',
                    }}
                >
                    <Stack>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Nhập nội dung cần tìm..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={dataSearch}
                                onChange={(e) => setDataSearch(e.target.value)}
                                onKeyPress={handleEnter}
                                sx={{ width: '100%' }}
                            />
                        </Search>
                    </Stack>
                    <Stack
                        sx={{
                            height: 500,
                            justifyContent:
                                !dataSearch || allText.length == 0 ? 'center' : 'flex-start',
                            alignItems:
                                !dataSearch || allText.length == 0 ? 'center' : 'flex-start',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                        ref={boxRef}
                        onScroll={(e) => {
                            if (
                                e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
                                e.currentTarget.clientHeight
                            ) {
                                if (totalRecords > allText.length) {
                                    setPage((pre) => pre + 1);
                                }
                            }
                        }}
                    >
                        {(!dataSearch || allText.length == 0) && (
                            <Typography sx={{ color: '#abb4d2', fontSize: '20px' }}>
                                Tìm kiếm nội dung tin nhắn...
                            </Typography>
                        )}
                        {dataSearch &&
                            allText.length > 0 &&
                            allText.map((res, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        sx={{
                                            bgcolor: 'rgba(54, 64, 74)',
                                            mt: 1,
                                            p: 1,
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'rgba(54, 64, 74, 0.6)',
                                            },
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => handleMoveToChatChoose(res.ID)}
                                    >
                                        <Avatar
                                            src={res.Avatar ? BACKEND_DOMAIN_ERP + res.Avatar : ''}
                                            alt={res.UserName}
                                        ></Avatar>
                                        <Stack sx={{ pl: 1 }}>
                                            <Stack
                                                sx={{
                                                    flexDirection: 'row',
                                                    maxWidth: '380px',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        fontSize: '16px',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {res.UserName}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    {getCurrentHouse(res?.CreatedAt)}
                                                </Typography>
                                            </Stack>

                                            <Stack
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    width: '380px',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                <HighlightedText
                                                    text={res.Text}
                                                    searchWords={[dataDebonce]}
                                                />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                );
                            })}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}
