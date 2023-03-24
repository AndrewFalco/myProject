import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Card } from './Card';
import { Text } from '../Text/Text';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    children: <Text text="Some text" />,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: <Text text="Some text" />,
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
