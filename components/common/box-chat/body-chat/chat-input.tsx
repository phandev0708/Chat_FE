import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItemButton,
    Menu,
    Stack,
} from '@mui/material';
import Image from 'next/image';

import { SocketContext } from '@/components/common/socket/socket-custome';
import { UpdateChat } from '@/models/chat-model';
import { profile } from '@/models/profile';
import { UserMentionModel } from '@/models/user-chat-model';
import { ChatMess, GroupChat, Mess } from '@/models/user-infor';
import { UserChat } from '@/models/user-model';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import PollIcon from '@mui/icons-material/Poll';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { ExampleContext, UserRoleContext } from 'pages';
import { useContext, useEffect, useRef, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import DialogCreateVote from '../../dialog/dialog-create-vote';
import DropZoneCustom from '../../drop-zone/drop-zone-custom';
import ReplyChat from '../reply-chat/reply-chat';

const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IChatInputProps {
    inforUser: GroupChat;
    messReply: Mess | null;
    setMessReply: any;
    lastChatId: string | undefined;
    listUser: UserChat[];
    listUserRead: profile[];
}

export default function ChatInput({
    inforUser,
    messReply,
    setMessReply,
    lastChatId,
    listUser,
    listUserRead,
}: IChatInputProps) {
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const { profile } = useContext(ExampleContext);
    const { socket }: any = useContext(SocketContext);
    const [open, setOpen] = useState(false);
    const [openFile, setOpenFile] = useState<File[]>([]);
    const [showDrag, setShowDrag] = useState(false);
    const [openVote, setOpenVote] = useState(false);
    const { profileUserInGroup } = useContext(UserRoleContext);
    const mentionsInputRef: any = useRef(null);
    const [usersModel, setUsersModel] = useState<UserMentionModel[]>([]);

    const [anchorRefEmoji, setanchorRefEmoji] = useState<null | HTMLElement>(null);
    const openEmoji = Boolean(anchorRefEmoji);
    const handleClickEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
        setanchorRefEmoji(event.currentTarget);
    };
    const handleCloseEmoji = () => {
        setanchorRefEmoji(null);
    };
    useEffect(() => {
        let userMap: UserMentionModel[] = listUserRead.map((user) => {
            return {
                id: user.ID,
                display: user?.Name,
                avatar: user?.Avatar,
            };
        });
        // remove me in list user
        userMap = userMap.filter((item) => item.id !== profile?.ID);
        // add first user to
        userMap.unshift({
            id: 'ALL',
            display: 'Mọi người',
        });
        setUsersModel(userMap);
    }, [listUserRead]);

    const handleChangeMessage = (e: any) => {
        // if delete text one mention
        if (e.target.value.length < message.length && message.length - e.target.value.length > 1) {
            setMessage(e.target.value);
            const mentionData = extractMentions(e.target.value);
            if (mentionData.length > 0) {
                const mentionDataCurrent = extractMentions(message);
                const mentionDataDelete = mentionDataCurrent.filter((item) => {
                    return !mentionData.some((item2) => item2.id === item.id);
                });
                let userMap: UserMentionModel[] = [];
                mentionDataDelete.forEach((item) => {
                    const user = listUserRead.find((user) => user.ID === item.id);
                    if (user) {
                        userMap.push({
                            id: user.ID,
                            display: user?.Name,
                            avatar: user?.Avatar,
                        });
                    } else if (item.id === 'ALL') {
                        userMap.unshift({
                            id: 'ALL',
                            display: 'Mọi người',
                        });
                    }
                });

                setUsersModel((prev) => {
                    return [...userMap, ...prev];
                });
            }
        } else {
            setMessage(e.target.value);
        }
    };
    // console.log(message, 'message2');
    const extractMentions = (text: string) => {
        const mentionData: any[] = [];
        const regex = /\@\[(.*?)\]\((.*?)\)/g;
        let match = regex.exec(text);
        while (match) {
            const display = match[1];
            const id = match[2];
            mentionData.push({ id, display });
            match = regex.exec(text);
        }

        return mentionData;
    };
    const renderSuggestion = (suggestion: any) => {
        const itemContent = suggestion.display;

        return (
            <ListItemButton
                sx={{
                    '&:focus': {
                        backgroundColor: '#e6f7ff',
                    },
                    gap: 1,
                }}
            >
                <Stack sx={{ borderRadius: '100rem', overflow: 'hidden', minWidth: 30 }}>
                    {!(suggestion.id === 'ALL') ? (
                        suggestion.avatar ? (
                            <Image
                                src={BACKEND_DOMAIN_ERP + suggestion.avatar}
                                alt="Picture of the room"
                                width={200}
                                height={200}
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: 30,
                                    height: 30,
                                    cursor: 'pointer',
                                }}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    width: 30,
                                    height: 30,
                                }}
                            ></Avatar>
                        )
                    ) : (
                        <AlternateEmailIcon />
                    )}
                </Stack>
                <Typography>{itemContent}</Typography>
            </ListItemButton>
        );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSendDropZone = () => {
        let type = 'file';

        const filePayload: any = [];
        openFile.forEach((file) => {
            const name = file.name;
            filePayload.push({ name: name, file: file });
        });
        console.log(filePayload);
        // console.log(filePayload);
        const payload: ChatMess = {
            Text: '',
            Type: type,
            UserCreate: profile?.ID,
            RoomId: inforUser?.ChatRoom?.ID,
            files: filePayload,
            ReplyChatId: messReply?.ID,
        };
        // console.log(inforUser, 'inforUser');
        if (socket) socket.emit('chat', payload);
        setOpenFile([]);
        handleClose();
    };
    const handleClose = () => {
        setOpen(false);
        setShowDrag(false);
    };
    const readChat = () => {
        if (lastChatId !== profile.ID) {
            const idCompany = profile?.CompanyId?.ID;
            if (idCompany && profile.ID && inforUser?.ChatRoom?.ID) {
                const payloadUpdate: UpdateChat = {
                    RoomId: inforUser?.ChatRoom?.ID,
                    UserCreate: profile.ID,
                };
                if (socket) {
                    socket.emit('read-message', payloadUpdate);
                }
            }
        }
    };

    useEffect(() => {
        setMessage('');
        setMessReply(null);
        setFiles([]);
        setOpenFile([]);
    }, [inforUser.UserChat?.ID, inforUser.ChatRoom?.ID]);
    function onPasteImage(e: React.ClipboardEvent) {
        const clipboardItems = e.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item: any) {
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            return;
        }
        const blobs: File[] = [];
        for (let i = 0; i < items.length; i++) {
            const item: any = items[i];
            blobs.push(item.getAsFile());
        }

        setFiles((files) => [...files, ...blobs]);
    }
    //handle remove image
    function handleRemoveImage(index: number) {
        const newFiles = [...files];
        newFiles.splice(index, 1);

        setFiles(newFiles);
    }
    //event enter
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
            e.preventDefault();
        }
    };
    function handleRemoveOpenFile(index: number) {
        const newFiles = [...openFile];

        newFiles.splice(index, 1);
        setOpenFile(newFiles);
    }

    const handleSendMessage = async () => {
        const value = mentionsInputRef.current.value;
        if (value.trim() === '' && message.trim() === '' && files.length === 0) {
            return;
        }
        let type = 'text';
        if (files.length > 0 && value.trim() === '') {
            type = 'file';
        }
        if (files.length > 0 && value.trim() !== '') {
            type = 'file-text';
        }

        const filePayload: any = [];
        files.forEach((file) => {
            const type = file.type;
            filePayload.push({ type: type, file: file });
        });

        const payload: ChatMess = {
            Text: value,
            Type: type,
            UserCreate: profile?.ID,
            RoomId: inforUser?.ChatRoom?.ID,
            files: filePayload,
            ReplyChatId: messReply?.ID,
            MentionList: extractMentions(message),
        };
        // console.log(payload);
        // console.log(inforUser, 'inforUser');
        if (socket) socket.emit('chat', payload);
        setFiles([]);
        setMessage('');
        setOpenFile([]);
        setOpen(false);
        setMessReply(null);
    };
    const handleClearReply = () => {
        setMessReply(null);
    };
    return (
        <Box
            sx={{ backgroundColor: '#262626', p: 2 }}
            onDrag={(e) => {
                setShowDrag(true);
                console.log('drag');
            }}
            onDragEnter={(e) => {
                setShowDrag(true);
                console.log('drag enter');
            }}
            onDragLeave={(e) => {
                if (e.target !== e.currentTarget) {
                    setShowDrag(false);
                    console.log('drag leave');
                }
            }}
            position="relative"
            display={
                inforUser?.ChatRoom.IsGroup
                    ? !inforUser.ChatRoom.IsOnlyAdminChat
                        ? 'box'
                        : profileUserInGroup.IsAdminGroup
                        ? 'box'
                        : 'none'
                    : 'box'
            }
        >
            <Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Gửi file</DialogTitle>
                    <DialogContent>
                        <DropZoneCustom
                            onDrop={(acceptedFiles) => {
                                setOpenFile((openFile) => [...openFile, ...acceptedFiles]);
                            }}
                        ></DropZoneCustom>
                        <Stack>
                            <ImageList cols={8}>
                                {openFile.map((file, index) => (
                                    <ImageListItem key={index}>
                                        <Image
                                            // check is image or file
                                            src={`${
                                                file.type.includes('image')
                                                    ? URL.createObjectURL(file)
                                                    : '/static/image/file.png'
                                            }`}
                                            alt="Picture of the author"
                                            width={400}
                                            height={400}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                width: '100%',
                                                height: '100px',
                                            }}
                                        />
                                        <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                '& .MuiImageListItemBar-titleWrap': {
                                                    display: 'none',
                                                },
                                                justifyContent: 'right',
                                            }}
                                            position="top"
                                            actionPosition="left"
                                            actionIcon={
                                                <Stack direction={'row'}>
                                                    <IconButton
                                                        sx={{ color: 'white' }}
                                                        onClick={() => handleRemoveOpenFile(index)}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSendDropZone}>Gửi</Button>
                    </DialogActions>
                </Dialog>
                <DialogCreateVote
                    open={openVote}
                    onCloseModal={function (): void {
                        setOpenVote(false);
                    }}
                    inforUser={inforUser}
                    listUser={listUser}
                ></DialogCreateVote>
                <ImageList cols={6}>
                    {files.map((blob: any, index) => (
                        <ImageListItem key={index}>
                            <Image
                                src={`${URL.createObjectURL(blob)}`}
                                alt="Picture of the author"
                                width={400}
                                height={400}
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: '100%',
                                    height: '100px',
                                }}
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    '& .MuiImageListItemBar-titleWrap': {
                                        display: 'none',
                                    },
                                    justifyContent: 'right',
                                }}
                                position="top"
                                actionPosition="left"
                                actionIcon={
                                    <Stack direction={'row'}>
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                {messReply && (
                    <Box mb={1} position={'relative'}>
                        <ReplyChat
                            message={
                                !messReply?.Text && messReply.Type != 'text'
                                    ? 'File đính kèm'
                                    : messReply?.Text
                            }
                            name={
                                messReply?.UserCreate === profile?.ID
                                    ? 'Trả lời'
                                    : 'Trả lời ' + messReply.Name
                            }
                            listFile={messReply?.files}
                        ></ReplyChat>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                background: '#c8cde1',
                                width: '30px',
                                height: '30px',
                                '&:hover': {
                                    opacity: 0.8,
                                    background: 'red',
                                    color: '#fff',
                                },
                            }}
                            onClick={handleClearReply}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}

                <Stack
                    sx={{ backgroundColor: '#1E1E1E', borderRadius: 1 }}
                    alignItems={'center'}
                    direction={'row'}
                    py={1}
                    px={2}
                >
                    {/* <InputBase
                        sx={{ flex: 1, color: '#fff', py: 0.8 }}
                        placeholder="Type something.."
                        onPaste={onPasteImage}
                        inputProps={{ 'aria-label': 'Type something..' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onClick={readChat}
                    /> */}
                    <MentionsInput
                        value={message}
                        onChange={handleChangeMessage}
                        style={{
                            border: 'none',
                            height: '50px',
                            flex: 1,
                        }}
                        className="ssky-mention-input"
                        placeholder={
                            inforUser?.ChatRoom.IsGroup
                                ? 'Nhập tin nhắn, @ để tag tên...'
                                : 'Nhập tin nhắn...'
                        }
                        inputRef={mentionsInputRef}
                        onPaste={onPasteImage}
                        onKeyPress={handleKeyPress}
                        onClick={readChat}
                    >
                        <Mention
                            trigger="@"
                            data={usersModel}
                            displayTransform={(id, display) => `@${display}`}
                            renderSuggestion={(
                                suggestion,
                                search,
                                highlightedDisplay,
                                index,
                                focused
                            ) => (inforUser.ChatRoom.IsGroup ? renderSuggestion(suggestion) : null)}
                            onAdd={(id, display) => {
                                setUsersModel((usersModel) => {
                                    return usersModel.filter((user) => {
                                        return user.id !== id;
                                    });
                                });
                            }}
                        />
                    </MentionsInput>
                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                        <Stack direction={'row'} gap={1}>
                            <IconButton
                                sx={{ backgroundColor: 'transparent' }}
                                id="basic-button"
                                aria-controls={openEmoji ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openEmoji ? 'true' : undefined}
                                onClick={handleClickEmoji}
                            >
                                <InsertEmoticonIcon
                                    sx={{ fontSize: 20, color: '#fff' }}
                                ></InsertEmoticonIcon>
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorRefEmoji}
                                open={openEmoji}
                                onClose={handleCloseEmoji}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{
                                    '& .MuiList-root ': {
                                        padding: 0,
                                        backgroundColor: '#1E1E1E',
                                    },
                                    mb: 2,
                                }}
                            >
                                <Picker
                                    data={data}
                                    onEmojiSelect={(emojiObject: any) => {
                                        setMessage(message + emojiObject.native);
                                    }}
                                    locale="vi"
                                    theme="dark"
                                />
                            </Menu>

                            <IconButton sx={{ backgroundColor: 'transparent' }}>
                                <MicIcon sx={{ fontSize: 20, color: '#fff' }}></MicIcon>
                            </IconButton>
                            {inforUser?.ChatRoom?.IsGroup && (
                                <IconButton
                                    sx={{ backgroundColor: 'transparent' }}
                                    onClick={() => setOpenVote(true)}
                                >
                                    <PollIcon sx={{ fontSize: 20, color: '#fff' }}></PollIcon>
                                </IconButton>
                            )}

                            <IconButton
                                sx={{ backgroundColor: 'transparent' }}
                                onClick={handleClickOpen}
                            >
                                <AttachFileIcon
                                    sx={{ fontSize: 20, color: '#fff' }}
                                ></AttachFileIcon>
                            </IconButton>
                        </Stack>
                        <Divider sx={{ height: 28 }} orientation="vertical" />
                        <Avatar
                            sx={{ backgroundColor: '#684D4D', cursor: 'pointer' }}
                            onClick={handleSendMessage}
                        >
                            <SendIcon sx={{ fontSize: 20 }}></SendIcon>
                        </Avatar>
                    </Stack>
                </Stack>
                <Stack
                    sx={{ display: showDrag ? 'flex' : 'none' }}
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                >
                    <Dropzone
                        accept={IMAGE_MIME_TYPE}
                        onDrop={(acceptedFiles) => {
                            console.log(files);
                            setFiles((f) => [...files, ...acceptedFiles]);
                            setShowDrag(false);
                        }}
                        onReject={(rejectedFiles) => {
                            console.log(rejectedFiles);
                            setShowDrag(false);
                        }}
                        sx={{ flex: 1, width: '100%', height: '100%' }}
                    >
                        <Typography align="center">Drop images here</Typography>
                    </Dropzone>
                </Stack>
            </Box>
        </Box>
    );
}
