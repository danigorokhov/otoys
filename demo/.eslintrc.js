module.exports = {
    extends: [
        'react-app',
        'react-app/jest',
    ],
    rules: {
        'semi': 'off',
        '@typescript-eslint/semi': 'error',
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4,
            {
                flatTernaryExpressions: false,
                ignoreComments: false,
                SwitchCase: 1,
            },
        ],
        'react/jsx-indent': ['error', 4,
            {
                checkAttributes: true,
                indentLogicalExpressions: true,
            },
        ],
        'no-restricted-exports': ['error',
            {
                'restrictDefaultExports': { direct: true, named: true },
            },
        ],
    },
};
