import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title',
    text: 'lorem ipsum dolor sit amet',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Title',
    text: 'lorem ipsum dolor sit amet',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
    title: 'Title',
    text: 'lorem ipsum dolor sit amet',
    theme: 'error',
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: 'Title',
    text: 'lorem ipsum dolor sit amet',
    theme: 'error',
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
