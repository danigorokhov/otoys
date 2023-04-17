import { OpenAPIObject } from 'openapi3-ts';

import { Registry } from '../Registry';
import { PathCollector } from './PathCollector';

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
        const _collectedPaths = collector.collect();

        this.resolveSchemas();
    }

    // TODO Particular order = BFS, which we will reverted to firstly generate base types
    private resolveSchemas() {
        throw new Error("Not implemented resolveSchemas");
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
