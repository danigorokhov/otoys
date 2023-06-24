import {
    OpenAPIObject,
    PathItemObject,
    SchemaObject,
} from 'openapi3-ts/oas30';
import { NodeArray, Node } from 'typescript';

import { Registry } from '../Registry';
import { SchemaName } from '../types/schema';
import { PathCollector } from './PathCollector';
import { SchemaCollector } from './SchemaCollector';
import { ASTBuilderTypes } from './ASTBuilderTypes';
import { RefResolver } from './RefResolver';

export class TypesGeneratorV3 {
    paths: PathItemObject[] = [];
    schemas: Map<SchemaName, SchemaObject> = new Map();
    refResolver: RefResolver;

    constructor(private registry: Registry, private document: OpenAPIObject) {
        this.refResolver = new RefResolver(document);
    }

    public generate(): NodeArray<Node> {
        this.prepare();

        return this.buildAST();
    }

    private prepare() {
        const pathCollector = new PathCollector(
            this.document.paths,
            this.registry.config.pathWhitelist,
        );
        this.paths = pathCollector.collect();

        const schemaCollector = new SchemaCollector(
            this.paths,
            this.refResolver,
        );
        this.schemas = schemaCollector.collect();
    }

    private buildAST(): NodeArray<Node> {
        const builder = new ASTBuilderTypes(
            this.schemas,
            this.refResolver,
        );

        return builder.build();
    }
}
