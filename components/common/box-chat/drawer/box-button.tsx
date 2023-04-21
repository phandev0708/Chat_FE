import { avatarMock } from '@/mocks/avatar-mock';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import MyAvatarGroup from '../avatar/my-avatar-group';
import IconButton from './item-button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useContext, useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Dialog } from '@mui/material';
import AddMember from './add-member';
import { profile } from '@/models/profile';
import { ChatRoom, UserChat } from '@/models/user-infor';
import { ExampleContext, UserRoleContext } from 'pages';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IBoxButtonProps {
    listUser: profile[];
    room: ChatRoom;
    userChat: UserChat;
    onOpenDialogEdit: () => void;
}
export default function BoxButton(props: IBoxButtonProps) {
    const { profileUserInGroup } = useContext(UserRoleContext);
    // console.log(props.room);

    const [open, setOpen] = useState(false);
    const handleNotify = () => {
        console.log('Tắt thông báo');
    };
    //ConversationPins
    const handleConversationPins = () => {
        console.log('Ghim hội thoại');
    };
    const handleManagerGroup = () => {
        console.log('Quản lý nhóm');
    };
    // console.log('props.room', props.room);
    const name = props.room?.IsGroup ? props.room?.RoomName : props.userChat?.Name;
    const roomAvatar = props.room?.IsGroup
        ? props.room?.RoomImage
            ? BACKEND_DOMAIN + props.room?.RoomImage
            : ''
        : BACKEND_DOMAIN_ERP + props.userChat?.Avatar;
    return (
        <Stack rowGap={2}>
            <Stack gap={2} py={1}>
                <Stack sx={{ alignItems: 'center' }}>
                    <MyAvatarGroup listUser={props.listUser} avatar={roomAvatar}></MyAvatarGroup>
                    <Typography variant={'h6'} fontWeight="600" color={'primary'}>
                        {name}
                    </Typography>
                </Stack>
                <Stack direction={'row'} sx={{ justifyContent: 'space-around' }}>
                    <IconButton
                        title={'Tắt thông báo'}
                        Icon={NotificationsOffIcon}
                        handleSubmit={handleNotify}
                    />
                    <IconButton
                        title={'Ghim hội thoại'}
                        Icon={PushPinIcon}
                        handleSubmit={handleConversationPins}
                    />
                    {props.room?.IsGroup && (
                        <>
                            {(props.room?.IsInvite || profileUserInGroup.IsAdminGroup) && (
                                <IconButton
                                    title={'Thêm thành viên'}
                                    Icon={GroupAddIcon}
                                    handleSubmit={() => setOpen(true)}
                                />
                            )}

                            <IconButton
                                handleSubmit={() => props.onOpenDialogEdit()}
                                title={'Quản lý nhóm'}
                                Icon={SettingsIcon}
                            />
                        </>
                    )}
                </Stack>
            </Stack>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '&.MuiDialog-root ': {
                        '& .MuiPaper-rounded ': {
                            backgroundColor: '#393939',
                        },
                    },
                }}
            >
                {((props.room?.IsGroup && props.room?.IsInvite) ||
                    profileUserInGroup.IsAdminGroup) && (
                    <AddMember roomId={props.room?.ID} onClose={() => setOpen(false)} />
                )}
            </Dialog>
        </Stack>
    );
}
