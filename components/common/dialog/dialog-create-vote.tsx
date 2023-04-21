import { ChatMess, GroupChat } from '@/models/user-infor';
import { UserChat } from '@/models/user-model';
import { VoteCreate } from '@/models/vote';
import { StyledInputBaseNotPL } from '@/styles/search/search-style';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
    FormControlLabel,
    IconButton,
    InputBase,
    InputLabel,
    Stack,
    Switch,
    useMediaQuery,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { enqueueSnackbar } from 'notistack';
import { ExampleContext } from 'pages';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../socket';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import { CustomDateTimePickerComponent } from '../custom-datetime-picker';
export interface IDialogCreateVoteProps {
    open: boolean;
    onCloseModal: () => void;
    inforUser: GroupChat;
    listUser: UserChat[];
}

export default function DialogCreateVote(props: IDialogCreateVoteProps) {
    const { open, onCloseModal, inforUser, listUser } = props;
    const theme = useTheme();
    const { socket }: any = useContext(SocketContext);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [title, setTitle] = useState('');
    const [dataChoice, setDataChoice] = useState<any[]>([]);
    const [multiChoice, setMultiChoice] = useState(false);
    const [isEndTime, setIsEndTime] = useState(false);
    const [endTime, setEndTime] = useState<Date>(new Date());
    const { profile } = useContext(ExampleContext);

    const handleAddChoice = (e: any) => {
        setDataChoice(['', ...dataChoice]);
    };
    const handleRemoveChoice = (i: number) => {
        setDataChoice((data) => {
            const newData = [...data];
            newData.splice(i, 1);
            return newData;
        });
    };
    const handleClose = () => {
        onCloseModal();
        setDataChoice([]);
        setTitle('');
    };

    const handleSendMessage = async () => {
        if (title.trim() === '' || dataChoice.length === 0) {
            if (title.trim() === '') {
                enqueueSnackbar('Vui lòng điền tên vote!', { variant: 'error' });
            }
            if (dataChoice.length === 0) {
                enqueueSnackbar('Vui lòng tạo các lựa chọn!', { variant: 'error' });
            }
            return;
        }

        let votePayload: VoteCreate;
        if (isEndTime) {
            votePayload = {
                IsMultiVote: multiChoice,
                Title: title,
                VoteItem: dataChoice.map((res) => {
                    return { Title: res };
                }),
                SumUserRoom: listUser.length,
                VoteDeadline: isEndTime ? endTime.toString() : undefined,
            };
        } else {
            votePayload = {
                IsMultiVote: multiChoice,
                Title: title,
                VoteItem: dataChoice.map((res) => {
                    return { Title: res };
                }),
                SumUserRoom: listUser.length,
            };
        }

        // console.log(filePayload);
        const payload: ChatMess = {
            Text: '',
            Type: 'VOTE',
            UserCreate: profile?.ID,
            RoomId: inforUser?.ChatRoom?.ID,
            files: [],
            Vote: votePayload,
        };
        if (socket) socket.emit('chat', payload);
        setDataChoice([]);
        setTitle('');
        setMultiChoice(false);
        onCloseModal();
    };

    useEffect(() => {
        return () => {
            setDataChoice([]);
            setTitle('');
            setMultiChoice(false);
            onCloseModal();
            setIsEndTime(false);
            setEndTime(new Date());
        };
    }, []);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            sx={{
                '& .MuiPaper-root': {
                    // background: 'black',
                    // color: 'white',
                    md: { minWidth: '400px' },
                },
            }}
        >
            <DialogTitle id="responsive-dialog-title">{'Thăm dò ý kiến'}</DialogTitle>
            <DialogContent sx={{ minHeight: '50vh' }}>
                <InputLabel sx={{ display: 'flex', flexDirection: 'column' }}>
                    {'Câu hỏi'}
                    <InputBase
                        placeholder="Bạn muốn thăm do ý kiến về gì?"
                        inputProps={{ 'aria-label': 'search' }}
                        value={title}
                        onChange={(e) => {
                            const { value } = e.target;
                            setTitle(value);
                        }}
                    />
                </InputLabel>

                <FormControlLabel
                    sx={{
                        display: 'flex',
                        pt: 1,
                    }}
                    control={
                        <Switch
                            checked={multiChoice}
                            onChange={(e) => setMultiChoice(e.target.checked)}
                            color="secondary"
                        />
                    }
                    label="Cho phép người dùng chọn nhiều lựa chọn"
                />
                <FormControlLabel
                    sx={{
                        display: 'flex',
                        pb: 2,
                    }}
                    control={
                        <Switch
                            checked={isEndTime}
                            onChange={(e) => setIsEndTime(e.target.checked)}
                            color="secondary"
                        />
                    }
                    label="Giới hạn thời gian lựa chọn"
                />
                {isEndTime ? (
                    <CustomDateTimePickerComponent
                        time={endTime}
                        setTime={function (t: Date | null): void {
                            if (t) {
                                setEndTime(t);
                            }
                        }}
                        maxTime={function (): Date | null | undefined {
                            return null;
                        }}
                        minTime={function (): Date | null | undefined {
                            return null;
                        }}
                    />
                ) : (
                    <></>
                )}

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                        sx={{ width: '100%' }}
                        format="DD/MM/YYYY HH:mm:ss"
                        minDateTime={dayjs()}
                        // slotProps={{
                        //     rightArrowIcon: <EventIcon />,
                        // }}
                    />
                </LocalizationProvider> */}
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{ pt: 1 }}
                >
                    <Typography variant="subtitle1" component="h6">
                        Lựa chọn
                    </Typography>
                    <IconButton color="success" onClick={handleAddChoice}>
                        <AddIcon />
                    </IconButton>
                </Stack>
                <Stack sx={{ maxHeight: '240px', overflowY: 'auto' }}>
                    {dataChoice.map((item, index) => {
                        return (
                            <Stack
                                key={'choice' + index}
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <StyledInputBaseNotPL
                                    key={index}
                                    placeholder="Nhập lựa chọn"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={item}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setDataChoice((data) => {
                                            const newData = [...data];
                                            newData[index] = value;
                                            return newData;
                                        });
                                    }}
                                    fullWidth
                                />
                                <IconButton color="error" onClick={() => handleRemoveChoice(index)}>
                                    <ClearIcon fontSize="small"></ClearIcon>
                                </IconButton>
                            </Stack>
                        );
                    })}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Hủy
                </Button>
                <Button
                    sx={{ backgroundColor: '#262e35' }}
                    variant="contained"
                    onClick={handleSendMessage}
                >
                    Tạo
                </Button>
            </DialogActions>
        </Dialog>
    );
}
