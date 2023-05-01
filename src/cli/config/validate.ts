import Ajv from 'ajv';

import { ConfigOptions } from '../../core/Config';
import schema from './schema.json';

type Validate = (userConfig: unknown) => ConfigOptions;

const ajv = new Ajv();
const validateAjv = ajv.compile<ConfigOptions>(schema);

export const validate: Validate = userConfig => {
    if (validateAjv(userConfig)) {
        return userConfig;
    }

    // TODO handle ajv validation errors
    throw new Error('Validation error: userConfig doesn\'t satisfy config json schema');
};
