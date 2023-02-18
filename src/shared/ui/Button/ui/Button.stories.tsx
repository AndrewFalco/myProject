import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
    children: 'text',
    theme: ThemeButton.CLEAR,
};

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'text',
    theme: ThemeButton.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline = Template.bind({});
Outline.args = {
    children: 'text',
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
