import { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import LoginForm from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'username',
                password: 'password',
            },
        }),
    ],
};

export const PrimaryDark: Story = {
    decorators: [
        ThemeDecorator('app_dark_theme'),
        StoreDecorator({
            loginForm: {
                username: 'username',
                password: 'password',
            },
        }),
    ],
};

export const Error: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                username: 'username',
                password: 'password',
                error: 'Invalid username or password',
            },
        }),
    ],
};
