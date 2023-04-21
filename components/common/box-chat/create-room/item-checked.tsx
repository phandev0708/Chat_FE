import { Checkbox, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';

export interface IItemCheckComponentProps {
    title: string;
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

export default function ItemCheckComponent({
    title,
    checked,
    setChecked,
}: IItemCheckComponentProps) {
    return (
        <ListItem role="listitem">
            <Checkbox
                checked={checked}
                tabIndex={-1}
                disableRipple
                inputProps={{
                    'aria-labelledby': 'label-1',
                }}
                onChange={(e) => setChecked(e.target.checked)}
            />

            <ListItemText
                primary={title}
                sx={{
                    '& .MuiListItemText-primary': {
                        color: '#abb4d2',
                    },
                }}
            />
        </ListItem>
    );
}
