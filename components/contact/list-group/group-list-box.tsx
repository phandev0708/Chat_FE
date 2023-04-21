import { homeApi } from '@/api/index';
import MyAvatarGroup from '@/components/common/box-chat/avatar/my-avatar-group';
import CustomizedMenus from '@/components/common/box-chat/menu/menu';
import { avatarMock } from '@/mocks/index';
import { Group, GroupChat } from '@/models/user-infor';
import { sortEnum } from '@/ultis/sort-enum';
import {
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
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '@/styles/index';
import useDebounce from '@/hooks/useDebounce';
import { removeAccents } from '@/ultis/index';

export interface IGroupListBoxProps {
    groupList: any[];
}

export default function GroupListBox(props: IGroupListBoxProps) {
    const { groupList } = props;
    const [dataSearch, setDataSearch] = useState<string>('');
    const [listUserSearch, setListUserSearch] = useState<any[]>([]);
    const [sort, setSort] = useState<string>('');
    const dataDebonce = useDebounce(dataSearch, 200);

    useEffect(() => {
        if (dataDebonce.trim().length > 0) {
            let searchDebonce = removeAccents(dataDebonce.toLowerCase().trim());
            const data: any[] = [];
            groupList.forEach((item) => {
                if (
                    item.ChatRoom?.RoomName &&
                    removeAccents(item.ChatRoom?.RoomName.toLowerCase().trim()).indexOf(
                        searchDebonce
                    ) !== -1
                ) {
                    data.push(item);
                }
            });
            setListUserSearch(data);
        } else {
            setListUserSearch(groupList);
        }
    }, [dataDebonce, groupList]);
    return (
        <Stack flex={1} p={2}>
            <Typography variant="body2" color={'#e1e9f1'} pb={2}>
                Nhóm({groupList.length})
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
                        {listUserSearch.map((group, index) => (
                            <Stack key={'group' + index}>
                                <ListItemButton sx={{ gap: 2 }}>
                                    <MyAvatarGroup
                                        listUser={group.UserRoom}
                                        avatar={group.ChatRoom?.RoomImage}
                                    ></MyAvatarGroup>
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
                                                    {group.ChatRoom?.RoomName}
                                                </Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color={'#abb4d2'}
                                                    overflow="hidden"
                                                    textOverflow="ellipsis"
                                                    whiteSpace="nowrap"
                                                >
                                                    {group.UserRoom?.length} thành viên
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack>
                                            <Stack
                                                direction={'row'}
                                                alignItems={'center'}
                                                justifyContent={'end'}
                                            >
                                                <CustomizedMenus>
                                                    <MenuItem disableRipple>Phân loại</MenuItem>
                                                    <Divider sx={{ my: 0.5 }} />
                                                    <MenuItem disableRipple>Rời nhóm</MenuItem>
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
    );
}
