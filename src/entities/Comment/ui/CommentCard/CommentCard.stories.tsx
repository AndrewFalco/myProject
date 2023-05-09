import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CommentCard } from './CommentCard';

const meta = {
    title: 'entities/comment/CommentCard',
    component: CommentCard,
    argTypes: {},
    args: {
        comment: {
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
    },
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
