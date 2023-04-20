import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

const meta = {
    title: 'shared/Input',
    component: Input,
    args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        name: 'Input name',
        value: 'Some text',
    },
};

export const PrimaryDark: Story = {
    args: {
        name: 'Input name',
        value: 'Some text',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};

export const ErrorField: Story = {
    args: {
        name: 'Input name',
        value: '',
        required: true,
        errorText: 'Required field',
    },
};

export const ErrorFieldDark: Story = {
    args: {
        name: 'Input name',
        value: '',
        required: true,
        errorText: 'Required field',
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
