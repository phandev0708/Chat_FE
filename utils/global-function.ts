import { enqueueSnackbar } from 'notistack';
import { online } from '@/redux/socket/online-offile';
import axios from 'axios';
import https from 'https';
import * as crypto from 'crypto';

export async function urlExists(url: string): Promise<boolean> {
    try {
        const response = await axios.head(url, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getUserData = (idUser: string, listUser: any[]) => {
    const ids = listUser.map((u: any) => u.ID);

    const index = ids.indexOf(idUser);

    return listUser[index];
};

export const checkSeenChat = (userInGroupChat: any[], idMe: string, listMess: any) => {
    if (userInGroupChat.length > 0 && idMe) {
        for (let i = 0; i < userInGroupChat.length; i++) {
            const element = userInGroupChat[i];
            const read_time = new Date(element.UpdatedAt);
            const message_time = new Date(listMess[listMess.length - 1]?.CreatedAt);
            if (element.UserId !== idMe && read_time > message_time) {
                return true;
            }
        }
        return false;
    }

    return false;
};

export const checkOnline = (
    userInGroupChat: any[],
    socket: { ID: string; online: string },
    userChat: string
) => {
    let online = false;
    if (socket.online == 'online' && userInGroupChat.length > 0) {
        for (let i = 0; i < userInGroupChat.length; i++) {
            const element = userInGroupChat[i];
            if (element.UserId == socket.ID && element.UserId != userChat) {
                online = true;
                break;
            }
        }
    }
    return online;
};

export const statusMessage = (Status: string) => {
    switch (Status) {
        case 'SENT':
            return 'Đã gửi';
        case 'SEEN':
            return 'Đã xem';
        default:
            return 'Đã nhận';
    }
};

export const getDateTime = (a: string | null) => {
    const d = a ? new Date(a) : new Date();

    return `${formatNumber(d.getHours())}:${formatNumber(d.getMinutes())} ${formatNumber(
        d.getDate()
    )}/${formatNumber(d.getMonth() + 1)}/${formatNumber(d.getFullYear())}`;
};

export const formatNumber = (n: number | string) => {
    return parseInt(n.toString()) > 9 ? `${parseInt(n.toString())}` : `0${parseInt(n.toString())}`;
};

export const getNumDateInMonth = (month: number, year: number) => {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 1:
            return year % 4 === 0 ? 29 : 28;
        default:
            return 30;
    }
};

export const getTimeText = (start: Date, end: Date): { h: number; m: number; s: number } => {
    const startDate = start ? new Date(start) : new Date();
    const endDate = end ? new Date(end) : new Date();

    const seconds = Math.round((endDate.getTime() - startDate.getTime()) / 1000);

    if (seconds <= 0) {
        return { h: 0, m: 0, s: 0 };
    }
    if (seconds / 60 <= 1) {
        const s = seconds;
        return { h: 0, m: 0, s: s };
    } else if (seconds / 60 / 60 <= 1) {
        const s = seconds % 60;
        const m = (seconds - s) / 60;
        return { h: 0, m: m, s: s };
    } else {
        const s = seconds % 60;
        const minus = (seconds - s) / 60;

        const m = minus % 60;
        const h = (minus - m) / 60;
        return { h: h, m: m, s: s };
    }
};

export const downFile = (fullPath: string, fileName: string) => {
    fetch(fullPath)
        .then((resp) => resp.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want

            document.body.appendChild(a);
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('An error sorry'));
};

const createImage = (options: any) => {
    options = options || {};
    const img = document.createElement('img');
    if (options.src) {
        img.src = options.src;
    }
    return img;
};
export const convertToPng = (imgBlob: any) => {
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const imageEl = createImage({ src: window.URL.createObjectURL(imgBlob) });
    imageEl.onload = (e: any) => {
        canvas.width = e.target.width;
        canvas.height = e.target.height;
        ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
        canvas.toBlob(handleCopyPng, 'image/png', 1);
    };
};

export const handleCopyPng = async (pngBlob: any) => {
    try {
        await navigator.clipboard.write([
            // eslint-disable-next-line no-undef
            new ClipboardItem({
                [pngBlob.type]: pngBlob,
            }),
        ]);
        enqueueSnackbar('Copy thành công', { variant: 'success' });
        return true;
    } catch (error) {
        console.error(error);
    }
};

// export const decrypt = (data: string) => {
//     const KEY = 'a6e17b6a43e34a1a50e20d9f0c2c69b9';
//     const ALGORITHM = 'aes-256-cbc';
//     const [iv, encrypted] = data.split(':');
//     const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), Buffer.from(iv, 'hex'));
//     let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return JSON.parse(decrypted.toString());
// };
