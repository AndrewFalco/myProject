import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleListItem } from './ArticleListItem';

const meta = {
    title: 'entities/ArticleList',
    component: ArticleListItem,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleListItem>;

export default meta;
type Story = StoryObj<typeof ArticleListItem>;

export const Primary = {
    args: {
        article: {
        id: '1',
        user: {
            id: '1',
            username: 'Levi',
        },
        title: 'JS news',
        subtitle: 'some subtitle text for JS news',
        img: 'https://cache.kwork.ru/pics/t0/09/24593006-63c14251aff38.jpg',
        views: 32,
        createdAt: '2023-03-16T07:16:01.362Z',
        type: [
            'IT',
        ],
        blocks: [
            {
            id: '1',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. ',
            ],
            },
        ],
        },
        view: 'GRID',
    },
};

export const PrimaryDark: Story = {
    args: {
        article: {
            id: '1',
            user: {
                id: '1',
                username: 'Levi',
            },
            title: 'JS news',
            subtitle: 'some subtitle text for JS news',
            img: 'https://cache.kwork.ru/pics/t0/09/24593006-63c14251aff38.jpg',
            views: 32,
            createdAt: '2023-03-16T07:16:01.362Z',
            type: [
                'IT',
            ],
            blocks: [
                {
                id: '1',
                type: 'TEXT',
                title: 'Заголовок этого блока',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. ',
                ],
                },
            ],
        },
        view: 'GRID',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
