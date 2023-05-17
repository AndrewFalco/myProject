import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'text',
    },
};

export const PrimaryDark: Story = {
    args: {
        children: 'text',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Clear: Story = {
    args: {
        children: 'text',
        variant: 'clear',
    },
};

export const ClearDark: Story = {
    args: {
        children: 'text',
        variant: 'clear',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Square = {
    args: {
        children: '>',
        variant: 'backgroundInverted',
        square: true,
    },
};

export const SquareL = {
    args: {
        children: '>',
        variant: 'backgroundInverted',
        square: true,
        size: 'sizeL',
    },
};

export const SquareXL = {
    args: {
        children: '>',
        variant: 'backgroundInverted',
        square: true,
        size: 'sizeXL',
    },
};

export const Disabled = {
    args: {
        children: 'text',
        variant: 'outline',
        disabled: true,
    },
};

export const DisabledDark = {
    args: {
        children: 'text',
        variant: 'outline',
        disabled: true,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
