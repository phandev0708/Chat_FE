import { LayoutProps } from '@/models/index';
import { Box, Container, Stack } from '@mui/material';
import * as React from 'react';

export function EmptyLayout({ children }: LayoutProps) {
    const [height, setHeight] = React.useState(700);

    React.useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        // }
        <div
            style={{
                // height: `${8000000}px`,

                maxHeight: '100vh',
                width: '100%',
                overflowY: 'scroll',
            }}
        >
            {/* <HeaderHome /> */}

            {children}
            {/* <Footer /> */}
        </div>
    );
}
