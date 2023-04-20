/* eslint-disable i18next/no-literal-string */
import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Dropdown } from './Dropdown';

const meta = {
    title: 'shared/Card',
    component: Dropdown,
    args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
    {
        disabled: false,
        content: <div>Tag number 1</div>,
        href: 'sdfsdf',
    },
    {
        disabled: false,
        content: <div>Tag number 2</div>,
        href: 'sdfsdf',
    },
    {
        disabled: true,
        content: <div>Tag number 3</div>,
        href: 'sdfsdf',
    },
    {
        disabled: false,
        content: <div>Tag number 4</div>,
        href: 'sdfsdf',
    },
];

export const Primary: Story = {
    args: {
        items,
        trigger: <div>Click me</div>,
    },
};

export const PrimaryDark: Story = {
    args: {
        items,
        trigger: <div>Click me</div>,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
