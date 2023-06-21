/* eslint-disable no-restricted-exports */

export default function generator(
    /** @type {import('plop').NodePlopAPI} */
    plop
) {
    plop.setGenerator('component', {
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
        }],
        actions: [
            {
                type: 'add',
                path: 'src/{{name}}/index.ts',
                templateFile: 'plop-templates/component/index.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.tsx',
                templateFile: 'plop-templates/component/component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.cn.ts',
                templateFile: 'plop-templates/component/component.cn.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.types.ts',
                templateFile: 'plop-templates/component/component.types.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.css',
                templateFile: 'plop-templates/component/component.css.hbs',
            },
        ],
    });

    plop.setGenerator('models', {
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
        }],
        actions: [
            {
                type: 'append',
                path: 'src/{{name}}/{{name}}.tsx',
                templateFile: 'plop-templates/models/component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.models/index.ts',
                templateFile: 'plop-templates/models/index.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.models/init.ts',
                templateFile: 'plop-templates/models/init.ts.hbs',
            },
        ],
    });

    plop.setGenerator('i18n', {
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
        }],
        actions: [
            {
                type: 'append',
                path: 'src/{{name}}/{{name}}.tsx',
                templateFile: 'plop-templates/i18n/component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.i18n/en.json',
                templateFile: 'plop-templates/i18n/en.json.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.i18n/ru.json',
                templateFile: 'plop-templates/i18n/ru.json.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.i18n/index.ts',
                templateFile: 'plop-templates/i18n/index.ts.hbs',
            },
        ],
    });
};
