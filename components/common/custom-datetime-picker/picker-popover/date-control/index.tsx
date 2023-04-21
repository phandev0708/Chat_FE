import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CalendarPicker } from './calendar';

interface DateControlComponentProps {
    timeChooseChangeDate: (date: number, month: number, year: number) => void;
    timeChoose: Date | null;
    minTime?: Date | null;
    maxTime?: Date | null;
}

export const DateControlComponent = (props: DateControlComponentProps) => {
    const { timeChooseChangeDate, timeChoose, minTime, maxTime } = props;

    const [pickerTime, setPicker] = useState<Date>(new Date());

    useEffect(() => {
        if (
            timeChoose &&
            (pickerTime.getMonth() !== timeChoose.getMonth() ||
                pickerTime.getFullYear() !== timeChoose.getFullYear())
        ) {
            const time = timeChoose.getTime();

            const date = new Date(time);
            setPicker(date);
        } 
        // return () => {
        //     setPicker(new Date());
        // };
    }, [timeChoose]);

    const isOverLimitMinTime = (date: number) => {
        if (minTime && pickerTime) {
            const d = new Date(
                pickerTime.getFullYear(),
                pickerTime.getMonth(),
                date + 1,
                0,
                0,
                0,
                0
            );

            return minTime.getTime() > d.getTime();
        } else {
            return false;
        }
    };

    const isOverLimitMaxTime = (date: number) => {
        if (maxTime && pickerTime) {
            const d = new Date(pickerTime.getFullYear(), pickerTime.getMonth(), date, 0, 0, 0, 0);

            return maxTime.getTime() < d.getTime();
        } else {
            return false;
        }
    };

    const isOverLimitTime = (date: number) => {
        return isOverLimitMinTime(date) || isOverLimitMaxTime(date);
    };

    return (
        <Stack alignItems="center" sx={{ width: '250px' }}>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ padding: '0px 20px', width: '100%' }}
                spacing={1}
            >
                <Stack
                    sx={{ cursor: 'pointer', transform: 'rotate(180deg)' }}
                    onClick={() => {
                        setPicker(new Date(pickerTime.setMonth(pickerTime.getMonth() - 1)));
                    }}
                >
                    <Image
                        src="/ico/arrow-right-bold.svg"
                        width={18}
                        height={18}
                        alt="arrow-picker"
                    />
                </Stack>
                <Stack sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>{`${
                        pickerTime.getMonth() + 1
                    }/${pickerTime.getFullYear()}`}</Typography>
                </Stack>
                <Stack
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        setPicker(new Date(pickerTime.setMonth(pickerTime.getMonth() + 1)));
                    }}
                >
                    <Image
                        src="/ico/arrow-right-bold.svg"
                        width={18}
                        height={18}
                        alt="arrow-picker"
                    />
                </Stack>
            </Stack>

            <CalendarPicker
                pickerTime={pickerTime}
                timeChoose={timeChoose}
                timeChooseChangeDate={(date: number, month: number, year: number) =>
                    timeChooseChangeDate(date, month, year)
                }
                isOverLimitTime={(d: number) => isOverLimitTime(d)}
            />
        </Stack>
    );
};
