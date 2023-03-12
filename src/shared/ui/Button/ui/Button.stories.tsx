import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from './Button';

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
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];

export const Clear = Template.bind({});
Clear.args = {
    children: 'text',
    theme: 'clear',
};

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'text',
    theme: 'clear',
};
ClearDark.decorators = [ThemeDecorator('app_dark_theme')];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'text',
    theme: 'background',
};

export const BackgroundThemeDark = Template.bind({});
BackgroundThemeDark.args = {
    children: 'text',
    theme: 'background',
};
BackgroundThemeDark.decorators = [ThemeDecorator('app_dark_theme')];

export const BackgroundInvertedTheme = Template.bind({});
BackgroundInvertedTheme.args = {
    children: 'text',
    theme: 'backgroundInverted',
};

export const BackgroundInvertedThemeDark = Template.bind({});
BackgroundInvertedThemeDark.args = {
    children: 'text',
    theme: 'backgroundInverted',
};
BackgroundInvertedThemeDark.decorators = [ThemeDecorator('app_dark_theme')];

export const Square = Template.bind({});
Square.args = {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
};

export const SquareL = Template.bind({});
SquareL.args = {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
    size: 'sizeL',
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: '>',
    theme: 'backgroundInverted',
    square: true,
    size: 'sizeXL',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'text',
    theme: 'outline',
    disabled: true,
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    children: 'text',
    theme: 'outline',
    disabled: true,
};
DisabledDark.decorators = [ThemeDecorator('app_dark_theme')];
