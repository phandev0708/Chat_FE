import { homeApi } from '@/api/home-api';
import { profile } from '@/models/profile';
import { GroupChat } from '@/models/user-infor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../socket';
import DialogEditRoom from '../edit-room/dialog-edit-room';
import BoxButton from './box-button';
import BoxFile from './box-file';
import BoxImage from './box-image';
import BoxLink from './box-link';
import GroupMessage from './group-message';
export interface IChatInforProps {
    inforUser: GroupChat;
    setInforUser: any;
    setOpen: any;
    profile: any;
    listUserRead: profile[];
}

export default function ChatInfor({
    inforUser,
    listUserRead,
    setInforUser,
    setOpen,
    profile,
}: IChatInforProps) {
    const [dataFileAndLink, setDataFileAndLink] = useState<any>([]);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const { socket }: any = useContext(SocketContext);
    const handleCloseDialogEdit = () => {
        setOpenDialogEdit(false);
    };
    useEffect(() => {
        if (inforUser?.ChatRoom?.ID) {
            (async () => {
                if (!inforUser?.ChatRoom.ID) return;
                const payload = {
                    roomId: inforUser?.ChatRoom.ID,
                    page: '1',
                    limit: '6',
                };
                const { data } = await homeApi.getFileAndLink(payload);
                setDataFileAndLink(data);
            })();
        }
    }, [inforUser?.ChatRoom?.ID]);

    const handleOutRoom = () => {
        if (!inforUser?.ChatRoom?.ID || !profile.ID) return;
        const payload = {
            UserRemove: profile.ID,
            UserCreate: profile.ID,
            RoomId: inforUser?.ChatRoom?.ID,
        };
        if (!socket) return;

        socket.emit('remove-user-in-room', payload);
        setInforUser({});
        setOpen(false);
    };
    return (
        <Stack
            alignItems={'center'}
            sx={{
                height: '100vh',
                backgroundColor: '#262626',
            }}
        >
            <Stack sx={{ py: 2 }}>
                <Typography variant={'h6'} textAlign={'center'} fontWeight="600" color={'primary'}>
                    Thông Tin Hội Thoại
                </Typography>
            </Stack>
            <DialogEditRoom
                open={openDialogEdit}
                onCloseModal={() => handleCloseDialogEdit()}
                listUser={listUserRead}
                inforGroup={inforUser}
                setInforUser={setInforUser}
                setOpen={setOpen}
            ></DialogEditRoom>
            <Stack
                sx={{ overflowY: 'scroll', overflowX: 'hidden', background: '#262626' }}
                pl={1}
                pr={0}
            >
                <BoxButton
                    listUser={listUserRead}
                    room={inforUser?.ChatRoom}
                    userChat={inforUser.UserChat}
                    onOpenDialogEdit={() => {
                        setOpenDialogEdit(true);
                    }}
                />
                <Stack spacing={1}>
                    <GroupMessage />
                    <BoxImage Images={dataFileAndLink?.Images} roomId={inforUser?.ChatRoom?.ID} />
                    <BoxFile Files={dataFileAndLink.Files} roomId={inforUser?.ChatRoom?.ID} />
                    <BoxLink Links={dataFileAndLink.Links} roomId={inforUser?.ChatRoom?.ID} />

                    <Stack>
                        {inforUser?.ChatRoom?.IsGroup && (
                            <Button
                                sx={{ justifyContent: 'flex-start', px: 2 }}
                                color={'error'}
                                startIcon={<DeleteIcon />}
                                onClick={handleOutRoom}
                            >
                                Rời nhóm
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
