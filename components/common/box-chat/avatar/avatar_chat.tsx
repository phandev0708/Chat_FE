import { StyledBadge } from '@/styles/index';
import { Avatar } from '@mui/material';
export enum Status {
    online = 'online',
    offline = 'offline',
}
export interface IAvatarChatProps {
    status: Status;
    avatar?: string;
}

export default function AvatarChat(props: IAvatarChatProps) {
    const { status, avatar } = props;

    return (
        <>
            {status == Status.online ? (
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                    color={status === Status.online ? 'success' : 'warning'}
                >
                    <Avatar src={avatar} />
                </StyledBadge>
            ) : (
                <Avatar src={avatar} />
            )}
        </>
    );
}
