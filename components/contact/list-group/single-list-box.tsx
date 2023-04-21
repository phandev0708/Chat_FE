import { homeApi } from '@/api/index';
import { messageApi } from '@/api/message-api';
import MyAvatarGroup from '@/components/common/box-chat/avatar/my-avatar-group';
import CustomizedMenus from '@/components/common/box-chat/menu/menu';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import useDebounce from '@/hooks/useDebounce';
import { PayLoadCreateSingle } from '@/models/index';
import { UserChatModel } from '@/models/user-chat-model';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import { removeAccents } from '@/ultis/index';
import { sortEnum } from '@/ultis/sort-enum';
import SearchIcon from '@mui/icons-material/Search';
import {
    Avatar,
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItemButton,
    MenuItem,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { AuthContext } from 'pages/contact';
import { useContext, useEffect, useState } from 'react';
export interface ISingleListBoxProps {}

export default function SingleListBox(props: ISingleListBoxProps) {
    const [listUser, setListUser] = useState<UserChatModel[]>([]);
    const [dataSearch, setDataSearch] = useState<string>('');
    const [listUserSearch, setListUserSearch] = useState<UserChatModel[]>([]);
    const [sort, setSort] = useState<string>('');
    const dataDebonce = useDebounce(dataSearch, 200);
    const { profile } = useContext(AuthContext);
    const router = useRouter();
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
        if (dataDebonce.trim().length > 0) {
            const data: UserChatModel[] = [];
            listUser.forEach((item) => {
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

    const handleCreateSingleChat = async (payload: PayLoadCreateSingle) => {
        // const data = await messageApi.createSingleChat(payload);
        // console.log(data.data);
        router.push(`/?idInvite=${payload.UserInvite}`);
    };

    return (
        <>
            <Stack flex={1} p={2}>
                <Typography variant="body2" color={'#e1e9f1'} pb={2}>
                    Bạn bè ({listUser.length})
                </Typography>
                <Stack p={2} sx={{ backgroundColor: '#212B36' }}>
                    <Stack>
                        <Stack direction={'row'} gap={2}>
                            <Search flex={1} sx={{ maxWidth: '700px' }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={dataSearch}
                                    onChange={(e) => setDataSearch(e.target.value)}
                                    fullWidth={true}
                                />
                            </Search>
                            <FormControl fullWidth sx={{ maxWidth: '200px' }}>
                                <InputLabel
                                    sx={{ '&[data-shrink="false"]': { top: '-7px' } }}
                                    id="demo-simple-select-label"
                                >
                                    {'Sort'}
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="sort"
                                    onChange={(e) => setSort(e.target.value)}
                                    sx={{
                                        color: '#fff',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e1e9f1',
                                        },
                                    }}
                                    size={'small'}
                                    variant="outlined"
                                >
                                    {Object.keys(sortEnum).map((key) => {
                                        return (
                                            <MenuItem key={key} value={key}>
                                                {sortEnum[key]}
                                            </MenuItem>
                                        );
                                    })}
                                    {/* <MenuItem value={'20'}>Twenty</MenuItem>
                                <MenuItem value={'30'}>Thirty</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Stack>

                        <List
                            sx={{
                                width: '100%',
                                overflow: 'auto',
                                height: 'calc(100vh - 204px)',
                            }}
                        >
                            {listUserSearch.map((user, index) => (
                                <Stack key={'user' + index}>
                                    <ListItemButton
                                        sx={{ gap: 2 }}
                                        onClick={() => {
                                            if (!user.ID || user.ID == profile.ID) return;
                                            handleCreateSingleChat({
                                                UserCreate: profile.ID,
                                                UserInvite: user.ID,
                                            });
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                user.Avatar ? BACKEND_DOMAIN_ERP + user.Avatar : ''
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
                                                    direction={'row'}
                                                    justifyContent={'space-between'}
                                                    alignItems={'center'}
                                                >
                                                    <Typography color={'#e1e9f1'}>
                                                        {user.Name}
                                                    </Typography>
                                                </Stack>
                                                {/* <Stack>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color={'#abb4d2'}
                                                        overflow="hidden"
                                                        textOverflow="ellipsis"
                                                        whiteSpace="nowrap"
                                                    >
                                                        {user.UserRoom?.length} thành viên
                                                    </Typography>
                                                </Stack> */}
                                            </Stack>
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
                                                        <MenuItem disableRipple>Phân loại</MenuItem>
                                                        <Divider sx={{ my: 0.5 }} />
                                                        <MenuItem disableRipple>
                                                            Xem thông tin
                                                        </MenuItem>

                                                        {/* <MenuItem disableRipple>Rời nhóm</MenuItem> */}
                                                    </CustomizedMenus>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </ListItemButton>
                                </Stack>
                            ))}
                        </List>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
