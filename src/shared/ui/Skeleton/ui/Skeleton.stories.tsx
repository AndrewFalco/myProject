import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: 100,
        height: 100,
    },
};

export const PrimaryDark = {
    args: {
        width: 100,
        height: 100,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Round = {
    args: {
        borderRadius: '50%',
        width: 100,
        height: 100,
    },
};

export const RoundDark = {
    args: {
        borderRadius: '50%',
        width: 100,
        height: 100,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
