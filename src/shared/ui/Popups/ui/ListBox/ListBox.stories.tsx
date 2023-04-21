/* eslint-disable i18next/no-literal-string */
import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ListBox } from './ListBox';

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    decorators: [
        (Story) => <div style={ { padding: 100 } }><Story /></div>,
    ],
    args: {},
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof ListBox>;

const mockData = [
    {
        value: 'Jhoe',
        content: <div>Jhoe Slavin</div>,
    },
    {
        value: 'Jhoe K',
        content: <div>Jhoe K Slavin</div>,
    },
    {
        value: 'Jhoe M',
        content: <div>Jhoe M Slavin</div>,
        disabled: false,
    },
    {
        value: 'Jhoe N',
        content: <div>Jhoe N Slavin</div>,
        disabled: true,
    },
    {
        value: 'Jhoe O',
        content: <div>Jhoe O Slavin</div>,
        disabled: false,
    },
];

export const Primary: Story = {
    args: {
        items: mockData,
    },
};

export const PrimaryDark: Story = {
    args: {
        items: mockData,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
