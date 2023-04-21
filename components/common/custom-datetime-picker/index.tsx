import { Popover, Stack, Typography } from '@mui/material';
import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { PickerDateTimePopover } from './picker-popover';
import { getDateTime } from '@/ultis/global-function';
import CancelIcon from '@mui/icons-material/Cancel';

interface CustomDateTimePickerComponent {
    time: Date | null;
    setTime: (t: Date | null) => void;
    maxTime: () => Date | null | undefined;
    minTime: () => Date | null | undefined;
    disableResetTime?: boolean;
    size?: 'medium' | 'small';
}

export const CustomDateTimePickerComponent = (props: CustomDateTimePickerComponent) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const { time, setTime, maxTime, minTime, disableResetTime, size } = props;

    const max = maxTime();
    const min = minTime();

    return (
        <>
            <Stack
                sx={{
                    backgroundColor: 'transparent',
                    borderRadius: '5px',
                    border: '1px #A0ACBD solid',
                    padding: size === 'small' ? '5px 20px' : '10px 20px',
                    cursor: 'pointer',
                }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    sx={{ flex: 1 }}
                    onClick={(event: MouseEvent<HTMLDivElement>) =>
                        setAnchorEl(event.currentTarget)
                    }
                >
                    <Typography>{time ? getDateTime(time.toString()) : 'Chưa đặt'}</Typography>
                </Stack>

                {disableResetTime ? (
                    <></>
                ) : (
                    <Stack direction="row" alignItems="center">
                        {time ? (
                            <CancelIcon
                                onClick={() => setTime(null)}
                                sx={{
                                    fontSize: '20px',
                                    color: '#D0474F',
                                    cursor: 'pointer',
                                    mr: 1,
                                }}
                            />
                        ) : (
                            <></>
                        )}

                        <Image
                            onClick={(event: MouseEvent<HTMLDivElement>) =>
                                setAnchorEl(event.currentTarget)
                            }
                            src="/ico/date-time-svgrepo-com.svg"
                            width={24}
                            height={24}
                            alt="date-time-picker-icon"
                        />
                    </Stack>
                )}
            </Stack>
            <PickerDateTimePopover
                anchorEl={anchorEl}
                time={time}
                minTime={min}
                maxTime={max}
                onclose={() => setAnchorEl(null)}
                timechange={(t: Date | null) => setTime(t)}
            />
        </>
    );
};
