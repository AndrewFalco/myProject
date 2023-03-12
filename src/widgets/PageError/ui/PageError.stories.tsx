import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { PageError } from './PageError';

export default {
    title: 'widget/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => <PageError { ...args } />;

export const Light = Template.bind({});
Light.args = {
    error: new Error('new error message'),
};

export const Dark = Template.bind({});
Dark.args = {
    error: new Error('new error message'),
};
Dark.decorators = [ThemeDecorator('app_dark_theme')];
