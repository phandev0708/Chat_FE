import { Box, Stack, Typography } from '@mui/material';
import { getNumDateInMonth } from '@/ultis/global-function';

interface CalendarPickerProps {
    pickerTime: Date;
    timeChoose: Date | null;
    timeChooseChangeDate: (date: number, month: number, year: number) => void;
    isOverLimitTime: (d: number) => boolean;
}

export const CalendarPicker = (props: CalendarPickerProps) => {
    const { pickerTime, timeChooseChangeDate, timeChoose, isOverLimitTime } = props;

    const isTimeChoose = (date: number) => {
        if (timeChoose) {
            const month = pickerTime.getMonth();
            const year = pickerTime.getFullYear();

            return (
                timeChoose.getDate() === date &&
                timeChoose.getMonth() === month &&
                timeChoose.getFullYear() === year
            );
        } else {
            return false;
        }
    };

    const isCurrentTime = (date: number) => {
        const d = new Date();

        const month = pickerTime.getMonth();
        const year = pickerTime.getFullYear();

        return d.getDate() === date && d.getMonth() === month && d.getFullYear() === year;
    };

    const getFirstDayInMonth = () => {
        return new Date(pickerTime.getFullYear(), pickerTime.getMonth());
    };
    return (
        <Stack sx={{ width: '100%' }}>
            <Stack direction="row">
                {['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'].map((v) => {
                    return (
                        <Stack
                            sx={{ width: `${(1 / 7) * 100}%` }}
                            key={`${v}-header-calendar-picker`}
                            alignItems="center"
                        >
                            <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>{v}</Typography>
                        </Stack>
                    );
                })}
            </Stack>
            <Box>
                {Array.from(
                    {
                        length:
                            getNumDateInMonth(pickerTime.getMonth(), pickerTime.getFullYear()) +
                            getFirstDayInMonth().getDay(),
                    },
                    (_, i) => i - getFirstDayInMonth().getDay() + 1
                ).map((v) => {
                    if (v <= 0) {
                        return (
                            <Stack
                                sx={{
                                    width: `${(1 / 7) * 100}%`,
                                    display: 'inline-block',
                                    padding: '0px 5px',
                                    boxSizing: 'border-box',
                                }}
                                key={`${v}-item-calendar-picker`}
                            >
                                <Stack
                                    sx={{
                                        aspectRatio: '1/1',
                                        borderRadius: '30px',
                                    }}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography
                                        sx={{
                                            color: 'transparent',
                                            fontSize: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {'previuos'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        );
                    } else {
                        return (
                            <Stack
                                sx={{
                                    width: `${(1 / 7) * 100}%`,
                                    display: 'inline-block',
                                    padding: '2px',
                                    boxSizing: 'border-box',
                                }}
                                onClick={() => {
                                    if (isOverLimitTime(v)) {
                                    } else {
                                        timeChooseChangeDate(
                                            v,
                                            pickerTime.getMonth(),
                                            pickerTime.getFullYear()
                                        );
                                    }
                                }}
                                key={`${v}-item-calendar-picker`}
                            >
                                <Stack
                                    sx={{
                                        backgroundColor: isOverLimitTime(v)
                                            ? '#A0ACBD'
                                            : isTimeChoose(v)
                                            ? '#0071bc'
                                            : '#EFFAFF',
                                        border: isCurrentTime(v)
                                            ? '1px solid #007DC0'
                                            : '1px solid #BDA5AD',
                                        aspectRatio: '1/1',
                                        borderRadius: '30px',
                                        cursor: isOverLimitTime(v) ? 'default' : 'pointer',
                                        transition: 'all ease .3s',
                                        '&:hover ': isOverLimitTime(v)
                                            ? {}
                                            : {
                                                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                                                  backgroundColor: '#007DC0aa',
                                                  color: '#EFFAFF',
                                                  border: '1px solid #EFFAFF',
                                              },
                                    }}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            color: isTimeChoose(v) ? '#fff' : '#000',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {v}
                                    </Typography>
                                </Stack>
                            </Stack>
                        );
                    }
                })}
            </Box>
        </Stack>
    );
};
