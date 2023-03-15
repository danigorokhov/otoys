import { OpenAPIObject } from 'openapi3-ts';

import { Registry } from '../Registry';

export class TypesGeneratorV3 {
    constructor(private registry: Registry, private document: OpenAPIObject) {}

    public async generate() {
        this.prepare();

        this.createASTNodes();

        this.print();
    }

    // TODO rename
    private prepare() {
        this.collectPaths();
        this.resolveSchemas();
    }
    private collectPaths() {}
    // TODO Particular order = BFS, which we will reverted to first generate base types
    private resolveSchemas() {}

    private createASTNodes() {
        this.createASTNodeFromSchema();
    }
    private createASTNodeFromSchema() {}

    private print() {
        this.createOutputFile();
        this.createASTPrinter();
    }
    private createOutputFile() {}
    private createASTPrinter() {}
}
