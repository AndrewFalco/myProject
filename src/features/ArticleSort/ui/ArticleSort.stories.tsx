import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleSort } from './ArticleSort';

export default {
    title: 'shared/ArticleSort',
    component: ArticleSort,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof ArticleSort>;

const Template: ComponentStory<typeof ArticleSort> = (args) => <ArticleSort { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
