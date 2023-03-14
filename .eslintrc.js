module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
    rules: {
        '@typescript-eslint/indent': 0,
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 2],
        'react/jsx-curly-spacing': [2, {
            when: 'always',
            allowMultiline: true,
            children: true,
        }],
        'react/jsx-props-no-spreading': ['off', {
            html: 'ignore',
            custom: 'ignore',
            explicitSpread: 'ignore',
        }],
        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.jsx', '.tsx'],
        }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_$',
                args: 'none',
            },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'error',
        'object-curly-spacing': ['error', 'always'],
        'i18next/no-literal-string': [1, {
            markupOnly: true,
            ignoreAttribute: ['data-testid', 'to'],
        }],
        'max-len': ['error', {
            code: 125,
            ignoreComments: true,
        }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        indent: 'off',
        'no-nested-ternary': 'off',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [{
        files: ['**/src/**/*.test.{ts, tsx}'],
        rules: {
            'i18next/no-literal-string': 'off',
        },
    }],
};
