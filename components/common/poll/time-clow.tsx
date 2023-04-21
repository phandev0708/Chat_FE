import { getTimeText } from '@/ultis/index';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface ITimeClowProps {
    timeEnd: string;
    endTimeVote: () => void;
}

export function TimeClow(props: ITimeClowProps) {
    const { timeEnd, endTimeVote } = props;
    const [timer, setTimer] = useState<{ h: number; m: number; s: number }>({ h: 0, m: 0, s: 0 });
    useEffect(() => {
        const intervalId = setInterval(() => {
            const data = getTimeText(new Date(), new Date(timeEnd));
            setTimer(data);
            if (data.h + data.m + data.s <= 0) {
                endTimeVote();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <Typography sx={{ color: '#fff', fontSize: '13px' }}>
            {timer.h} Giờ {timer.m} phút {timer.s} giây
        </Typography>
    );
}
