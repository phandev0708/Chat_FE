import { UserChatModel } from '@/models/user-chat-model';
import { ListItem } from '@/styles/list/list-style';
import { Avatar, Card, CardHeader, Checkbox, Divider, List, ListItemText } from '@mui/material';
import { memo, useState } from 'react';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
const BACKEND_DOMAIN_ERP = process.env.NEXT_PUBLIC_BACKEND_DOMAIN_ERP;
export interface IUserListComponentProps {
    // title: string;
    items: UserChatModel[];
    checked: UserChatModel[];
    setChecked: (checked: UserChatModel[]) => void;
}

const UserListComponent = ({ checked, items, setChecked }: IUserListComponentProps) => {
    function intersectionUser(a: readonly UserChatModel[], b: readonly UserChatModel[]) {
        return a.filter((item) => b.findIndex((i) => i.ID === item.ID) !== -1);
    }
    function notUser(a: readonly UserChatModel[], b: readonly UserChatModel[]) {
        return a.filter((item) => b.findIndex((i) => i.ID === item.ID) === -1);
    }
    function unionUser(a: readonly UserChatModel[], b: readonly UserChatModel[]) {
        return [...a, ...notUser(b, a)];
    }
    const handleToggle = (value: UserChatModel) => () => {
        const currentIndex = checked.findIndex((item: UserChatModel) => item.ID === value.ID);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const numberOfChecked = (items: readonly UserChatModel[]) =>
        intersectionUser(checked, items).length;

    const handleToggleAll = (items: readonly UserChatModel[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(notUser(checked, items));
        } else {
            setChecked(unionUser(checked, items));
        }
    };
    return (
        <Card variant="outlined" sx={{ flex: 1, height: '450px' }}>
            <CardHeader
                sx={{ p: 1.5, height: '50px' }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                subheader={`${numberOfChecked(items)}/${items.length}`}
            />
            <Divider />
            <List
                sx={{
                    bgcolor: 'transparent',
                    overflow: 'auto',
                    p: 1,
                    height: '400px',
                    overflowY: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: UserChatModel) => {
                    const labelId = `transfer-list-all-item-${value.ID}-label`;
                    return (
                        <ListItem key={value.ID} role="listitem" onClick={handleToggle(value)}>
                            <Checkbox
                                checked={checked.findIndex((item) => item.ID === value.ID) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                            <Avatar
                                alt={value.Name}
                                sx={{ width: '32px', height: '32px', mr: 1 }}
                                src={value.Avatar ? BACKEND_DOMAIN_ERP + value.Avatar : ''}
                            />
                            <ListItemText
                                id={labelId}
                                primary={value.Name}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: '#abb4d2',
                                    },
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );
};
export default UserListComponent;
