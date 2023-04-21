import { homeApi } from '@/api/home-api';
import { dataFileModel, fileInfo } from '@/models/image-model';
import { StyledAccordion } from '@/styles/Accodion/accodion-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, ImageList, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ModalShowImageFileChat from '../../dialog/view-image/view-image';
import ItemImage from './item-image';

export interface IBoxImageProps {
    Images: dataFileModel;
    roomId: string;
}

export default function BoxImage({ Images, roomId }: IBoxImageProps) {
    const [listImage, setListImage] = useState<fileInfo[]>([]);
    const [page, setPage] = useState(1);
    const [openViewImage, SetOpenViewImage] = useState(false);
    const [imageView, setImageView] = useState('');
    useEffect(() => {
        (async () => {
            if (!roomId || page == 1) return;
            const payload = {
                roomId: roomId,
                page: page.toString(),
                limit: '6',
            };
            const { data } = await homeApi.getImage(payload);
            setListImage((pre) => [...pre, ...data]);
        })();
    }, [page]);
    useEffect(() => {
        setListImage(Images?.data);
        setPage(Number(Images?.paginate?.page));
    }, [Images]);
    // console.log(imageView);
    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Hình Ảnh</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {listImage && listImage.length > 0 && (
                    <ImageList cols={3}>
                        {listImage?.map((item: any, index: number) => {
                            return (
                                <ItemImage
                                    item={item}
                                    key={index}
                                    setImageView={setImageView}
                                    SetOpenViewImage={SetOpenViewImage}
                                />
                            );
                        })}
                    </ImageList>
                )}
                {listImage && listImage.length < Images?.paginate?.total && (
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
            <ModalShowImageFileChat
                close={() => {
                    SetOpenViewImage(false);
                    setImageView('');
                }}
                open={openViewImage}
                multi={false}
                imageShow={imageView}
            />
        </StyledAccordion>
    );
}
