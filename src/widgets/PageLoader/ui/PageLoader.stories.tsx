import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { PageLoader } from './PageLoader';

const meta = {
    title: 'widget/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
