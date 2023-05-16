/* eslint-disable i18next/no-literal-string */
import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Tabs } from './Tabs';

const meta = {
    title: 'shared/Tabs',
    component: Tabs,
    args: {
        value: 'same value',
        tabs: [
            {
                value: 'asdasd',
                content: <div>tab content 1</div>,
            },
            {
                value: 'asdasasdd',
                content: <div>tab content 2</div>,
            },
            {
                value: 'asdassdfd',
                content: <div>tab content 3</div>,
            },
            {
                value: 'asdadffgsd',
                content: <div>tab content 4</div>,
            },
        ],
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
