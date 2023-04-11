/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Flex>;

const mockChildren = (
    <>
        <div>one</div>
        <div>two</div>
        <div>three</div>
        <div>four</div>
        <div>five</div>
    </>
);

const Template: ComponentStory<typeof Flex> = (args) => <Flex { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    children: mockChildren,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: mockChildren,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
