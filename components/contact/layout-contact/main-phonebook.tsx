import { Search, SearchIconWrapper, StyledInputBase, TabStyle } from '@/styles/index';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, List, Stack, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DialogCreateGroup from '../../common/box-chat/create-room/dialog-create-group';
import GroupsIcon from '@mui/icons-material/Groups';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import TabPanel from '../../common/tab-panel/tab-panel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MainBoxConTact from './main-box-contact';
import GroupListBox from '../list-group/group-list-box';
import SingleListBox from '../list-group/single-list-box';
import { homeApi } from '@/api/index';
import { sortEnum } from '@/ultis/sort-enum';
import { useAuth } from '@/hooks/auth-hook';
import { AuthContext } from 'pages/contact';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export interface ILeftPhonebookProps {}

export default function MainPhonebook(props: ILeftPhonebookProps) {
    const [value, setValue] = useState(1);
    const [groupList, setGroupList] = useState<any[]>([]);
    // const { profile } = useAuth();
    const { profile } = useContext(AuthContext);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useEffect(() => {
        (async () => {
            const { data } = await homeApi.getAllGroupChatSort(sortEnum.NAME_ASC);
            setGroupList(data);
        })();
    }, [profile?.CompanyId?.ID]);

    return (
        <>
            <Stack sx={{ height: '100vh', width: '100%' }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#393939',
                        display: 'flex',
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        {/* <TabStyle
                            icon={<PeopleIcon />}
                            label="Danh sách bạn bè"
                            {...a11yProps(0)}
                        />
                        <TabStyle
                            icon={<PeopleIcon />}
                            label="Danh sách bạn bè"
                            {...a11yProps(1)}
                        /> */}
                        <Stack pb={2}>
                            <Typography
                                variant={'h5'}
                                color={'#e1e9f1'}
                                px={2}
                                pt={2}
                                role="tabpanel"
                            >
                                Phonebook
                            </Typography>
                        </Stack>

                        <TabStyle
                            icon={<PeopleIcon />}
                            label="Danh sách bạn bè"
                            {...a11yProps(0)}
                        />
                        <TabStyle icon={<GroupsIcon />} label="Danh sách nhóm" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={1}>
                        <MainBoxConTact title={'Danh sách bạn bè'} icon={undefined}>
                            <SingleListBox></SingleListBox>
                        </MainBoxConTact>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MainBoxConTact title={'Danh sách nhóm'} icon={undefined}>
                            <GroupListBox groupList={groupList}></GroupListBox>
                        </MainBoxConTact>
                    </TabPanel>
                </Box>
            </Stack>
        </>
    );
}
