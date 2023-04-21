import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

export interface IDialogChangeNameProps {
    open: boolean;
    handleCloseModal: () => void;
    idGroup: string;
    name: string;
    handleChangeName: any;
}

export default function DialogChangeName(props: IDialogChangeNameProps) {
    const { open, handleCloseModal, idGroup, name, handleChangeName } = props;
    const [nameGroup, setNameGroup] = useState('');
    useEffect(() => {
        setNameGroup(name);
    }, [name]);
    const submit = () => {
        if (nameGroup) {
            handleChangeName(nameGroup);
            handleCloseModal();
        } else {
            enqueueSnackbar('Tên nhóm không được bỏ trống!', { variant: 'error' });
        }
    };
    return (
        <>
            <Dialog
                sx={{
                    '&.MuiDialog-root ': {
                        '& .MuiPaper-rounded ': {
                            backgroundColor: '#393939',
                        },
                    },
                }}
                open={open}
                onClose={handleCloseModal}
            >
                <DialogTitle color={'primary'}>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc muốn đổi tên nhóm, Khi xác nhận tên nhóm mới sẽ hiển thị với tất
                        cả thành viên.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nameGroup}
                        onChange={(e) => {
                            setNameGroup(e.target.value);
                        }}
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Hủy</Button>
                    <Button
                        onClick={submit}
                        sx={{ backgroundColor: '#262e35' }}
                        variant="contained"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
