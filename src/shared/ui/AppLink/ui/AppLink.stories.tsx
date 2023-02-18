import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink { ...args } />;

export const PrimaryLink = Template.bind({});
PrimaryLink.args = {
    children: 'text',
    theme: AppLinkTheme.PRIMARY,
};

export const PrimaryLinkDark = Template.bind({});
PrimaryLinkDark.args = {
    children: 'text',
    theme: AppLinkTheme.PRIMARY,
};
PrimaryLinkDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
    children: 'text',
    theme: AppLinkTheme.SECONDARY,
};

export const SecondaryLinkDark = Template.bind({});
SecondaryLinkDark.args = {
    children: 'text',
    theme: AppLinkTheme.SECONDARY,
};
SecondaryLinkDark.decorators = [ThemeDecorator(Theme.DARK)];
