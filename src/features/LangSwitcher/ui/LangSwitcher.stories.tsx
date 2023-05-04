import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LangSwitcher } from './LangSwitcher';

const meta = {
    title: 'features/LangSwitcher',
    component: LangSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof LangSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
