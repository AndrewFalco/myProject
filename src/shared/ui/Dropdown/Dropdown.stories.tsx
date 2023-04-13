/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown { ...args } />;

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

export const Primary = Template.bind({});
Primary.args = {
    items,
    trigger: <div>Click me</div>,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    items,
    trigger: <div>Click me</div>,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
