import { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Sidebar } from './Sidebar';

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const NoAuth: Story = {
    decorators: [
        StoreDecorator({
            user: {},
        }),
    ],
};
