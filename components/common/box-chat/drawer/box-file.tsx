import { homeApi } from '@/api/home-api';
import { dataFileModel, fileInfo } from '@/models/image-model';
import { StyledAccordion } from '@/styles/Accodion/accodion-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import { AccordionDetails, AccordionSummary, Button, List, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ItemFile from '../../item/item-file';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IBoxFileProps {
    Files: dataFileModel;
    roomId: string;
}

export default function BoxFile({ Files, roomId }: IBoxFileProps) {
    const [listFile, setListFile] = useState<fileInfo[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        (async () => {
            if (!roomId || page == 1) return;
            const payload = {
                roomId: roomId,
                page: page.toString(),
                limit: '6',
            };
            const { data } = await homeApi.getFile(payload);
            setListFile((pre) => [...pre, ...data]);
        })();
    }, [page]);
    useEffect(() => {
        setListFile(Files?.data);
        setPage(Number(Files?.paginate?.page));
    }, [Files]);
    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>File</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ width: '100%', bgcolor: '#262626' }}>
                    {listFile &&
                        listFile.length > 0 &&
                        listFile?.map((item: any, i: number) => {
                            return (
                                <ItemFile name={''} size="112mb" time={'10h'} key={i}>
                                    {/* <Tooltip title={'Chia sẻ'} placement="top">
                                        <Button
                                            sx={{ color: 'white', minWidth: '20px' }}
                                            size="small"
                                        >
                                            <ShareIcon fontSize="small" />
                                        </Button>
                                    </Tooltip> */}
                                    <Tooltip title={'Download'} placement="top">
                                        <Button
                                            sx={{ color: 'white', minWidth: '20px' }}
                                            href={BACKEND_DOMAIN + item.Path}
                                        >
                                            <DownloadIcon fontSize="small" />
                                        </Button>
                                    </Tooltip>
                                </ItemFile>
                            );
                        })}
                </List>
                {listFile && listFile.length < Files?.paginate?.total && (
                    <Stack
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            pt: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            cursor: 'pointer',
                        }}
                        onClick={() => setPage((pre) => pre + 1)}
                    >
                        Xem thêm...
                    </Stack>
                )}
            </AccordionDetails>
        </StyledAccordion>
    );
}
