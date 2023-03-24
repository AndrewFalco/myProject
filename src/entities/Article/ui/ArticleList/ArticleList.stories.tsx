import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleList } from './ArticleList';

export default {
    title: 'entities/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    articles: [
        {
            id: '1',
            user: {
              id: '1',
              username: 'Levi',
            },
            title: 'JS news',
            subtitle: 'some subtitle text for JS news',
            img: 'https://cache.kwork.ru/pics/t0/09/24593006-63c14251aff38.jpg',
            views: 32,
            createdAt: '2023-03-16T07:16:01.362Z',
            type: [
              'IT',
            ],
            blocks: [
              {
                id: '1',
                type: 'TEXT',
                title: 'Заголовок этого блока',
                paragraphs: [
                  'Программа, которую по традиции называют «Hello, world!», очень проста. ',
              ],
              },
            ],
          },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  articles: [
    {
        id: '1',
        user: {
          id: '1',
          username: 'Levi',
        },
        title: 'JS news',
        subtitle: 'some subtitle text for JS news',
        img: 'https://cache.kwork.ru/pics/t0/09/24593006-63c14251aff38.jpg',
        views: 32,
        createdAt: '2023-03-16T07:16:01.362Z',
        type: [
          'IT',
        ],
        blocks: [
          {
            id: '1',
            type: 'TEXT',
            title: 'Заголовок этого блока',
            paragraphs: [
              'Программа, которую по традиции называют «Hello, world!», очень проста. ',
          ],
          },
        ],
      },
],
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
