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
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'falco-custom-fsd-plugin', 'unused-imports', 'prettier'],
    rules: {
        'react/jsx-curly-spacing': [
            2,
            {
                when: 'always',
                allowMultiline: true,
                children: true,
            },
        ],
        'react/jsx-max-props-per-line': [2, { maximum: { single: 3, multi: 1 } }],
        'react/jsx-indent-props': [1, 'first'],
        'react/jsx-props-no-spreading': [
            'off',
            {
                html: 'ignore',
                custom: 'ignore',
                explicitSpread: 'ignore',
            },
        ],
        'react/jsx-tag-spacing': [1],
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ],
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
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'error',
        'object-curly-spacing': ['error', 'always'],
        'i18next/no-literal-string': [
            1,
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to', 'target'],
            },
        ],
        'max-len': [
            'error',
            {
                code: 130,
                ignoreComments: true,
            },
        ],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-param-reassign': 'off',
        'unused-imports/no-unused-imports': 'error',
        'falco-custom-fsd-plugin/path-checker': [
            2,
            {
                alias: '@',
            },
        ],
        'falco-custom-fsd-plugin/public-api-imports': [
            2,
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
            },
        ],
        'falco-custom-fsd-plugin/layer-imports': [
            2,
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'consistent-return': 'off',
        'no-nested-ternary': 'off',
        'arrow-parens': 'off',
        'jsx-quotes': ['warn', 'prefer-double'],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts, tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
    ],
};
