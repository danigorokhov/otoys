module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: { jsx: true },
        useJSXTextNode: true,
    },
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    root: true,
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        indent: ['error', 4,
            {
                flatTernaryExpressions: false,
                ignoreComments: false,
                SwitchCase: 1,
            },
        ],

        camelcase: [1, { properties: 'never' }],
        // Temporary disable these rules because of conflict with typescript analogues
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            2,
            {
                args: 'after-used',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                vars: 'all',
                varsIgnorePattern: '^_',
            },
        ],
        // https://github.com/typescript-eslint/typescript-eslint/issues/1856
        'no-use-before-define': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/issues/2477#issuecomment-686892459
        'no-undef': 'off',
    },
};
