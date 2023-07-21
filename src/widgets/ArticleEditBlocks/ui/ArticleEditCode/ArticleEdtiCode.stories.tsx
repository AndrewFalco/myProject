import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleEditCode } from './ArticleEditCode';

const meta = {
    title: 'widget/ArticleEditCode',
    component: ArticleEditCode,
    argTypes: {},
    args: {
        text: `"const path = require('path');\n\nconst server = jsonServer.create();
                \nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));
                \nserver.use(jsonServer.bodyParser);"`,
    },
} satisfies Meta<typeof ArticleEditCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const PrimaryDark: Story = {
    args: {},
    decorators: [ThemeDecorator('app_dark_theme')],
};
