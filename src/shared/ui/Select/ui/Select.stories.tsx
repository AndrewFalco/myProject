import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';

const meta = {
    title: 'shared/Select',
    component: Select,
    args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
    { value: 'value 1', content: 'content 1' },
    { value: 'value 2', content: 'content 2' },
    { value: 'value 3', content: 'content 3' },
    { value: 'value 4', content: 'content 4' },
    { value: 'value 5', content: 'content 5' },
];

export const Primary: Story = {
    args: {
        options,
        value: options[0].value,
        label: 'Select value',
    },
};

export const PrimaryDark: Story = {
    args: {
        options,
        value: options[0].value,
        label: 'Select value',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
