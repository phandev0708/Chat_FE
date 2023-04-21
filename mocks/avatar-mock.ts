import { UserChat } from '../models';

export const avatarMock: UserChat[] = [
    {
        ID: '1',
        Name: 'Remy Sharp',
        Avatar: './static/avatar/1.jpg',
    },
    {
        ID: '2',
        Name: 'Remy Sharp',
        Avatar: './static/avatar/1.jpg',
    },
    {
        ID: '3',
        Name: 'Remy Sharp',
        Avatar: './static/avatar/1.jpg',
    },
    {
        ID: '4',
        Name: 'Remy Sharp',
        Avatar: './static/avatar/1.jpg',
    },
    {
        ID: '5',
        Name: 'Remy Sharp',
        Avatar: './static/avatar/1.jpg',
    },
];
export const imgMock = [
    {
        img: '/static/image/background.jpg',
        title: 'Breakfast',
    },
    {
        img: '/static/image/background.jpg',
        title: 'Breakfast',
    },
    {
        img: '/static/image/background.jpg',
        title: 'Breakfast',
    },
    {
        img: '/static/image/background.jpg',
        title: 'Breakfast',
    },
    {
        img: '/static/image/nezuko.jpg',
        title: 'Breakfast',
    },
];

const voteList = [
    {
        ID: '0',
        Name: 'Cá kho',
        UserVotes: [
            {
                IDUser: '1',
                Name: 'trong',
                Avatar: '/static/avatar/1.jpg',
            },
            { IDUser: '2', Name: 'linh', Avatar: '/static/avatar/2.jpg' },
            {
                IDUser: '1111',
                Avatar: 'https://mui.com/static/images/avatar/2.jpg',
                Name: 'Ngo Tan Trong',
            },
        ],
    },
    {
        ID: '1',
        Name: 'Gà',
        UserVotes: [
            {
                IDUser: '1',
                Name: 'trong',
                Avatar: '/static/avatar/4.jpg',
            },
        ],
    },
    { ID: '2', Name: 'Thịt', UserVotes: [] },
];
export const votesMock = {
    ID: '0',
    Title: 'Bữa ăn hôm nay',
    Description: '....',
    IsMulti: true,
    Deadline: new Date(),
    UserCreate: '1',
    VoteList: voteList,
};
