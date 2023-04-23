import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';

const meta = {
  title: 'shared/Card',
  component: Code,
  args: {},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: `// .storybook/main.js

    module.exports = {
      addons: ['@storybook/addon-essentials'],
      babel: async (options) => ({
        // Update your babel configuration here
        ...options,
      }),
      framework: '@storybook/react',
      stories: ['../src/**/*.stories.@(js|mdx)'],
      webpackFinal: async (config, { configType }) => {
        // Make whatever fine-grained changes you need
        // Return the altered config
        return config;
      },
    };`,
  },
};

export const PrimaryDark = {
  args: {
    text: `// .storybook/main.js

    module.exports = {
      addons: ['@storybook/addon-essentials'],
      babel: async (options) => ({
        // Update your babel configuration here
        ...options,
      }),
      framework: '@storybook/react',
      stories: ['../src/**/*.stories.@(js|mdx)'],
      webpackFinal: async (config, { configType }) => {
        // Make whatever fine-grained changes you need
        // Return the altered config
        return config;
      },
    };`,
  },
  decorators: [ThemeDecorator('app_dark_theme')],
};
