import { homeApi } from '@/api/home-api';
import useDebounce from '@/hooks/useDebounce';
import { UserChatModel } from '@/models/user-chat-model';
import { closeRoom } from '@/redux/socket/new-room-slice';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { ListItem } from '@/styles/list/list-style';
import { removeAccents } from '@/ultis/index';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    IconButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ExampleContext } from 'pages';
import { memo, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemCheckComponent from './item-checked';
import UserListComponent from './user-list';
import { SocketContext } from '../../socket';
import Image from 'next/image';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IDialogCreateGroupProps {
    open: boolean;
    onCloseModal: () => void;
}

const DialogCreateGroup = (props: IDialogCreateGroupProps) => {
    const { open, onCloseModal } = props;
    const [checked, setChecked] = useState<UserChatModel[]>([]);
    const [dataSearch, setDataSearch] = useState<string>('');
    const [roomName, setRoomName] = useState<string>('');
    const [roomImage, setRoomImage] = useState<File | null>(null);
    const [listUser, setListUser] = useState<UserChatModel[]>([]);
    const [listUserSearch, setListUserSearch] = useState<UserChatModel[]>([]);
    //cho phép mời thành viên
    const [isInvite, setIsInvite] = useState<boolean>(true);
    //cho phép chỉ admin chat
    const [isOnlyAdminChat, setIsOnlyAdminChat] = useState<boolean>(false);
    //cho phép tự động chấp nhận thành viên
    const [isAutoAcceptMember, setIsAutoAcceptMember] = useState<boolean>(true);
    const dispath = useDispatch();

    const { socket }: any = useContext(SocketContext);
    const newRoom = useSelector((state: any) => {
        return state.newRoom;
    });

    const handleDelete = (chipToDelete: UserChatModel) => () => {
        setChecked((checked) => checked.filter((chip) => chip.ID !== chipToDelete.ID));
    };
    const { profile } = useContext(ExampleContext);

    useEffect(() => {
        (async () => {
            if (!profile?.CompanyId?.ID) return;
            const { data } = await homeApi.getAllUser(profile?.CompanyId?.ID);
            const index = data.findIndex((item: any) => item.ID === profile.ID);
            if (index !== -1) {
                data.splice(index, 1);
            }
            setListUser(data);
            setListUserSearch(data);
        })();
    }, [profile?.CompanyId?.ID]);
    useEffect(() => {
        if (newRoom?.message?.length > 0) {
            if (newRoom?.status == 200) {
                setRoomName('');
                setRoomImage(null);
                setChecked([]);
                setIsInvite(true);
                setIsOnlyAdminChat(false);
                setIsAutoAcceptMember(true);
                onCloseModal();
                dispath(closeRoom());
            }
        }
    }, [newRoom]);
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
        } else {
            setListUserSearch(listUser);
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

    const handleCreateGroup = () => {
        if (!roomName) return;
        if (checked.length <= 1) return;
        let fileType = roomImage ? roomImage?.type : '';
        const data = {
            RoomName: roomName,
            UserCreate: profile.ID,
            RoomImage: roomImage,
            IsInvite: isInvite,
            IsOnlyAdminChat: isOnlyAdminChat,
            IsAutoAcceptMember: isAutoAcceptMember,
            ListUser: checked.map((item) => item.ID),
            FileType: fileType,
        };

        // onCloseModal();
        if (!socket) return;
        socket.emit('create-room', data);
    };
    const handleUploadImage = (e: any) => {
        if (!e.target.files[0]) return;
        const file = e.target.files[0];
        setRoomImage(file);
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
                <DialogTitle color={'primary'}>Tạo nhóm</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 2,
                        minWidth: '500px',
                    }}
                >
                    <Stack direction={'row'} alignItems="center">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            size="large"
                            sx={{
                                border: !roomImage ? '1px solid #abb4d2' : 'none',
                                mb: -1,
                                p: 0,
                                mr: 1,
                            }}
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleUploadImage}
                            />

                            {roomImage ? (
                                <Stack sx={{ borderRadius: '100rem', overflow: 'hidden' }}>
                                    <Image
                                        src={URL.createObjectURL(roomImage)}
                                        alt="Picture of the room"
                                        width={200}
                                        height={200}
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            width: 53,
                                            height: 53,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Stack>
                            ) : (
                                <PhotoCamera fontSize="large" sx={{ m: 1 }} />
                            )}
                        </IconButton>

                        <TextField
                            id="standard-basic"
                            label="Nhập tên nhóm"
                            variant="standard"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-input': {
                                    color: '#fff',
                                },
                            }}
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Stack>

                    <Stack>
                        <ItemCheckComponent
                            title={'cho phép mời thành viên'}
                            checked={isInvite}
                            setChecked={setIsInvite}
                        />
                        <ItemCheckComponent
                            title={'cho phép chỉ admin chat'}
                            checked={isOnlyAdminChat}
                            setChecked={setIsOnlyAdminChat}
                        />
                        <ItemCheckComponent
                            title={'cho phép tự động chấp nhận thành viên'}
                            checked={isAutoAcceptMember}
                            setChecked={setIsAutoAcceptMember}
                        />
                    </Stack>
                    <Stack>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Nhập tên, số điện thoại"
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
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCloseModal}>
                        Hủy
                    </Button>
                    <Button
                        sx={{ backgroundColor: '#262e35' }}
                        variant="contained"
                        onClick={handleCreateGroup}
                    >
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default memo(DialogCreateGroup);
