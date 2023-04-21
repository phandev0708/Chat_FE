import { profile } from '@/models/profile';
import { GroupChat } from '@/models/user-infor';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItemButton,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import Image from 'next/image';
import { ExampleContext } from 'pages';
import { useContext, useEffect, useState } from 'react';
import DialogChangeName from '../../dialog/dialog-change-name';
import { SocketContext } from '../../socket';
import ItemCheckComponent from '../create-room/item-checked';
import CustomizedMenus from '../menu/menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UpdateRoleUser } from '@/models/role-model';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
export interface IDialogEditRoomProps {
    open: boolean;
    onCloseModal: () => void;
    listUser: profile[];
    inforGroup: GroupChat;
    setInforUser: any;
    setOpen: any;
}

export default function DialogEditRoom(props: IDialogEditRoomProps) {
    const { open, onCloseModal, listUser, inforGroup, setOpen, setInforUser } = props;
    const [openDialogEditName, setOpenDialogEditName] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const { socket }: any = useContext(SocketContext);
    const { profile } = useContext(ExampleContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOnlyAdminChat, setIsOnlyAdminChat] = useState(false);
    const [isAutoAcceptMember, setIsAutoAcceptMember] = useState(false);
    const [isInvite, setIsInvite] = useState(false);
    const [isDisableBtnSaveRole, setIsDisableBtnSaveRole] = useState(true);
    const openTabAdmin = () => {
        setIsInvite(inforGroup?.ChatRoom?.IsInvite || false);
        setIsAutoAcceptMember(inforGroup?.ChatRoom?.IsAutoAcceptMember || false);
        setIsOnlyAdminChat(inforGroup?.ChatRoom?.IsOnlyAdminChat || false);
        setTabIndex(1);
    };
    const handleSetRoleAdmin = (event: any) => {
        event.preventDefault();
        const payload = {
            RoomId: inforGroup?.ChatRoom?.ID,
            UserCreate: profile?.ID,
            IsInvite: isInvite,
            IsOnlyAdminChat: isOnlyAdminChat,
            IsAutoAcceptMember: isAutoAcceptMember,
        };
        if (!socket) return;
        socket.emit('update-setting-room', payload);
        onCloseModal();
    };
    useEffect(() => {
        if (
            inforGroup?.ChatRoom?.IsInvite != isInvite ||
            inforGroup?.ChatRoom?.IsAutoAcceptMember != isAutoAcceptMember ||
            inforGroup?.ChatRoom?.IsOnlyAdminChat != isOnlyAdminChat
        ) {
            setIsDisableBtnSaveRole(false);
        } else {
            setIsDisableBtnSaveRole(true);
        }
    }, [isOnlyAdminChat, isAutoAcceptMember, isInvite]);
    const handleDeleteRoom = () => {
        const payload = {
            UserDelete: profile?.ID,
            RoomId: inforGroup?.ChatRoom?.ID,
        };
        if (!socket) return;

        socket.emit('delete-room', payload);
        onCloseModal();
        setOpen(false);
        setInforUser({});
    };

    const updateRoleUser = (userId: string, isAdmin: boolean) => {
        const payload: UpdateRoleUser = {
            IsAdmin: !isAdmin,
            UserCreate: profile.ID,
            RoomId: inforGroup?.ChatRoom?.ID,
            UserUpdate: userId,
        };
        if (!socket) return;

        socket.emit('update-role-user', payload);
    };

    const removeUser = (userId: string) => {
        const payload = {
            UserRemove: userId,
            UserCreate: profile.ID,
            RoomId: inforGroup?.ChatRoom?.ID,
        };
        if (!socket) return;

        socket.emit('remove-user-in-room', payload);
        onCloseModal();
    };

    useEffect(() => {
        if (props.listUser.length > 0) {
            props.listUser?.map((res) => {
                if (res.ID == profile?.ID) {
                    setIsAdmin(res.IsAdminGroup || false);
                }
            });
        }
    }, [profile?.ID, props.listUser]);

    const handleUploadImage = (e: any) => {
        const file = e.target.files[0];
        const payload = {
            ID: inforGroup?.ChatRoom?.ID,
            RoomImage: file,
            UserCreate: profile?.ID,
            FileType: file ? file?.type : '',
        };
        if (!socket) return;

        socket.emit('update-info-room', payload);
    };

    const handleChangeName = (name: string) => {
        const payload = {
            ID: inforGroup?.ChatRoom?.ID,
            RoomName: name,
            UserCreate: profile?.ID,
        };
        if (!socket) return;

        socket.emit('update-info-room', payload);
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
                <DialogChangeName
                    open={openDialogEditName}
                    handleCloseModal={() => {
                        setOpenDialogEditName(false);
                    }}
                    idGroup={inforGroup?.ChatRoom?.ID}
                    name={inforGroup?.ChatRoom?.RoomName}
                    handleChangeName={handleChangeName}
                ></DialogChangeName>
                <Stack direction={'row'} alignItems={'center'}>
                    {tabIndex != 0 && (
                        <Box>
                            <IconButton color="primary" onClick={() => setTabIndex(0)}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Box>
                    )}
                    <DialogTitle color={'primary'}>Thông tin nhóm</DialogTitle>
                </Stack>
                <Divider sx={{ my: 0.5 }} />

                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {tabIndex === 0 && (
                        <Stack
                            sx={{
                                minWidth: '500px',
                                maxHeight: '500px',
                                minHeight: '400px',
                                rowGap: 1,
                            }}
                        >
                            <Stack
                                direction={'column'}
                                gap={2}
                                alignItems="center"
                                justifyContent={'center'}
                            >
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    size="large"
                                    sx={{
                                        border: !inforGroup?.ChatRoom?.RoomImage
                                            ? '1px solid #abb4d2'
                                            : 'none',
                                        mb: -1,
                                        p: 0,
                                    }}
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleUploadImage}
                                    />

                                    {inforGroup?.ChatRoom?.RoomImage ? (
                                        <Stack sx={{ borderRadius: '100rem', overflow: 'hidden' }}>
                                            <Image
                                                src={
                                                    BACKEND_DOMAIN + inforGroup?.ChatRoom?.RoomImage
                                                }
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
                                <Stack direction={'row'} alignItems={'center'}>
                                    <Typography color={'#abb4d2'}>
                                        {inforGroup?.ChatRoom?.RoomName}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => setOpenDialogEditName(true)}
                                    >
                                        <EditIcon fontSize="small"></EditIcon>
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <List
                                sx={{
                                    width: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                {listUser.map((user, index) => (
                                    <Stack key={'user' + index}>
                                        <ListItemButton sx={{ gap: 2 }}>
                                            <Avatar
                                                src={
                                                    user.Avatar
                                                        ? BACKEND_DOMAIN_ERP + user.Avatar
                                                        : ''
                                                }
                                            />

                                            <Stack
                                                direction={'row'}
                                                alignItems={'center'}
                                                justifyContent={'space-between'}
                                                width={'100%'}
                                            >
                                                <Stack justifyContent={'space-between'}>
                                                    <Stack
                                                    // direction={'row'}
                                                    // justifyContent={'space-between'}
                                                    // alignItems={'center'}
                                                    >
                                                        <Typography color={'#e1e9f1'}>
                                                            {user.Name}
                                                        </Typography>
                                                        {user.IsAdminGroup && (
                                                            <Typography
                                                                sx={{
                                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                                    fontSize: 11,
                                                                }}
                                                            >
                                                                {user.IsAdminGroup &&
                                                                    `Quản trị viên`}
                                                            </Typography>
                                                        )}
                                                    </Stack>
                                                </Stack>
                                                {isAdmin && user.ID !== profile.ID && (
                                                    <Stack
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <Stack
                                                            direction={'row'}
                                                            alignItems={'center'}
                                                            justifyContent={'end'}
                                                        >
                                                            <CustomizedMenus>
                                                                {!user.IsAdminGroup && (
                                                                    <MenuItem
                                                                        disableRipple
                                                                        onClick={() =>
                                                                            updateRoleUser(
                                                                                user.ID,
                                                                                user.IsAdminGroup ||
                                                                                    false
                                                                            )
                                                                        }
                                                                    >
                                                                        Thêm quản trị viên
                                                                    </MenuItem>
                                                                )}
                                                                {!user.IsAdminGroup && (
                                                                    <Divider sx={{ my: 0.5 }} />
                                                                )}
                                                                {!user.IsAdminGroup && (
                                                                    <MenuItem
                                                                        disableRipple
                                                                        onClick={() =>
                                                                            removeUser(user.ID)
                                                                        }
                                                                    >
                                                                        Xóa khỏi phòng
                                                                    </MenuItem>
                                                                )}

                                                                {/* <MenuItem disableRipple>Rời nhóm</MenuItem> */}
                                                            </CustomizedMenus>
                                                        </Stack>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </ListItemButton>
                                    </Stack>
                                ))}
                            </List>
                            {isAdmin && (
                                <>
                                    <Divider sx={{ my: 0.5 }} />
                                    <Button onClick={openTabAdmin}>Quản trị</Button>
                                    <Button color="error" onClick={handleDeleteRoom}>
                                        Giải tán phòng
                                    </Button>
                                </>
                            )}
                        </Stack>
                    )}
                    {tabIndex === 1 && (
                        <>
                            <Stack>
                                <Stack>
                                    <ItemCheckComponent
                                        title={'cho phép mời thành viên'}
                                        checked={isInvite}
                                        setChecked={() => {
                                            setIsInvite(!isInvite);
                                        }}
                                    />
                                    <ItemCheckComponent
                                        title={'cho phép chỉ admin chat'}
                                        checked={isOnlyAdminChat}
                                        setChecked={() => {
                                            setIsOnlyAdminChat(!isOnlyAdminChat);
                                        }}
                                    />
                                    <ItemCheckComponent
                                        title={'cho phép tự động chấp nhận thành viên'}
                                        checked={isAutoAcceptMember}
                                        setChecked={() => {
                                            setIsAutoAcceptMember(!isAutoAcceptMember);
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack justifyContent={'flex-end'} direction={'row'} gap={1}>
                                <Button
                                    sx={{ backgroundColor: '#262e35' }}
                                    variant="contained"
                                    onClick={handleSetRoleAdmin}
                                    disabled={isDisableBtnSaveRole}
                                >
                                    lưu
                                </Button>
                            </Stack>
                        </>
                    )}
                </DialogContent>
                {/* <DialogActions>
                    <Button variant="outlined" onClick={onCloseModal}>
                        Hủy
                    </Button>
                    <Button sx={{ backgroundColor: '#262e35' }} variant="contained">
                        lưu
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
}
