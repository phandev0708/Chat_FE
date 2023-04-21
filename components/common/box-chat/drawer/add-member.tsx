import { homeApi } from '@/api/home-api';
import { UserChatModel } from '@/models/user-chat-model';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { ListItem } from '@/styles/list/list-style';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar, Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { ExampleContext } from 'pages';
import { memo, useContext, useEffect, useState } from 'react';
import UserListComponent from '../create-room/user-list';
import SearchIcon from '@mui/icons-material/Search';
import { SocketContext } from '../../socket';
import { useSelector } from 'react-redux';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IAddMemberProps {
    roomId: string;
    onClose: () => void;
}

const AddMember = (props: IAddMemberProps) => {
    const [listUser, setListUser] = useState([]);
    const { profile } = useContext(ExampleContext);
    const [checked, setChecked] = useState<UserChatModel[]>([]);
    const { socket }: any = useContext(SocketContext);
    const handleCreateGroup = () => {
        if (!props.roomId) return;
        if (checked.length <= 0) return;
        const data = {
            RoomId: props.roomId,
            UserCreate: profile.ID,
            ListUser: checked.map((item) => item.ID),
        };

        // onCloseModal();
        if (!socket) return;
        socket.emit('add-member', data);
        props.onClose();
    };
    useEffect(() => {
        (async () => {
            if (!props.roomId) return;
            const { data } = await homeApi.getAllUserOutsideGroupChat(props.roomId);
            const index = data.findIndex((item: any) => item.ID === profile.ID);
            if (index !== -1) {
                data.splice(index, 1);
            }
            setListUser(data);
        })();
    }, [props.roomId]);

    const handleDelete = (chipToDelete: UserChatModel) => () => {
        setChecked((checked) => checked.filter((chip) => chip.ID !== chipToDelete.ID));
    };
    return (
        <Stack
            alignItems={'center'}
            sx={{ cursor: 'pointer', pt: 2 }}
            onClick={() => console.log('click')}
        >
            <Stack>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Nhập tên, số điện thoại"
                        inputProps={{ 'aria-label': 'search' }}
                        // value={dataSearch}
                        // onChange={(e) => setDataSearch(e.target.value)}
                        // onKeyPress={handleEnter}
                    />
                </Search>
            </Stack>
            <Stack direction={'row'} flex={1} justifyContent="space-between" sx={{ pt: 1 }}>
                <UserListComponent items={listUser} checked={checked} setChecked={setChecked} />
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'no-wrap',
                            listStyle: 'none',
                            flexDirection: 'column',
                            p: 0.5,
                            m: 0,
                            height: '60vh',
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
                                                            ? BACKEND_DOMAIN_ERP + data.Avatar
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
                    </Stack>
                    {checked && checked.length !== 0 && (
                        <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-end', pb: 2 }}>
                            <Button variant="outlined" onClick={props.onClose}>
                                Hủy
                            </Button>
                            <Button
                                sx={{ backgroundColor: '#262e35', ml: 2 }}
                                variant="contained"
                                onClick={handleCreateGroup}
                            >
                                Tạo
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
export default memo(AddMember);
