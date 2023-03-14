import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    name: 'Input name',
    value: 'Some text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    name: 'Input name',
    value: 'Some text',
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];

export const ErrorField = Template.bind({});
ErrorField.args = {
    name: 'Input name',
    value: '',
    required: true,
    errorText: 'Required field',
};

export const ErrorFieldDark = Template.bind({});
ErrorFieldDark.args = {
    name: 'Input name',
    value: '',
    required: true,
    errorText: 'Required field',
};
ErrorFieldDark.decorators = [ThemeDecorator('app_dark_theme')];
