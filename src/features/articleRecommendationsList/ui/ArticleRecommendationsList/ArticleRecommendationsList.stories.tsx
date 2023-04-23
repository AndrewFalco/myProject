import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {},
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof ArticleRecommendationsList>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator('app_dark_theme')],
};
