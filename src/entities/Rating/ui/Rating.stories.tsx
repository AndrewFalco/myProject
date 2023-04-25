import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Rating } from './Rating';

const meta = {
    title: 'entities/Rating',
    component: Rating,
    argTypes: {},
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'Feedback title',
    },
};

export const PrimaryDark: Story = {
    args: {
        title: 'Feedback title',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
