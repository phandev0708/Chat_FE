const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP || '';
import { UserChat } from '@/models/user-infor';
import {
    CreateUserVote,
    CreateVoteItem,
    UserVoteInfo,
    VoteInfo,
    VoteItemInfo,
} from '@/models/vote';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Avatar, AvatarGroup, Box, Checkbox, Divider, Stack, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../socket';
import { DetailVote } from './detail-vote';
import { TimeClow } from './time-clow';
export interface IVoteProps {
    votes: VoteInfo;
    countHuman: number;
    user: UserVoteInfo;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
export default function VoteComponent(props: IVoteProps) {
    const { socket }: any = useContext(SocketContext);
    const { votes, user, countHuman } = props;
    const [openDetailDialog, setOpenDetailDialog] = useState(false);

    // const [first, setfirst] = useState(second);

    const [data, setData] = useState<VoteItemInfo[]>(votes.VoteItems);
    const [dataCurrent, setDataCurrent] = useState<VoteItemInfo[]>(votes.VoteItems);
    const newUpdateMessage = useSelector((state: any) => {
        return state.updateMessage;
    });
    const [isDisableBtnVote, setIsDisableBtnVote] = useState<boolean>(true);
    useEffect(() => {
        setDataCurrent(data);
    }, [votes.VoteItems]);

    useEffect(() => {
        if (newUpdateMessage?.ChatID && newUpdateMessage.ChatID === votes.ChatId?.ID) {
            const newClone = data.map((item) => ({
                ...item,
                UserVotes: [...item.UserVotes],
            }));
            // console.log(newUpdateMessage, 'newUpdateMessage');
            const userVote: UserChat = newUpdateMessage?.UserVote;
            newClone.forEach((child) => {
                child.UserVotes = child.UserVotes?.filter(
                    (vote) => vote.UserCreate !== userVote.ID
                );
                newUpdateMessage?.Votes.forEach((voteItemId: string) => {
                    if (child.ID === voteItemId) {
                        child.UserVotes.unshift({
                            ID: voteItemId,
                            UserCreate: userVote.ID,
                            Avatar: userVote.Avatar,
                            Name: userVote.Name,
                        });
                    }
                });
            });
            const newCurrent = newClone.map((item) => ({
                ...item,
                UserVotes: [...item.UserVotes],
            }));
            setDataCurrent(newCurrent);
            // checkDifferent(newClone, dataCurrent)
            //     ? setIsDisableBtnVote(false)
            //     : setIsDisableBtnVote(true);
            setData(newClone);
        }
    }, [newUpdateMessage, votes?.RoomId.ID]);

    const [closeTimeVote, setCloseTimeVote] = useState(false);

    function checkDifferent(data: VoteItemInfo[], current: VoteItemInfo[]) {
        const result = data.some((item, index) => {
            return item.UserVotes?.length !== current[index].UserVotes?.length;
        });
        return result;
    }
    function toogleChecked(indexCheck: number, newClone: VoteItemInfo[], idVote: string) {
        if (votes.IsMultiVote) {
            const userVotes = newClone[indexCheck].UserVotes;
            const index = userVotes?.findIndex((item) => item.UserCreate === user.ID);
            if (index === -1) {
                userVotes?.unshift({
                    ID: idVote,
                    UserCreate: user.ID,
                    Avatar: user.Avatar,
                    Name: user.Name,
                });
            } else {
                userVotes?.splice(index, 1);
            }
        } else {
            newClone.forEach((item) => {
                item.UserVotes = item.UserVotes?.filter((vote) => vote.UserCreate !== user.ID);
            });

            newClone[indexCheck].UserVotes.unshift({
                ID: idVote,
                UserCreate: user.ID,
                Avatar: user.Avatar,
                Name: user.Name,
            });
        }
        checkDifferent(newClone, dataCurrent)
            ? setIsDisableBtnVote(false)
            : setIsDisableBtnVote(true);
    }
    const submitChoice = () => {
        const listVoteItem: CreateVoteItem[] = [];
        data.forEach((item) => {
            item.UserVotes.forEach((vote) => {
                if (vote.UserCreate === user.ID) {
                    listVoteItem.push({ VoteItemId: item.ID });
                }
            });
        });
        const payload: CreateUserVote = {
            ChatId: votes.ChatId?.ID,
            ListVoteItem: listVoteItem,
            UserCreate: user.ID,
        };
        // console.log(payload, 'payload');
        setIsDisableBtnVote(true);
        socket.emit('vote', payload);
    };

    return (
        <>
            <Stack alignItems={'center'}>
                <Card sx={{ maxWidth: 400, minWidth: 300, background: '#262e35' }}>
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14, fontWeight: 'bold' }}
                            color="rgba(255, 255, 255, 0.9)"
                            gutterBottom
                        >
                            {votes.Title}
                        </Typography>
                        <Stack pt={2}>
                            {data.map((item, index) => (
                                <Box pb={1} key={index}>
                                    <Stack
                                        sx={{ minHeight: '22px' }}
                                        direction={'row'}
                                        justifyContent={'space-between'}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: 12,
                                                fontWeight: 400,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {item.Title}
                                        </Typography>
                                        <AvatarGroup
                                            total={item.UserVotes?.length}
                                            sx={{
                                                '& .MuiAvatarGroup-avatar': {
                                                    width: 16,
                                                    height: 16,
                                                    fontSize: 10,
                                                },
                                            }}
                                        >
                                            {item.UserVotes?.slice(0, 5).map(
                                                (vote, indexAvatar) => (
                                                    <Avatar
                                                        key={indexAvatar}
                                                        src={BACKEND_DOMAIN_ERP + vote.Avatar}
                                                    />
                                                )
                                            )}
                                        </AvatarGroup>
                                    </Stack>
                                    <Stack component={'label'}>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <Checkbox
                                                disabled={
                                                    (votes?.VoteDeadline ? true : false) &&
                                                    closeTimeVote
                                                }
                                                icon={
                                                    votes.IsMultiVote ? (
                                                        <CheckBoxOutlineBlankIcon />
                                                    ) : (
                                                        <RadioButtonUncheckedIcon />
                                                    )
                                                }
                                                checkedIcon={
                                                    votes.IsMultiVote ? (
                                                        <CheckBoxIcon />
                                                    ) : (
                                                        <RadioButtonCheckedIcon />
                                                    )
                                                }
                                                checked={
                                                    item.UserVotes?.findIndex(
                                                        (vote) => vote.UserCreate === user.ID
                                                    ) !== -1
                                                    // ||
                                                    // listChoices.filter(
                                                    //     (choice) => choice.VoteItemId == item.ID
                                                    // ).length > 0
                                                }
                                                onClick={(e) => {
                                                    const newClone = data.map((item) => ({
                                                        ...item,
                                                        UserVotes: [...item.UserVotes],
                                                    }));
                                                    toogleChecked(index, newClone, item.ID);
                                                    setData(newClone);
                                                    // setData((prev) => {
                                                    //     toogleChecked(prev[index].UserVotes);
                                                    //     const newData = [...prev];
                                                    //     return newData;
                                                    // });
                                                }}
                                            />

                                            <Stack
                                                flex={1}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Tooltip
                                                    title={
                                                        item.UserVotes?.length +
                                                        '/' +
                                                        votes.SumUserRoom
                                                    }
                                                >
                                                    <BorderLinearProgress
                                                        sx={{ width: '100%' }}
                                                        variant="determinate"
                                                        value={
                                                            (item.UserVotes?.length /
                                                                votes.SumUserRoom) *
                                                            100
                                                        }
                                                    />
                                                </Tooltip>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ flexDirection: 'column' }}>
                        {votes?.VoteDeadline ? (
                            <Stack
                                sx={{
                                    width: '100%',
                                    mb: 1,
                                }}
                            >
                                <Stack
                                    sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                >
                                    <Typography sx={{ color: '#fff', fontSize: '13px' }}>
                                        {closeTimeVote ? 'Đã kết thúc vào' : 'Kết thúc vào'}:
                                    </Typography>
                                    <Typography sx={{ color: '#fff', fontSize: '13px' }}>
                                        {moment(new Date(votes?.VoteDeadline || new Date())).format(
                                            'DD-MM-YYYY hh:mm:ss'
                                        )}
                                    </Typography>
                                </Stack>
                                {closeTimeVote ? (
                                    <></>
                                ) : (
                                    <>
                                        <Divider />
                                        <Stack
                                            sx={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Typography sx={{ color: '#fff', fontSize: '13px' }}>
                                                Còn lại:
                                            </Typography>
                                            <TimeClow
                                                timeEnd={votes.VoteDeadline}
                                                endTimeVote={() => {
                                                    setCloseTimeVote(true);
                                                }}
                                            />
                                        </Stack>
                                    </>
                                )}
                            </Stack>
                        ) : (
                            <></>
                        )}

                        <Stack
                            sx={{
                                flexDirection: ' row',
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ mr: 1 }}
                                onClick={() => setOpenDetailDialog(true)}
                            >
                                Chi tiết
                            </Button>
                            <Stack
                                sx={{
                                    flexDirection: ' row',
                                    justifyContent: 'flex-end',
                                }}
                                display={votes?.VoteDeadline && closeTimeVote ? 'none' : 'flex'}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        mr: 1,
                                        display: user.ID == votes.UserCreate ? 'flex' : 'none',
                                    }}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    disabled={isDisableBtnVote}
                                    variant="contained"
                                    size="small"
                                    onClick={submitChoice}
                                >
                                    Gửi
                                </Button>
                            </Stack>
                        </Stack>
                    </CardActions>
                </Card>
            </Stack>
            <DetailVote
                open={openDetailDialog}
                votes={votes}
                data={dataCurrent}
                closeDialog={() => setOpenDetailDialog(false)}
            />
        </>
    );
}
