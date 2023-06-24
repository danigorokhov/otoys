/** @type {import('./src/core/Config').ConfigOptions} */
module.exports = {
    documentLoader: {
        type: 'local',
        url: 'https://petstore3.swagger.io/api/v3/openapi.json',
        path: './examples/v3/petstore3.json',
    },
    output: {
        type: 'local',
        path: './output',
    },
    pathWhitelist: '^/user',
};
