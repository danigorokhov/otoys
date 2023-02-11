#!/usr/bin/env node

// TODO merge with src/cli?
const { hideBin } = require('yargs/helpers');
const { generate } = require('../build/cli');

// eslint-disable-next-line no-unused-expressions
require('yargs/yargs')(hideBin(process.argv))
    .scriptName('otoys')
    .usage('$0 <cmd> [options]')
    .command(
        'generate',
        'Generate schemas and models',
        // TODO add options
        // (yargs) => yargs.default('commits', []),
        async (options) => {
            // TODO handle async errors
            await generate(options.argv);

            // TODO cool success message
            // eslint-disable-next-line no-console
            console.log('Successfully finished!');
        },
    )
    .option('config', {
        type: 'string',
        description: 'Path to the config file',
        default: './otoysrc.js',
        demandOption: true,
    })
    .demandCommand(1)
    .help()
    .argv;
