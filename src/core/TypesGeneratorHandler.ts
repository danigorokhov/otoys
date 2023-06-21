import { OpenAPIObject } from 'openapi3-ts/oas30';

import { TypesGeneratorV3 } from './TypesGenerator';
import { Registry } from './Registry';

export class TypesGeneratorHandler {
    constructor(private registry: Registry, private document: OpenAPIObject) {}

    public generate() {
        // TODO use it only for v3.0
        return new TypesGeneratorV3(this.registry, this.document).generate();
    }
}
