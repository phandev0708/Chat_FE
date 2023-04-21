import { introImages } from '@/mocks/index';
import { Box, Button, MobileStepper, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export interface IIntroChatProps {}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export function IntroChat(props: IIntroChatProps) {
    const theme = useTheme();
    const images = introImages;
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };
    return (
        <Stack
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                background: '#262626',
                height: '100%',
                width: '100%',
            }}
        >
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    color: '#fff',
                    bgcolor: 'transparent',
                }}
            >
                <Typography sx={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold' }}>
                    {images[activeStep].label}
                </Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                // style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Stack
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    // maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                    margin: '20px 0',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                    background: 'transparent',
                    '& .MuiMobileStepper-dot': {
                        mx: '3px',
                    },
                }}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{ mx: 2 }}
                    >
                        Kế Tiếp
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ mx: 2 }}
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Quay Lại
                    </Button>
                }
            />
        </Stack>
    );
}
