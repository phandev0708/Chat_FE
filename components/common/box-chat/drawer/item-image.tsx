import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/system';
import Image from 'next/image';
import CustomizedMenus from '../menu/menu';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import { convertToPng, handleCopyPng } from '@/ultis/global-function';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;

export interface IItemImageProps {
    item: any;
    setImageView: any;
    SetOpenViewImage: any;
}

export default function ItemImage({ item, setImageView, SetOpenViewImage }: IItemImageProps) {
    const handleCopy = async () => {
        const blob = await fetch(BACKEND_DOMAIN + item.Path).then((response) => response.blob());
        if (blob.type !== 'image/png') {
            convertToPng(blob);
        } else {
            handleCopyPng(blob);
        }
    };

    const downloadImage = async () => {
        const response = await fetch(item.Path);
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'image/jpeg' }); // chỉ định loại file ảnh cần tải xuống
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = item.FileName;
        link.click();
    };

    return (
        <ImageListItem>
            <Image
                src={
                    item.Path
                        ? `${BACKEND_DOMAIN + item.Path}?w=164&h=164&fit=crop&auto=format`
                        : ''
                }
                alt="Picture of the author"
                width={500}
                height={500}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    height: '100px',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    setImageView(item.Path ? BACKEND_DOMAIN + item.Path : '');
                    SetOpenViewImage(true);
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
                    justifyContent: 'center',
                }}
                position="top"
                actionIcon={
                    <Stack direction={'row'}>
                        <IconButton sx={{ color: 'white' }}>
                            <ShareIcon fontSize="small" />
                        </IconButton>
                        {/* <IconButton sx={{ color: 'white' }}>
                <MoreVertIcon fontSize="small" />
            </IconButton> */}
                        <CustomizedMenus>
                            <MenuItem disableRipple onClick={handleCopy}>
                                <ContentCopyIcon />
                                Copy
                            </MenuItem>
                            <MenuItem disableRipple onClick={downloadImage}>
                                <DownloadIcon />
                                Download
                            </MenuItem>
                        </CustomizedMenus>
                    </Stack>
                }
                actionPosition="left"
            />
        </ImageListItem>
    );
}
