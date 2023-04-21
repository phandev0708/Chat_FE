import { formatNumber } from '@/ultis/global-function';
import { Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

interface PickerTimeControlMinuteProps {
    timeChoose: Date;
    onMinuteChange: (m: number) => void;
    isOverLimitTime: (h: number) => boolean;
}

export const PickerTimeControlMinute = (props: PickerTimeControlMinuteProps) => {
    const { onMinuteChange, timeChoose, isOverLimitTime } = props;

    const crollTarget = useRef<HTMLDivElement | null>(null);
    const isChoose = (m: number) => {
        return timeChoose.getMinutes() === m;
    };

    useEffect(() => {
        if (crollTarget && crollTarget.current) {
            crollTarget.current.scrollTop = (timeChoose.getMinutes() - 3) * 40;
        }
    }, []);

    return (
        <Stack
            sx={{
                flex: 1,
                height: '100%',
            }}
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            <Stack flex={1} alignItems="center" justifyContent="center">
                <Stack
                    sx={{
                        maxHeight: '180px',
                        overflow: 'auto',
                        scrollBehavior: 'smooth',
                        border: '#A0ACBD 1px solid',
                        whiteSpace: 'nowrap',
                        scrollSnapType: 'y mandatory',

                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    ref={crollTarget}
                >
                    {Array.from(
                        {
                            length: 60,
                        },
                        (_, i) => i
                    ).map((v) => (
                        <Stack
                            alignItems="center"
                            key={`${v}-hours-picsker`}
                            sx={{
                                padding: '10px',
                                height: '40px',
                                maxHeight: '40px',
                                transition: 'all ease .3s',
                                scrollSnapAlign: 'center',
                                borderBottom: '1px solid black',
                                color: isChoose(v) ? '#fff' : '#000',
                                cursor: isOverLimitTime(v) ? 'default' : 'pointer',
                                backgroundColor: isOverLimitTime(v)
                                    ? '#A0ACBD'
                                    : isChoose(v)
                                    ? '#0071bc'
                                    : '#fff',
                                '&:hover ': isOverLimitTime(v)
                                    ? {}
                                    : {
                                          color: '#000',
                                          backgroundColor: '#007DC0aa',
                                      },
                            }}
                            onClick={() => {
                                if (isOverLimitTime(v)) {
                                } else {
                                    onMinuteChange(v);
                                }
                            }}
                        >
                            <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                                {formatNumber(v)}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
            <Stack>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Phút</Typography>
            </Stack>
        </Stack>
    );
};
