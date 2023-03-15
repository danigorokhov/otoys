import { OpenAPIObject } from 'openapi3-ts';

import { TypesGeneratorV3 } from './TypesGenerator';
import { Registry } from './Registry';

export class TypesGeneratorHandler {
    constructor(private registry: Registry, private document: OpenAPIObject) {}

    public generate() {
        return new TypesGeneratorV3(this.registry, this.document).generate();
    }
}
