import { expect, describe, it } from '@jest/globals';
import { OpenAPIObject } from 'openapi3-ts/oas30';

import { SchemaCollector } from './SchemaCollector';
import { RefResolver } from './RefResolver';
import { PathCollector } from './PathCollector';

import petstore3 from '../../../examples/v3/petstore3.json';
import onePasswordEvents from '../../../examples/v3/one-password-events.json';

describe('TypesGenerator/TypesGeneratorV3/SchemaCollector', () => {
    // TODO more detailed tests
    it('should collect schemas for petstore3 API', () => {
        // TODO figure out why petstore3 cannot be assigned to OpenAPIObject
        const document = petstore3 as unknown as OpenAPIObject;
        const resolver = new RefResolver(document);
        const pathCollector = new PathCollector(document.paths, undefined);
        const paths = pathCollector.collect();
        const schemaCollector = new SchemaCollector(paths, resolver);

        expect(schemaCollector.collect()).toMatchSnapshot();
    });

    it('should collect schemas for one-password-events API', () => {
        // https://api.apis.guru/v2/specs/1password.com/events/1.0.0/openapi.json
        const document = onePasswordEvents as OpenAPIObject;
        const resolver = new RefResolver(document);
        const pathCollector = new PathCollector(document.paths, undefined);
        const paths = pathCollector.collect();
        const schemaCollector = new SchemaCollector(paths, resolver);

        expect(schemaCollector.collect()).toMatchSnapshot();
    });
});
