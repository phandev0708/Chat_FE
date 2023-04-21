import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import {
    Avatar,
    Card,
    CardContent,
    Divider,
    IconButton,
    InputBase,
    Stack,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { Configuration, OpenAIApi } from 'openai';
import React, { useEffect, useRef, useState } from 'react';
import HeaderAIChat from './header-ai-chat';
import { InProcessLoading } from './inprocess-loading';
// import dotenv from 'dotenv';

// dotenv.config();

export interface IChatAIProps {}

interface IChatAI {
    ID?: string;
    IsAI: boolean;
    Text: string | undefined;
    CreateAt: Date;
}

const configuration = new Configuration({
    organization: process.env.NEXT_PUBLIC_ORGANIZATION,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export function ChatAI(props: IChatAIProps) {
    const [message, setMessage] = useState('');
    const [dataChat, setDataChat] = useState<IChatAI[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        setMessage('');
        const myChat: IChatAI = {
            ID: new Date().getTime().toString(),
            IsAI: false,
            Text: message,
            CreateAt: new Date(),
        };

        setDataChat((pre) => [...pre, myChat]);

        setIsLoading(true);
        setTimeout(async () => {
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            });

            setIsLoading(false);

            const aiChat: IChatAI = {
                ID: completion.data.id,
                IsAI: true,
                Text: completion.data.choices[0].message?.content,
                CreateAt: new Date(),
            };
            setDataChat((pre) => [...pre, aiChat]);
        }, 0);
    };

    const handleEnter = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            await handleSendMessage();
        }
    };

    useEffect(() => {
        scrollToBottom();
        return () => {};
    }, [dataChat]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Stack sx={{ width: '100%', height: '100%', background: '#262626' }}>
            <HeaderAIChat
                title={'Oryza AI Chat'}
                avatar={'/gif/ai.gif'}
                onRefresh={() => {
                    setDataChat([]);
                }}
            />
            <Stack
                sx={{
                    flex: 1,
                    p: '20px',
                    overflowY: 'auto',
                    height: '100%',
                    maxHeight: 'calc(100vh - 121px)',
                }}
                ref={messagesEndRef}
            >
                {dataChat.map((x) => {
                    return (
                        <Stack
                            key={x?.ID ? x.ID : new Date().getTime().toString()}
                            sx={{
                                width: '100%',
                                alignItems: x.IsAI ? 'flex-start' : 'flex-end',
                                mb: 2,
                            }}
                        >
                            {x.IsAI ? (
                                <>
                                    <Stack sx={{ flexDirection: 'row' }}>
                                        <Avatar src={'/gif/ai.gif'} />
                                        <Typography sx={{ color: '#fff', ml: 1 }}>
                                            Oryza AI Chat
                                        </Typography>
                                    </Stack>
                                    <Card sx={{ ml: '44px', maxWidth: '60%', width: '100%' }}>
                                        <CardContent sx={{ p: '15px', pb: '15px !important' }}>
                                            <InputBase
                                                sx={{
                                                    color: '#000',

                                                    whiteSpace: 'normal',
                                                }}
                                                value={x.Text}
                                                disabled
                                                fullWidth
                                                multiline
                                            />
                                            <Typography
                                                sx={{
                                                    textAlign: 'right',
                                                    fontSize: '13px',
                                                    color: '#56595D',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                {moment(new Date(x.CreateAt)).format('hh:mm:ss')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </>
                            ) : (
                                <>
                                    <Stack
                                        sx={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            width: '60%',
                                        }}
                                    >
                                        <Card sx={{ ml: 1 }}>
                                            <CardContent sx={{ p: '15px', pb: '15px !important' }}>
                                                <Typography sx={{ color: '#000' }}>
                                                    {x.Text}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '13px',
                                                        color: '#56595D',
                                                        textAlign: 'end',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    {moment(new Date(x.CreateAt)).format(
                                                        'hh:mm:ss'
                                                    )}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                </>
                            )}
                        </Stack>
                    );
                })}
                {isLoading ? <InProcessLoading /> : <></>}
            </Stack>
            <Stack
                sx={{ backgroundColor: '#1E1E1E', borderRadius: 1 }}
                alignItems={'center'}
                direction={'row'}
                py={1}
                px={2}
            >
                <InputBase
                    sx={{ flex: 1, color: '#fff', py: 0.8 }}
                    placeholder="Nhập câu hỏi của bạn..."
                    inputProps={{ 'aria-label': 'Nhập câu hỏi của bạn...' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleEnter}
                />
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Stack direction={'row'} gap={1}>
                        <IconButton sx={{ backgroundColor: 'transparent' }}>
                            <MicIcon sx={{ fontSize: 20, color: '#fff' }}></MicIcon>
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
        </Stack>
    );
}
