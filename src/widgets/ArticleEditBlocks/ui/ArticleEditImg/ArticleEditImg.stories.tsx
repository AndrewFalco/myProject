import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleEditImg } from './ArticleEditImg';

const meta = {
    title: 'widget/ArticleEditImg',
    component: ArticleEditImg,
    argTypes: {},
} satisfies Meta<typeof ArticleEditImg>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const PrimaryDark: Story = {
    args: {},
    decorators: [ThemeDecorator('app_dark_theme')],
};
