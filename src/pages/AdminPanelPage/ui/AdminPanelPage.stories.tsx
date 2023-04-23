import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AdminPanelPage from './AdminPanelPage';

const meta = {
    title: 'pages/AdminPanelPage',
    component: AdminPanelPage,
    argTypes: {},
} satisfies Meta<typeof AdminPanelPage>;

export default meta;
type Story = StoryObj<typeof AdminPanelPage>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
