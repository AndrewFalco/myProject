import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
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
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
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
};
PrimaryDark.decorators = [ThemeDecorator('app_dark_theme')];
