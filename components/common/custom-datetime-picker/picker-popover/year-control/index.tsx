import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface YearControlPickerComponentProps {
    minTime?: Date | null;
    maxTime?: Date | null;
    timeChoose: Date | null;
    year: number;
    yearChange: (y: number) => void;
}

export const YearControlPickerComponent = (props: YearControlPickerComponentProps) => {
    const { maxTime, minTime, year, yearChange, timeChoose } = props;

    return (
        <Stack sx={{ width: '250px' }} spacing={1}>
            <Stack direction="row" alignItems="center">
                <Stack
                    sx={{ cursor: 'pointer', transform: 'rotate(180deg)' }}
                    onClick={() => {
                        yearChange(year - 20);
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
                        timeChoose ? timeChoose.getMonth() + 1 : ''
                    }/${timeChoose ? timeChoose.getFullYear() : ''}`}</Typography>
                </Stack>
                <Stack
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        yearChange(year + 20);
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
            <Box>
                {Array.from({ length: 20 }, (x, i) => {
                    const check = i - 10;
                    return (
                        <Box
                            key={`${i}-year-in-picker`}
                            sx={{
                                display: 'inline-block',
                                width: '25%',
                                padding: '10px',
                                margin: 0,
                                boxSizing: 'border-box',
                                cursor: 'pointer',
                                transition: 'all ease .5s',
                                backgroundColor: year === year + check ? '#0071bc' : 'transparent',
                                borderRadius: '5px',
                                color: year === year + check ? '#fff' : '#000',
                                '&:hover ': {
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                },
                            }}
                            onClick={() => yearChange(year + check)}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography
                                sx={{ textAlign: 'center', fontSize: '12px', fontWeight: 700 }}
                            >
                                {year ? year + check : ''}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Stack>
    );
};
