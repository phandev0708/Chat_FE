import { Stack, Typography } from '@mui/material';
import { formatNumber } from '@/ultis/global-function';
import { useEffect, useRef } from 'react';
interface PickerTimeControlHourProps {
    timeChoose: Date;
    onHourChange: (h: number) => void;
    isOverLimitTime: (h: number) => boolean;
}

export const PickerTimeControlHour = (props: PickerTimeControlHourProps) => {
    const { timeChoose, onHourChange, isOverLimitTime } = props;

    const crollTarget = useRef<HTMLDivElement | null>(null);
    const isChoose = (h: number) => {
        return timeChoose.getHours() === h;
    };

    useEffect(() => {
        if (crollTarget && crollTarget.current) {
            crollTarget.current.scrollTop = (timeChoose.getHours() - 2) * 40;
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
                        cursor: 'pointer',
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
                            length: 24,
                        },
                        (_, i) => i
                    ).map((v) => (
                        <Stack
                            alignItems="center"
                            key={`${v}-hours-picsker`}
                            sx={{
                                padding: '10px 10px',
                                transition: 'all ease .3s',
                                borderBottom: '1px solid black',
                                scrollSnapAlign: 'center',
                                color: isChoose(v) ? '#fff' : '#000',
                                tabIndex: isChoose(v) ? 0 : 'unset',
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
                                    onHourChange(v);
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
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Giờ</Typography>
            </Stack>
        </Stack>
    );
};
