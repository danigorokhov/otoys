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
                templateFile: 'plop-templates/index.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.tsx',
                templateFile: 'plop-templates/component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.cn.ts',
                templateFile: 'plop-templates/component.cn.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.types.ts',
                templateFile: 'plop-templates/component.types.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.css',
                templateFile: 'plop-templates/component.css.hbs',
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
                type: 'add',
                path: 'src/{{name}}/{{name}}.models/index.ts',
                templateFile: 'plop-templates/component.models/index.ts.hbs',
            },
            {
                type: 'add',
                path: 'src/{{name}}/{{name}}.models/init.ts',
                templateFile: 'plop-templates/component.models/init.ts.hbs',
            },
        ],
    });
};
