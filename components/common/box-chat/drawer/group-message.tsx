import { StyledAccordion } from '@/styles/Accodion/accodion-style';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    AccordionDetails,
    AccordionSummary,
    Avatar,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import Typography from '@mui/material/Typography';
export interface IGroupMessageProps {}

export default function GroupMessage(props: IGroupMessageProps) {
    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ backgroundColor: '#262626' }}
            >
                <Typography color="#fff">Bảng tin hội thoại</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#262626' }}>
                <List sx={{ width: '100%', backgroundColor: 'initial' }}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <AccessAlarmIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Danh sách nhắc hẹn" />
                    </ListItemButton>

                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                <DescriptionIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Ghi chú, ghim, bình chọn" />
                    </ListItemButton>
                </List>
            </AccordionDetails>
        </StyledAccordion>
    );
}
