import { VoteInfo, VoteItemInfo } from '@/models/vote';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Switch,
    Typography,
    Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP || '';
import moment from 'moment';

export interface IDetailVoteProps {
    open: boolean;
    votes: VoteInfo;
    data: VoteItemInfo[];
    closeDialog: () => void;
}

export function DetailVote(props: IDetailVoteProps) {
    const { open, votes, closeDialog, data } = props;
    // console.log('votes detail', votes);

    const handleClickOpen = () => {
        closeDialog();
    };
    const handleClose = () => {
        closeDialog();
    };
    let totalVote = 0;
    data.map((x) => {
        totalVote += x.UserVotes.length;
    });

    const [isShowHidden, setIsShowHidden] = useState(false);
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ fontSize: '18px' }}>
                Kết quả bình chọn: <strong>{votes.Title}</strong>
                <Divider />
                <Stack sx={{ my: 1 }}>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Thời gian tạo: </Typography>
                        <Typography variant="body2">
                            {moment(new Date(votes.CreatedAt)).format('DD-MM-YYYY hh:mm:ss')}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            display: votes?.VoteDeadline ? 'flex' : 'none',
                        }}
                    >
                        <Typography variant="body2">Thời gian kết thúc: </Typography>
                        <Typography variant="body2">
                            {moment(new Date(votes?.VoteDeadline || new Date())).format(
                                'DD-MM-YYYY hh:mm:ss'
                            )}
                        </Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Tổng lượt bình chọn: </Typography>
                        <Typography variant="body2">{totalVote} lượt</Typography>
                    </Stack>
                </Stack>
                <Divider />
            </DialogTitle>
            <DialogContent sx={{ minWidth: '450px', maxHeight: '50vh', overflowY: 'auto' }}>
                {data.map((x) => {
                    return (
                        <Accordion
                            key={x.ID}
                            sx={{
                                display:
                                    x.UserVotes.length > 0
                                        ? 'block'
                                        : isShowHidden
                                        ? 'block'
                                        : 'none',
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Stack
                                    sx={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }}>{x.Title}</Typography>
                                    <Typography variant="body2">
                                        {x.UserVotes.length}/{votes.SumUserRoom}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                {x.UserVotes.map((u) => {
                                    return (
                                        <Stack
                                            key={u.ID}
                                            sx={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            <Stack
                                                sx={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    key={u.ID}
                                                    src={BACKEND_DOMAIN_ERP + u.Avatar}
                                                    sx={{ width: '25px', height: '25px' }}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        ml: 1,
                                                    }}
                                                >
                                                    {u?.Name}
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ fontSize: '14px' }}>
                                                {moment(
                                                    new Date(
                                                        u.UpdatedAt
                                                            ? u.UpdatedAt?.toString()
                                                            : new Date()
                                                    )
                                                ).format('DD-MM-YYYY hh:mm:ss')}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Stack
                    sx={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}
                >
                    <Tooltip title={'Hiển thị các bình chọn không có bình chọn?'}>
                        <Switch
                            checked={isShowHidden}
                            onClick={() => setIsShowHidden(!isShowHidden)}
                        />
                    </Tooltip>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{ background: '##56595D', color: '#fff' }}
                    >
                        Đóng
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
