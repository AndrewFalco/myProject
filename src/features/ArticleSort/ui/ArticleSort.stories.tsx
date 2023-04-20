import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleSort } from './ArticleSort';

const meta = {
    title: 'features/ArticleSort',
    component: ArticleSort,
    argTypes: {},
} satisfies Meta<typeof ArticleSort>;

export default meta;
type Story = StoryObj<typeof ArticleSort>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
