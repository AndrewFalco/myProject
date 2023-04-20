import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
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
        theme: 'clear',
    },
};

export const ClearDark: Story = {
    args: {
        children: 'text',
        theme: 'clear',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const BackgroundTheme: Story = {
    args: {
        children: 'text',
        theme: 'background',
    },
};

export const BackgroundThemeDark: Story = {
    args: {
        children: 'text',
        theme: 'background',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const BackgroundInvertedTheme: Story = {
    args: {
        children: 'text',
        theme: 'backgroundInverted',
    },
};

export const BackgroundInvertedThemeDark: Story = {
    args: {
        theme: 'backgroundInverted',
        children: 'text',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const Square = {
    args: {
        children: '>',
        theme: 'backgroundInverted',
        square: true,
    },
};

export const SquareL = {
    args: {
        children: '>',
        theme: 'backgroundInverted',
        square: true,
        size: 'sizeL',
    },
};

export const SquareXL = {
    args: {
        children: '>',
        theme: 'backgroundInverted',
        square: true,
        size: 'sizeXL',
    },
};

export const Disabled = {
    args: {
        children: 'text',
        theme: 'outline',
        disabled: true,
    },
};

export const DisabledDark = {
    args: {
        children: 'text',
        theme: 'outline',
        disabled: true,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
