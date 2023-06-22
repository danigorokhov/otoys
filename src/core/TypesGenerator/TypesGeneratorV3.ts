import {
    OpenAPIObject,
    PathItemObject,
    SchemaObject,
} from 'openapi3-ts/oas30';

import { Registry } from '../Registry';
import { SchemaName } from '../types/schema';
import { PathCollector } from './PathCollector';
import { RefResolver } from './RefResolver';

export class TypesGeneratorV3 {
    constructor(private registry: Registry, private document: OpenAPIObject) {}

    public async generate() {
        this.prepare();

        this.createASTNodes();

        this.print();
    }

    private prepare() {
        const collector = new PathCollector(
            this.document.paths,
            this.registry.config.pathWhitelist,
        );
        const collectedPaths = collector.collect();

        this.resolveSchemas(collectedPaths);
    }

    // TODO Particular order = BFS, which we will reverted to firstly generate base types
    private resolveSchemas(paths: PathItemObject[]): Map<SchemaName, SchemaObject> {
        const schemas = new Map<SchemaName, SchemaObject>();

        for (const _path of paths) {
            // ref – https://swagger.io/specification/#reference-object-example
        }
        // create queue based on paths
        // TODO handle unnamed schemas in paths
        // handle queue

        return schemas;
    }

    // TODO rename
    private createASTNodes() {
        this.createASTNodeFromSchema();
    }
    private createASTNodeFromSchema() {
        throw new Error("Not implemented createASTNodeFromSchema");
    }

    private print() {
        this.createASTPrinter();
        this.createOutputFile();
    }
    private createASTPrinter() {
        throw new Error("Not implemented createASTPrinter");
    }
    private createOutputFile() {
        throw new Error("Not implemented createOutputFile");
    }
}
