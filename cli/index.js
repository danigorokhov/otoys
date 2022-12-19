#!/usr/bin/env node

const { hideBin } = require('yargs/helpers');
const { main } = require('../build');

// eslint-disable-next-line no-unused-expressions
require('yargs/yargs')(hideBin(process.argv))
    .scriptName('otoys')
    .usage('$0 <cmd> [options]')
    .config()
    .command(
        'generate',
        'Generate schemas and models',
        // TODO add options
        // (yargs) => yargs.default('commits', []),
        async (options) => {
            // TODO handle command result

            await main(options.argv);

            // eslint-disable-next-line no-console
            console.log('Successfully finished!');
        },
    )
    .demandCommand(1)
    .help()
    .argv;
