import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleEditText } from './ArticleEditText';

const meta = {
    title: 'widget/ArticleEditText',
    component: ArticleEditText,
    argTypes: {},
} satisfies Meta<typeof ArticleEditText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        paragraphs: ['asdasda', 'qweqweqweqwew', 'asdasda', 'fbdbfdb'],
    },
};

export const PrimaryDark: Story = {
    args: {
        paragraphs: ['asdasda', 'qweqweqweqwew', 'asdasda', 'fbdbfdb'],
    },
    decorators: [ThemeDecorator('app_dark_theme')],
};
