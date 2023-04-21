import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Dialog, Modal, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import Slider from 'react-slick';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

interface ModalShowImageFileChatProps {
    imageShow?: any;
    close: any;
    open: boolean;
    multi: boolean;
    iamgeList?: any;
}
export default function ModalShowImageFileChat(props: ModalShowImageFileChatProps) {
    const { imageShow, close, multi, open, iamgeList } = props;

    // multi
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = iamgeList?.length;
    const [sizeImage, setSizeImage] = useState(90);
    const [rotate, setRotate] = useState(0);
    if (multi) {
        const settings = {
            customPaging: () => {
                return (
                    <Stack className="dot">
                        <FiberManualRecordIcon sx={{ fontSize: '1rem' }} />
                    </Stack>
                );
            },
            dots: true,
            dotsClass: 'slick-dots slick-thumb',
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true,
                    },
                },
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true,
                    },
                },
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: true,
                    },
                },
            ],
        };
        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };
        const handleStepChange = (step: number) => {
            setActiveStep(step);
        };
        return (
            <Dialog
                open={open}
                onClose={() => {
                    close();
                }}
                fullWidth
                maxWidth={'md'}
            >
                <Stack sx={{ width: '100%' }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        <Typography>{iamgeList[activeStep].FileName}</Typography>
                    </Paper>
                    <Slider {...settings}>
                        {iamgeList.map((step: any, index: number) => (
                            <div key={index}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Stack
                                        component="img"
                                        sx={{
                                            width: '100%',
                                            height: '50vh',
                                            objectFit: 'cover',
                                        }}
                                        src={BACKEND_DOMAIN + step.Path}
                                        alt={step.FileName}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </Slider>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Tiếp theo
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Quay lại
                            </Button>
                        }
                    />
                </Stack>
            </Dialog>
        );
    } else {
        return (
            <Modal
                open={open}
                onClose={() => {
                    close();
                    setSizeImage(90);
                    setRotate(0);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                <Stack>
                    <Stack
                        sx={{
                            maxWidth: '90vw',
                            height: '90vh',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ position: 'fixed', top: 10, right: 10 }}
                            onClick={() => {
                                close();
                                setSizeImage(90);
                                setRotate(0);
                            }}
                        >
                            <CloseIcon />
                        </Button>
                        <Stack
                            sx={{
                                maxHeight: '90vh',
                                maxWidth: '90vw',
                                overflow: 'auto',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Stack
                                component="img"
                                src={imageShow}
                                alt={'photo'}
                                sx={{
                                    maxWidth: `${sizeImage}%`,
                                    maxHeight: `${sizeImage}vh`,
                                    transform: `rotate(${rotate}deg)`,
                                }}
                            ></Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ color: 'white' }}>{`${((sizeImage / 90) * 100).toFixed(
                            0
                        )}%`}</Typography>
                        <Stack
                            sx={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            gap={0.5}
                        >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => setSizeImage((pre) => pre + 10)}
                                sx={{ bgcolor: 'rgba(171, 180, 210, 0.3)' }}
                            >
                                <ZoomInIcon />
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => setSizeImage((pre) => (pre == 0 ? pre : pre - 10))}
                                sx={{ bgcolor: 'rgba(171, 180, 210, 0.3)' }}
                            >
                                <ZoomOutIcon />
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => setRotate((pre) => pre + 90)}
                                sx={{ bgcolor: 'rgba(171, 180, 210, 0.3)' }}
                            >
                                <RotateLeftIcon />
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => setRotate((pre) => pre - 90)}
                                sx={{ bgcolor: 'rgba(171, 180, 210, 0.3)' }}
                            >
                                <RotateRightIcon />
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
        );
    }
}
