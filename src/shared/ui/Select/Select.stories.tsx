import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select { ...args } />;

const options = [
    { value: 'value 1', content: 'content 1' },
    { value: 'value 2', content: 'content 2' },
    { value: 'value 3', content: 'content 3' },
    { value: 'value 4', content: 'content 4' },
    { value: 'value 5', content: 'content 5' },
];

export const Primary = Template.bind({});
Primary.args = {
    options,
    value: options[0].value,
    label: 'Select value',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    options,
    value: options[0].value,
    label: 'Select value',
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
