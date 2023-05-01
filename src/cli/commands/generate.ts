import { Config } from '../../core/Config';
import { generate as generateTypes } from '../../core';

import { resolve as resolveConfig, validate as validateConfig } from '../config';

type CliOptions = Record<string, unknown> & {
    config: string;
};

type Generate = (cliOptions: CliOptions) => void;

export const generate: Generate = async (cliOptions) => {
    // TODO think of pure cli running
    const userConfig = resolveConfig(cliOptions.config);
    const userConfigValidated = validateConfig(userConfig);
    const config = new Config(userConfigValidated);

    generateTypes(config);
};
