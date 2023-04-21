import { Stack, Typography } from '@mui/material';
import { PickerTimeControlHour } from './hour';
import { PickerTimeControlMinute } from './minute';

interface TimeControlComponentProps {
    timeChoose: Date;
    minTime?: Date | null;
    maxTime?: Date | null;
    timeChooseChangeTime: (hour: number, minute: number) => void;
}

export const TimeControlComponent = (props: TimeControlComponentProps) => {
    const { timeChoose, timeChooseChangeTime, minTime, maxTime } = props;

    const isOverLimitMinTime = (hour: number, minute: number, type: 'hour' | 'minute') => {
        if (minTime && timeChoose) {
            if (type === 'minute') {
            }

            const d =
                type === 'minute'
                    ? new Date(
                          timeChoose.getFullYear(),
                          timeChoose.getMonth(),
                          timeChoose.getDate(),
                          hour,
                          minute + 1,
                          0,
                          0
                      )
                    : new Date(
                          timeChoose.getFullYear(),
                          timeChoose.getMonth(),
                          timeChoose.getDate(),
                          hour + 1,
                          minute,
                          0,
                          0
                      );

            return minTime.getTime() > d.getTime();
        } else {
            return false;
        }
    };

    const isOverLimitMaxTime = (hour: number, minute: number) => {
        if (maxTime && timeChoose) {
            const d = new Date(
                timeChoose.getFullYear(),
                timeChoose.getMonth(),
                timeChoose.getDate(),
                hour,
                minute,
                0,
                0
            );

            return maxTime.getTime() < d.getTime();
        } else {
            return false;
        }
    };

    const isOverLimitTime = (hour: number, minute: number, type: 'hour' | 'minute') => {
        return isOverLimitMinTime(hour, minute, type) || isOverLimitMaxTime(hour, minute);
    };

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
            direction="row"
            sx={{ margin: '0px 20px', width: '100px' }}
        >
            <PickerTimeControlHour
                timeChoose={timeChoose}
                isOverLimitTime={(h: number) => isOverLimitTime(h, timeChoose.getMinutes(), 'hour')}
                onHourChange={(h: number) => {
                    timeChooseChangeTime(h, timeChoose.getMinutes());
                }}
            />
            {/* ------------------------ */}
            <PickerTimeControlMinute
                timeChoose={timeChoose}
                isOverLimitTime={(m: number) => isOverLimitTime(timeChoose.getHours(), m, 'minute')}
                onMinuteChange={(m: number) => {
                    timeChooseChangeTime(timeChoose.getHours(), m);
                }}
            />
        </Stack>
    );
};
