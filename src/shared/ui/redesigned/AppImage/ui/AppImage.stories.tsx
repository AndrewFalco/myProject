import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppImage } from './AppImage';

const meta = {
    title: 'shared/AppImage',
    component: AppImage,
    argTypes: {},
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const PrimaryDark: Story = {
    args: {},
    decorators: [ThemeDecorator('app_dark_theme')],
};
