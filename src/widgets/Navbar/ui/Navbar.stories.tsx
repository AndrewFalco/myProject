import { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

const meta = {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        error: new Error('new error message'),
    },
} as Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [StoreDecorator({})],
};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const AuthNavbar: Story = {
    decorators: [
        StoreDecorator({
            user: { authData: {} },
        }),
    ],
};
