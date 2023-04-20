/* eslint-disable i18next/no-literal-string */
import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Flex } from './Flex';

const mockChildren = (
    <>
        <div>one</div>
        <div>two</div>
        <div>three</div>
        <div>four</div>
        <div>five</div>
    </>
);

const meta = {
    title: 'shared/Flex',
    component: Flex,
    args: {},
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
    args: {
        children: mockChildren,
    },
};

export const PrimaryDark: Story = {
    args: {
        children: mockChildren,
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
