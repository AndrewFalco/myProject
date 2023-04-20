import type { StorybookConfig } from '@storybook/react-webpack5';
import { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCSSLoaders } from '../build/loaders/buildCSSLoaders';

const config: StorybookConfig = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock',
    ],
    webpackFinal: async (config, { configType }) => {
        const paths: BuildPaths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
        };

        config.resolve?.modules?.unshift(paths.src);
        config.resolve?.extensions?.push('.ts', '.tsx');

        if (config.module?.rules) {
            config.module.rules = config.module?.rules?.map((rule: RuleSetRule | '...') => {
                if (rule !== '...' && /svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            });
        }

        config.module?.rules?.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        config.module?.rules?.push(buildCSSLoaders(true));

        config.plugins?.push(new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook'),
        }));

        return config;
    },
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    features: {
        storyStoreV7: false, // 👈 Opt out of on-demand story loading
    },
};
export default config;
