import { expect, describe, it } from '@jest/globals';
import { OpenAPIObject } from 'openapi3-ts/oas30';

import { ASTBuilderTypes } from './ASTBuilderTypes';
import { SchemaCollector } from './SchemaCollector';
import { RefResolver } from './RefResolver';
import { PathCollector } from './PathCollector';

import petstore3 from '../../../examples/v3/petstore3.json';

describe('TypesGenerator/TypesGeneratorV3/ASTBuilderTypes', () => {
    // TODO more detailed tests
    it('should build AST for petstore3 API', () => {
        const document = petstore3 as unknown as OpenAPIObject;
        const resolver = new RefResolver(document);
        const pathCollector = new PathCollector(document.paths, undefined);
        const paths = pathCollector.collect();
        const schemaCollector = new SchemaCollector(paths, resolver);
        const schemas = schemaCollector.collect();
        const builder = new ASTBuilderTypes(schemas, resolver);

        expect(builder.build()).toMatchSnapshot();
    });
});

