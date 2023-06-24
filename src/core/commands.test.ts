import { expect, describe, it } from '@jest/globals';
import { OpenAPIObject } from 'openapi3-ts/oas30';

import petstore3 from '../../examples/v3/petstore3.json';
import onePasswordEvents from '../../examples/v3/one-password-events.json';
import { Config } from './Config';
import { generate } from './commands';

// TODO more tests
describe('commands/generate', () => {
    it('should generate types for petstore3 API', async () => {
        const document = petstore3 as unknown as OpenAPIObject;
        const config = new Config({
            documentLoader: {
                type: 'inline',
                content: JSON.stringify(document),
                documentType: 'json',
            },
            output: {
                type: 'inline',
            },
        });

        expect(await generate(config)).toMatchSnapshot();
    });

    it('should generate types for one-password-events API', async () => {
        // https://api.apis.guru/v2/specs/1password.com/events/1.0.0/openapi.json
        const document = onePasswordEvents as OpenAPIObject;
        const config = new Config({
            documentLoader: {
                type: 'inline',
                content: JSON.stringify(document),
                documentType: 'json',
            },
            output: {
                type: 'inline',
            },
        });

        expect(await generate(config)).toMatchSnapshot();
    });
});
