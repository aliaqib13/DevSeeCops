module.exports = {
    extends: ['@devsecopsacademy/eslint-config/frontend'],
    ignorePatterns: ["build/"],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
    },
    rules: {
        'sort-imports': "off", // FIXME: we need to enforce import grouping and ordering by module name.
        'no-process-env': 'warn', // TODO: control all use of Process.env to a central file, then remove this line,
        'no-underscore-dangle': 'off', // TODO: put this in the top level config, then remove this line
        'react/jsx-filename-extension': 'warn',  // TODO: remove as part of ATP-1580
        'react/prop-types': 'warn', // FIXME: should be removed when ATP-1584 is done
    },
    overrides: [
        {
            files: ['*.test.js', '**/__mocks__/*'],
            globals: {
                // Jest globals:
                jest: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                before: 'readonly',
                after: 'readonly',
            },
            rules: {
                'react/jsx-props-no-spreading': 'off', // Prop spreading is allowed in tests for ease
            }
        },
        {
            files: ['cypress/**/*.js'],
            globals: {
                // Cypress globals
                Cypress: 'readonly',
                cy: 'readonly',
            }
        }
    ]
};
