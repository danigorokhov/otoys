const { override, addBabelPlugins } = require('customize-cra');

const babelPlugins = [
    [
        'effector/babel-plugin',
        { reactSsr: true },
    ],
];

module.exports = {
    webpack: override(
        ...addBabelPlugins(
            ...babelPlugins,
        ),
    ),
};
