import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
