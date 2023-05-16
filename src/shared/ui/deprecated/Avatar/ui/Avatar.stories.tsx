/* eslint-disable max-len */
import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Avatar } from './Avatar';

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    args: {
        src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/25/252371277b26a6a1d202497f72acc070e7dc6ba1_full.jpg',
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const PrimaryMale: Story = {
    args: {
        sex: 'male',
        src: '',
    },
};

export const PrimaryFemale: Story = {
    args: {
        sex: 'female',
        src: '',
    },
};

export const PrimarySmall: Story = {
    args: {
        size: 50,
    },
};
