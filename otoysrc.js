/** @type {import('./src/core/Config').ConfigOptions} */
module.exports = {
    document: {
        type: 'local',
        url: 'https://petstore3.swagger.io/api/v3/openapi.json',
        path: './src/petstore3.json'
    },
    output: './output',
    pathWhitelist: '^/user',
};
