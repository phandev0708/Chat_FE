import { Popover, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DateControlComponent } from './date-control';
import { TimeControlComponent } from './time-control';
import { YearControlPickerComponent } from './year-control';

interface PickerDateTimePopoverProps {
    anchorEl: HTMLDivElement | null;
    onclose: () => void;
    time: Date | null;
    timechange: (t: Date | null) => void;
    minTime?: Date | null;
    maxTime?: Date | null;
}

export const PickerDateTimePopover = (props: PickerDateTimePopoverProps) => {
    const { anchorEl, onclose, timechange, time, minTime, maxTime } = props;
    const [timeChoose, setTimeChoose] = useState<Date>(time ? new Date(time) : new Date());
    const [year, setYear] = useState<number>(timeChoose ? timeChoose.getFullYear() : 0);
    const [view, setView] = useState<'year' | 'month'>('month');

    useEffect(() => {
        if (time) {
            setTimeChoose(time ? new Date(time) : new Date());
        }
    }, [time]);

    useEffect(() => {
        if (timeChoose && timeChoose.getFullYear() !== year) {
            setYear(timeChoose.getFullYear());
        }
    }, [timeChoose]);

    useEffect(() => {
        if (timeChoose && timeChoose.getFullYear() !== year) {
            setTimeChoose(new Date(timeChoose.setFullYear(year)));
        }
    }, [year]);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={async () => {
                await onclose();
                if (time) {
                    setTimeChoose(time ? new Date(time) : new Date());
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Stack sx={{ padding: '10px' }} spacing={2}>
                <Stack sx={{ flex: 1 }} direction="row">
                    {view === 'month' ? (
                        <DateControlComponent
                            timeChoose={timeChoose}
                            maxTime={maxTime}
                            minTime={minTime}
                            timeChooseChangeDate={(date, month, year) => {
                                const currentChoose = timeChoose ? timeChoose : new Date();

                                // change date
                                const changeDate = new Date(currentChoose.setDate(date));

                                // change month
                                const changeMonth = new Date(changeDate.setMonth(month));

                                // change year
                                const changeyear = new Date(changeMonth.setFullYear(year));

                                setTimeChoose(changeyear);
                            }}
                        />
                    ) : (
                        <YearControlPickerComponent
                            timeChoose={timeChoose}
                            maxTime={maxTime}
                            minTime={minTime}
                            year={year}
                            yearChange={(y: number) => setYear(y)}
                        />
                    )}

                    {timeChoose ? (
                        <TimeControlComponent
                            timeChoose={timeChoose}
                            minTime={minTime}
                            maxTime={maxTime}
                            timeChooseChangeTime={(hour: number, minute: number) => {
                                const currentChoose = timeChoose ? timeChoose : new Date();

                                // change hour
                                const changeHour = new Date(currentChoose.setHours(hour));

                                // change minute
                                const changeMinute = new Date(changeHour.setMinutes(minute));

                                setTimeChoose(changeMinute);
                            }}
                        />
                    ) : (
                        <></>
                    )}
                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ position: 'relative' }}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Stack
                            sx={{
                                backgroundColor: '#0071bc',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all .3s ease',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#0071bc',
                                    boxShadow:
                                        'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
                                },
                            }}
                            onClick={() => setTimeChoose(new Date())}
                        >
                            <Typography sx={{ fontSize: '12px', fontWeight: '600' }}>
                                Hôm nay
                            </Typography>
                        </Stack>

                        <Tooltip title={view === 'year' ? 'Chọn tháng' : 'Chọn năm'}>
                            <Stack
                                sx={{
                                    backgroundColor: '#56595D40',
                                    width: '40px',
                                    height: '15px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    view === 'year' ? setView('month') : setView('year');
                                }}
                                alignItems={view === 'year' ? 'flex-end' : 'flex-start'}
                            >
                                <Stack
                                    sx={{
                                        backgroundColor: '#56595D',
                                        width: '15px',
                                        borderRadius: '10px',
                                        aspectRatio: '1/1',
                                    }}
                                ></Stack>
                            </Stack>
                        </Tooltip>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Stack
                            sx={{
                                border: '#0071bc 1px solid',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                transition: 'all .3s ease',
                                '&:hover': {
                                    boxShadow:
                                        'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
                                },
                            }}
                            onClick={() => onclose()}
                        >
                            <Typography sx={{ fontSize: '14px', color: '#0071bc' }}>
                                Đóng
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                backgroundColor: '#0071bc',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                transition: 'all .3s ease',
                                '&:hover': {
                                    backgroundColor: '#0071bc',
                                    boxShadow:
                                        'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;',
                                },
                            }}
                            onClick={() => {
                                timechange(timeChoose);
                                onclose();
                            }}
                            alignItems="center"
                        >
                            <Typography sx={{ fontSize: '14px', color: '#F0FAFF' }}>
                                Lưu thay đổi
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Popover>
    );
};
