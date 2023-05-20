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
};
