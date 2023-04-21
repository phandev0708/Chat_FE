const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
import { Mess } from '@/models/user-infor';
import {
    Avatar,
    IconButton,
    ImageList,
    ImageListItem,
    Link,
    Stack,
    Typography,
} from '@mui/material';

import ReplyIcon from '@mui/icons-material/Reply';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CustomizedMenus from '../menu/menu';

import Vote from '@/components/common/poll/vote-component';
import { getCurrentHouse } from '@/ultis/format-time';
import { statusMessage } from '@/ultis/global-function';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import { ExampleContext } from 'pages';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalShowImageFileChat from '../../dialog/view-image/view-image';
import LinkifyBlank from '../../linkify/linkify-blank';
import { SocketContext } from '../../socket';
import ReplyChat from '../reply-chat/reply-chat';

export interface IMessageProps {
    userName?: string;
    setMessReply: any;
    mess: Mess;
    isSeen: boolean;
    isOnline: boolean;
    isMeLastChat: boolean;
    isLastChat: boolean;
    totalHuman: number;
    handleOpenDialogShareMessage: () => void;
}
export default function Message(props: IMessageProps) {
    const {
        userName,
        setMessReply,
        mess,
        isSeen,
        isMeLastChat,
        isLastChat,
        isOnline,
        totalHuman,
        handleOpenDialogShareMessage,
    } = props;
    const [isDeleteMess, setIsDelete] = useState(!!mess.DeleteAt);
    const [statusMess, setStatusMess] = useState(mess.Status ? mess.Status : '');
    const { socket }: any = useContext(SocketContext);
    const { profile } = useContext(ExampleContext);
    const [openViewImage, SetOpenViewImage] = useState(false);
    const [imageView, setImageView] = useState('');
    const newDeleteMessage = useSelector((state: any) => {
        return state.deleteMessage;
    });
    // console.log('mess', mess);
    // console.log(profile, 'profile');
    useEffect(() => {
        if (newDeleteMessage?.ID && newDeleteMessage.ID === mess.ID) {
            // console.log('newDeleteMessage', newDeleteMessage);
            setIsDelete(true);
        }
    }, [newDeleteMessage]);

    useEffect(() => {
        if (isOnline) {
            setStatusMess('RECEIVED');
        }
    }, [isOnline]);
    const handleDelete = async () => {
        // console.log(idMess);
        if (mess.ID && socket) {
            socket.emit('delete-message', { chatId: mess.ID, UserDelete: profile?.ID });
        }
    };
    const handleCopy = async () => {
        //coppy message
        await navigator.clipboard.writeText(mess.Type === 'file' ? '' : mess?.Text);
    };
    const isMe = mess?.UserCreate === profile?.ID;
    const filterUser = (data: string) => {
        if (data) {
            const result = JSON.parse(data);
            // console.log('result', result);
            if (result.length > 0) {
                if (result.length > 3) {
                    return `${result[0].Name}, ${result[1].Name} và ${
                        result.length - 2
                    } người khác`;
                } else {
                    return result.length == 3
                        ? `${result[0].Name}, ${result[1].Name} và ${result[2].Name}`
                        : result.length == 2
                        ? `${result[0].Name} và ${result[1].Name}`
                        : `${result[0].Name}`;
                }
            } else {
                return 'ai đó vào nhóm!';
            }
        }
        return null;
    };
    return (
        <Stack direction={isMe ? 'row-reverse' : 'row'} columnGap={1}>
            {isDeleteMess ? (
                <Stack direction={isMe ? 'row' : 'row'} columnGap={1}>
                    <Avatar
                        alt="Avatar"
                        src={mess.Avatar ? BACKEND_DOMAIN_ERP + mess.Avatar : ''}
                    />
                    <Stack
                        gap={1}
                        sx={{
                            backgroundColor: '#36404a',
                            borderRadius: 3,
                            '&:hover #action-wrapper': {
                                visibility: 'visible',
                            },
                        }}
                        px={2}
                        py={3}
                        maxWidth={'500px'}
                        position={'relative'}
                    >
                        <Typography sx={{ color: 'white', wordWrap: 'break-word' }}>
                            Tin nhắn đã được thu hồi
                        </Typography>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ color: '#abb4d2' }} fontSize="small">
                                {getCurrentHouse(mess?.CreatedAt)}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            ) : mess.IsSystem ? (
                mess.Type == 'json' ? (
                    <Stack
                        sx={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#abb4d2',
                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecorationLine: 'underline',
                                },
                            }}
                            fontSize="small"
                        >
                            {!isMe ? userName : 'Bạn'}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#abb4d2',
                            }}
                            fontSize="small"
                        >
                            &nbsp;<LinkifyBlank text={mess.Text}></LinkifyBlank>
                        </Typography>
                        <Typography
                            sx={{
                                color: '#abb4d2',
                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecorationLine: 'underline',
                                },
                            }}
                            fontSize="small"
                        >
                            &nbsp;{filterUser(mess.ListUserJSON ? mess.ListUserJSON : '')}
                        </Typography>
                    </Stack>
                ) : (
                    <Stack
                        sx={{
                            width: '100%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#abb4d2',
                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecorationLine: 'underline',
                                },
                            }}
                            fontSize="small"
                        >
                            {!isMe ? userName : 'Bạn'}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#abb4d2',
                            }}
                            fontSize="small"
                        >
                            &nbsp; <LinkifyBlank text={mess.Text}></LinkifyBlank>
                        </Typography>
                    </Stack>
                )
            ) : (
                <Stack direction={isMe ? 'row' : 'row'} columnGap={1}>
                    <Avatar
                        alt="Avatar"
                        src={mess.Avatar ? BACKEND_DOMAIN_ERP + mess.Avatar : ''}
                    />
                    <Stack
                        gap={1}
                        sx={{
                            backgroundColor: '#36404a',
                            borderRadius: 3,
                            '&:hover #action-wrapper': {
                                visibility: 'visible',
                            },
                        }}
                        px={2}
                        py={3}
                        maxWidth={'500px'}
                        position={'relative'}
                    >
                        <Stack gap={2}>
                            {!isMe && <Typography color={'primary'}>{userName}</Typography>}
                            {(mess?.ChatReply?.Text ||
                                (mess.ChatReply?.files && mess.ChatReply?.files?.length > 0)) && (
                                <ReplyChat
                                    message={
                                        mess.ChatReply?.Type === 'file' ? '' : mess.ChatReply?.Text
                                    }
                                    name={
                                        mess.ChatReply?.UserCreate === profile?.ID
                                            ? 'Bạn'
                                            : mess.ChatReply.Name
                                    }
                                    listFile={mess.ChatReply?.files}
                                ></ReplyChat>
                            )}

                            <Typography sx={{ color: 'white', wordWrap: 'break-word' }}>
                                {mess.Type === 'file' ? (
                                    ''
                                ) : (
                                    <LinkifyBlank text={mess?.Text}></LinkifyBlank>
                                )}
                            </Typography>
                        </Stack>
                        {mess.Type == 'VOTE' && mess.Vote && (
                            <Vote
                                countHuman={totalHuman}
                                user={{
                                    ID: profile?.ID,
                                    UserCreate: profile?.UserCreate,
                                    Avatar: profile?.Avatar,
                                    Name: profile?.Name,
                                }}
                                votes={mess.Vote}
                            ></Vote>
                        )}

                        <ImageList
                            cols={
                                mess.files && mess.files.length > 4
                                    ? 3
                                    : mess.files
                                    ? mess.files?.length
                                    : 0
                            }
                            rowHeight={164}
                            sx={{
                                direction: isMe ? 'rtl' : 'initial',
                                gridAutoFlow: isMe ? 'dense' : 'initial',
                            }}
                        >
                            {mess.files !== undefined &&
                                mess.files.map((item, index) => {
                                    const extension = item.Path.split('.');
                                    const isImage = ['jpg', 'png', 'jpeg'].includes(
                                        extension[extension.length - 1]
                                    );
                                    return (
                                        <ImageListItem key={index}>
                                            {isImage ? (
                                                <Image
                                                    // check is image or file
                                                    src={BACKEND_DOMAIN + item.Path}
                                                    alt="Picture of the author"
                                                    width={400}
                                                    height={400}
                                                    style={{
                                                        objectFit: 'cover',
                                                        objectPosition: 'center',
                                                        width: 164,
                                                        height: 164,
                                                    }}
                                                    onClick={() => {
                                                        SetOpenViewImage(true);
                                                        setImageView(BACKEND_DOMAIN + item.Path);
                                                    }}
                                                />
                                            ) : (
                                                <Link href={BACKEND_DOMAIN + item.Path}>
                                                    <Image
                                                        // check is image or file
                                                        src={'/static/image/file.png'}
                                                        alt="Picture of the author"
                                                        width={400}
                                                        height={400}
                                                        style={{
                                                            objectFit: 'cover',
                                                            objectPosition: 'center',
                                                            width: 160,
                                                            height: 160,
                                                        }}
                                                    />
                                                </Link>
                                            )}
                                        </ImageListItem>
                                    );
                                })}
                        </ImageList>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Typography sx={{ color: '#abb4d2' }} fontSize="small">
                                {getCurrentHouse(mess?.CreatedAt)}
                            </Typography>
                            <Typography sx={{ color: '#abb4d2', pl: 2 }} fontSize="small">
                                {isMeLastChat &&
                                    isLastChat &&
                                    (isSeen ? 'Đã xem' : statusMessage(statusMess))}
                            </Typography>
                        </Stack>
                        <Stack
                            id={'action-wrapper'}
                            position={'absolute'}
                            left={isMe ? 'auto' : '100%'}
                            right={isMe ? '100%' : 'auto'}
                            height={'100%'}
                            top={0}
                            visibility={'hidden'}
                            justifyContent={'end'}
                        >
                            <Stack direction={'row'}>
                                <IconButton
                                    sx={{ color: 'white' }}
                                    onClick={() => setMessReply(mess)}
                                >
                                    <ReplyIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    sx={{ color: 'white' }}
                                    onClick={() => {
                                        handleOpenDialogShareMessage();
                                    }}
                                >
                                    <ShareIcon fontSize="small" />
                                </IconButton>
                                <CustomizedMenus>
                                    <MenuItem disableRipple onClick={handleCopy}>
                                        <ContentCopyIcon />
                                        Copy tin nhắn
                                    </MenuItem>
                                    <MenuItem disableRipple>
                                        <ShareIcon />
                                        Copy tin nhắn
                                    </MenuItem>
                                    <Divider sx={{ my: 0.5 }} />

                                    <MenuItem disableRipple>
                                        <PushPinIcon />
                                        Ghim tin nhắn
                                    </MenuItem>
                                    <MenuItem disableRipple>
                                        <StarIcon />
                                        Đánh dấu
                                    </MenuItem>
                                    {isMe && <Divider sx={{ my: 0.5 }} />}
                                    {isMe && (
                                        <MenuItem disableRipple onClick={handleDelete}>
                                            <DeleteIcon />
                                            Xóa
                                        </MenuItem>
                                    )}
                                </CustomizedMenus>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            )}
            <ModalShowImageFileChat
                close={() => {
                    SetOpenViewImage(false);
                    setImageView('');
                }}
                open={openViewImage}
                multi={false}
                imageShow={imageView}
            />
        </Stack>
    );
}
