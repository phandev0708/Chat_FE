import useDebounce from '@/hooks/useDebounce';
import { UserChatModel } from '@/models/user-chat-model';
import { ChatMess, GroupChat, Mess } from '@/models/user-infor';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { ListItem } from '@/styles/list/list-style';
import { removeAccents } from '@/ultis/index';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Chip, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';
import { ConversationsContext, ExampleContext } from 'pages';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UserListComponent from '../box-chat/create-room/user-list';
import { SocketContext } from '../socket';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IDialogShareMessageProps {
    open: boolean;
    onCloseModal: () => void;
    mess?: Mess;
}

const DialogShareMessage = (props: IDialogShareMessageProps) => {
    const { open, onCloseModal, mess } = props;
    const [checked, setChecked] = useState<UserChatModel[]>([]);
    const [dataSearch, setDataSearch] = useState<string>('');
    const [listUser, setListUser] = useState<UserChatModel[]>([]);
    const [listUserSearch, setListUserSearch] = useState<UserChatModel[]>([]);

    const dispath = useDispatch();
    const { conversations } = useContext(ConversationsContext);
    const { socket }: any = useContext(SocketContext);
    const handleDelete = (chipToDelete: UserChatModel) => () => {
        setChecked((checked) => checked.filter((chip) => chip.ID !== chipToDelete.ID));
    };
    const handleShareMessage = () => {
        if (socket === null) return;
        // console.log(mess?.files);
        // if (mess?.files && mess.files.length > 0) {
        //     const filePayload: any = [];
        //     mess.files.forEach((file) => {
        //         const name = file.FileName;
        //         filePayload.push({ name: name, file: {
        //             path: file.Path,
        //             lastModified: new Date().getTime(),
        //             lastModifiedDate: new Date(),
        //             name: file.FileName,
        //             size: file.FileSize,
        //             type: ''
        //         } });
        //     });
        // }
        checked.forEach((item) => {
            const payload: ChatMess = {
                Text: mess?.Text ? mess?.Text : '',
                Type: mess?.Type ? mess?.Type : '',
                UserCreate: profile?.ID,
                RoomId: item.ID,
                files: mess?.files,
                TypeChat: 'SHARE',
            };
            console.log(payload);
            socket.emit('chat', payload);
        });
        onCloseModal();
        setChecked([]);
    };
    const { profile } = useContext(ExampleContext);

    useEffect(() => {
        if (conversations) {
            const data: UserChatModel[] = [];
            conversations.forEach((item: GroupChat) => {
                if (item.UserChat) {
                    data.push({
                        ID: item.ChatRoom.ID,
                        Email: '',
                        Avatar: item.UserChat.Avatar,
                        Name: item.UserChat.Name,
                        IsOnline: false,
                        CompanyId: '',
                    });
                } else {
                    data.push({
                        ID: item.ChatRoom.ID,
                        Email: '',
                        Avatar: item.ChatRoom.RoomImage,
                        Name: item.ChatRoom.RoomName,
                        IsOnline: false,
                        CompanyId: '',
                    });
                }
            });
            setListUser(data);
            setListUserSearch(data);
        }
    }, [conversations]);
    const dataDebonce = useDebounce(dataSearch, 200);

    useEffect(() => {
        if (dataDebonce.trim().length > 0) {
            const data: UserChatModel[] = [];
            listUser.forEach((item) => {
                // console.log(item.Name.toLowerCase().indexOf(dataDebonce.toLowerCase()));
                if (
                    removeAccents(item.Name.toLowerCase().trim()).indexOf(
                        removeAccents(dataDebonce.toLowerCase().trim())
                    ) !== -1
                ) {
                    data.push(item);
                }
            });
            setListUserSearch(data);
        }
    }, [dataDebonce]);

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (dataDebonce.trim().length > 0) {
                const data: UserChatModel[] = [];
                listUser.forEach((item) => {
                    // console.log(item.Name.toLowerCase().indexOf(dataDebonce.toLowerCase()));
                    if (
                        item.Name.toLowerCase().trim().indexOf(dataDebonce.toLowerCase().trim()) !==
                        -1
                    ) {
                        data.push(item);
                    }
                });
                setListUserSearch(data);
            } else {
                setListUserSearch(listUser);
            }
        }
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={onCloseModal}
                sx={{
                    '&.MuiDialog-root ': {
                        '& .MuiPaper-rounded ': {
                            backgroundColor: '#393939',
                        },
                    },
                }}
            >
                <DialogTitle color={'primary'}>Chia sẻ</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 2,
                        minWidth: '500px',
                    }}
                >
                    <Stack>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm kiếm cuộc hội thoại"
                                inputProps={{ 'aria-label': 'search' }}
                                value={dataSearch}
                                onChange={(e) => setDataSearch(e.target.value)}
                                onKeyPress={handleEnter}
                            />
                        </Search>
                    </Stack>
                    <Stack direction={'row'} flex={1} justifyContent="space-between">
                        <UserListComponent
                            items={listUserSearch}
                            checked={checked}
                            setChecked={setChecked}
                        />
                        <Stack>
                            <Box
                                sx={{
                                    listStyle: 'none',
                                    flexDirection: 'column',
                                    p: 0.5,
                                    m: 0,
                                    maxHeight: '450px',
                                    overflow: 'auto',
                                }}
                                component="ul"
                            >
                                {checked && checked.length !== 0 ? (
                                    checked.map((data) => {
                                        return (
                                            <ListItem key={data.ID}>
                                                <Chip
                                                    avatar={
                                                        <Avatar
                                                            alt={data.Name}
                                                            src={
                                                                data.Avatar
                                                                    ? BACKEND_DOMAIN_ERP +
                                                                      data.Avatar
                                                                    : ''
                                                            }
                                                        />
                                                    }
                                                    label={data.Name}
                                                    onDelete={handleDelete(data)}
                                                    sx={{
                                                        color: '#abb4d2',
                                                        '& .MuiSvgIcon-root': {
                                                            color: '#abb4d2',
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography color={'primary'}>Nội dung chia sẻ</Typography>
                        <Stack sx={{ background: '#6f7c89', p: 1 }}>
                            <Stack gap={1}>
                                <Typography
                                    sx={{
                                        color: '#abb4d2',
                                    }}
                                    fontSize="small"
                                >
                                    {mess?.Text}
                                </Typography>
                                <ImageList
                                    cols={
                                        mess?.files && mess?.files.length > 4
                                            ? 3
                                            : mess?.files
                                            ? mess?.files?.length
                                            : 0
                                    }
                                    rowHeight={140}
                                >
                                    {mess?.files !== undefined &&
                                        mess?.files.map((item, index) => {
                                            const extension = item.Path.split('.');
                                            const isImage = ['jpg', 'png', 'jpeg'].includes(
                                                extension[extension.length - 1]
                                            );
                                            return (
                                                <ImageListItem key={index}>
                                                    {isImage ? (
                                                        <Image
                                                            // check is image or file
                                                            src={BACKEND_DOMAIN + item.Path}
                                                            alt="Picture of the author"
                                                            width={400}
                                                            height={400}
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                width: 140,
                                                                height: 140,
                                                            }}
                                                        />
                                                    ) : (
                                                        // <Link href={BACKEND_DOMAIN + item.Path}>
                                                        <Image
                                                            // check is image or file
                                                            src={'/static/image/file.png'}
                                                            alt="Picture of the author"
                                                            width={400}
                                                            height={400}
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                width: 160,
                                                                height: 160,
                                                            }}
                                                        />
                                                        // </Link>
                                                    )}
                                                </ImageListItem>
                                            );
                                        })}
                                </ImageList>
                            </Stack>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCloseModal}>
                        Hủy
                    </Button>
                    <Button
                        sx={{ backgroundColor: '#262e35' }}
                        variant="contained"
                        disabled={checked.length > 0 ? false : true}
                        onClick={handleShareMessage}
                    >
                        Chia sẻ
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default DialogShareMessage;
