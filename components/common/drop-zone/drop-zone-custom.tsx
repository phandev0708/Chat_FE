import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import {
    Dropzone,
    DropzoneProps,
    IMAGE_MIME_TYPE,
    MS_EXCEL_MIME_TYPE,
    MS_WORD_MIME_TYPE,
    PDF_MIME_TYPE,
    MS_POWERPOINT_MIME_TYPE,
    EXE_MIME_TYPE,
    MIME_TYPES,
} from '@mantine/dropzone';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Stack } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
export interface IDropZoneProps {}

export default function DropZoneCustom(props: Partial<DropzoneProps>) {
    return (
        <>
            <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                // max size 1gb
                maxSize={1024 * 1024 * 1024}
                accept={[
                    ...IMAGE_MIME_TYPE,
                    ...MS_WORD_MIME_TYPE,
                    ...MS_EXCEL_MIME_TYPE,
                    ...PDF_MIME_TYPE,
                    ...MS_POWERPOINT_MIME_TYPE,
                    ...EXE_MIME_TYPE,
                    MIME_TYPES.zip,
                    MIME_TYPES.mp4,
                    'application/x-rar-compressed',
                    'audio/mpeg',
                    'audio/mp3',
                ]}
                {...props}
            >
                <Group
                    position="center"
                    spacing="xl"
                    style={{ minHeight: rem(220), pointerEvents: 'none' }}
                >
                    <Dropzone.Accept>
                        <SendIcon fontSize="large" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <DoNotDisturbIcon fontSize="large" color="error" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <FileUploadIcon fontSize="large" />
                    </Dropzone.Idle>

                    <Stack>
                        <Text size="xl" inline>
                            Drag file here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 1gb
                        </Text>
                    </Stack>
                </Group>
            </Dropzone>
        </>
    );
}
