import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { PageError } from './PageError';

const meta = {
    title: 'widget/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        error: new Error('new error message'),
    },
} as Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
