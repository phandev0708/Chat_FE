import { Link } from '@mui/material';
import Linkify from 'react-linkify';

export interface ILinkifyBlankProps {
    text: string;
}

export default function LinkifyBlank(props: ILinkifyBlankProps) {
    return (
        <Linkify
            componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
                <Link
                    href={decoratedHref}
                    key={key}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                        color: '#0071bc',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {decoratedText}
                </Link>
            )}
        >
            {props.text}
        </Linkify>
    );
}
