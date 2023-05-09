import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentList } from './CommentList';

const meta = {
    title: 'entities/comment/CommentList',
    component: CommentList,
    argTypes: {},
    args: {
        comments: [
            {
                id: '1',
                text: 'some comment',
                articleId: '1',
                user: {
                    id: '1',
                    username: 'admin',
                    roles: ['ADMIN'],
                    avatar: 'https://picsum.photos/200/300',
                },
                date: 'data text test example 123',
            },
            {
                id: '2',
                text: 'some comment',
                articleId: '1',
                user: {
                    id: '1',
                    username: 'admin',
                    roles: ['ADMIN'],
                    avatar: 'https://picsum.photos/200/300',
                },
                date: 'data text test example 123',
            },
            {
                id: '3',
                text: 'some comment',
                articleId: '2',
                user: {
                    id: '2',
                    username: 'user',
                    avatar: 'https://picsum.photos/200/300',
                },
                date: 'data text test example 123',
            },
        ],
    },
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof CommentList>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Empty: Story = {
    args: {
        comments: [],
    },
};
