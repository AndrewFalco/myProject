import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLink: Story = {
    args: {
        children: 'text',
        theme: 'primary',
    },
};

export const PrimaryLinkDark: Story = {
    args: {
        children: 'text',
        theme: 'primary',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
export const SecondaryLink: Story = {
    args: {
        children: 'text',
        theme: 'secondary',
    },
};
export const SecondaryLinkDark: Story = {
    args: {
        children: 'text',
        theme: 'secondary',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
