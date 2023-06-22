import {
    OpenAPIObject,
    PathItemObject,
    SchemaObject,
} from 'openapi3-ts/oas30';

import { Registry } from '../Registry';
import { SchemaName } from '../types/schema';
import { PathCollector } from './PathCollector';
import { SchemaCollector } from './SchemaCollector';
import { RefResolver } from './RefResolver';

export class TypesGeneratorV3 {
    paths: PathItemObject[] = [];
    schemas: Map<SchemaName, SchemaObject> = new Map();
    refResolver: RefResolver;

    constructor(private registry: Registry, private document: OpenAPIObject) {
        this.refResolver = new RefResolver(document);
    }

    public async generate() {
        this.prepare();

        this.createASTNodes();

        this.print(); // TODO option to get result as a string
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

    // TODO rename
    private createASTNodes() {
        this.createASTNodeFromSchema();
    }
    private createASTNodeFromSchema() {
        throw new Error("Not implemented createASTNodeFromSchema");
    }

    private print() { // TODO use Printer
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
