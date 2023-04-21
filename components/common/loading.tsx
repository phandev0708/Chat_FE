import { Stack, CircularProgress } from '@mui/material';
import * as React from 'react';

export interface ICircleLoadingProps {
    open: boolean;
}

export default function CircleLoading(props: ICircleLoadingProps) {
    const { open } = props;
    return (
        <Stack
            sx={{
                display: open ? 'flex' : 'none',
                position: 'fixed',
                background: '#030E1680',
                width: '100vW',
                height: '100vh',
                top: 0,
                left: 0,
                zIndex: 999999999999999999,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'radial-gradient(circle, #030E1680, #ffffff10, #030E1680)',
            }}
        >
            <Stack
                sx={{
                    position: 'relative',
                    backgroundColor: 'transparent',
                }}
            >
                <CircularProgress size={70} sx={{ color: '#fff' }} />
                {/* <Stack
                    sx={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <svg
                        width="32"
                        height="30"
                        viewBox="0 0 32 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.3833 22.0036V28.6703M1.3833 25.337H6.18216C6.8551 25.337 7.19156 25.337 7.48001 25.2262C7.73479 25.1284 7.96165 24.9695 8.14066 24.7635C8.34332 24.5302 8.45831 24.214 8.68828 23.5816L11.3833 16.1703M23.05 19.5036L25.9444 20.9509C26.6899 21.3236 27.0626 21.51 27.4298 21.5209C27.7534 21.5305 28.0727 21.4457 28.3489 21.2768C28.6623 21.0851 28.8935 20.7384 29.3558 20.0449L29.7077 19.5171C30.2868 18.6484 30.5763 18.2141 30.6107 17.7823C30.6409 17.4032 30.5405 17.0251 30.3262 16.7109C30.0821 16.353 29.6152 16.1196 28.6815 15.6527L28.05 15.337M2.81644 8.7135L5.93493 3.36751C6.38558 2.59496 6.61091 2.20869 6.93398 1.99441C7.21834 1.8058 7.55374 1.70903 7.89487 1.71715C8.28244 1.72637 8.67891 1.93323 9.47185 2.34694L22.6306 9.21239C23.8763 9.8623 24.4991 10.1873 24.7416 10.6476C24.9534 11.0497 24.9917 11.5208 24.8479 11.9519C24.6832 12.4454 24.1211 12.8669 22.9971 13.7099L17.7018 17.6815C17.2232 18.0404 16.9839 18.2199 16.7179 18.3055C16.4828 18.3812 16.2337 18.4036 15.9888 18.3712C15.7119 18.3346 15.4443 18.2008 14.9092 17.9333L3.92728 12.4423C3.04251 11.9999 2.60013 11.7787 2.35888 11.4383C2.14686 11.1392 2.0394 10.7785 2.05315 10.4121C2.06879 9.99517 2.31801 9.56795 2.81644 8.7135Z"
                            stroke="white"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Stack> */}
            </Stack>
        </Stack>
    );
}
