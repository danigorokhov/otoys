import Ajv from 'ajv';
// // import Ajv from 'ajv-draft-04';
// TODO figure out why official openapi schema contains incorrect formats inside. Maybe problem inside ajv-draft-04 (uri, regex, email, uri-reference)
// import { openapi as OpenApiSchema } from '@apidevtools/openapi-schemas';
import got from 'got';
import { OpenAPIObject } from 'openapi3-ts';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

// // import OpenApiSchemaV3 from './schemas/v3.json';
import { Registry } from './core/Registry';

// TODO to registry
const ajv = new Ajv({ strictTypes: false });
// const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")
// ajv.addMetaSchema(draft6MetaSchema)
// const validate = ajv.compile<OpenAPIObject>(OpenApiSchemaV3);
const validate = ajv.compile<OpenAPIObject>({});

export class DocumentHandler {
    static validate(document: unknown) {
        // TODO Support OpenAPIv2 here

        if (validate(document)) {
            return document;
        }

        if (validate.errors) {
            console.error(validate.errors);
            throw new Error('Validation error');
        }
        throw new Error('Unexpected validation error');
    }

    constructor(private registry: Registry) {}

    private async fetch() {
        if (this.registry.config.document.type === 'remote') {
            return got(this.registry.config.document.url).json();
        }

        const path = resolve(process.cwd(), this.registry.config.document.path);

        const documentLocal = await readFile(path, { encoding: 'utf8' });

        return JSON.parse(documentLocal);
    }

    public async load() {
        const document = await this.fetch();

        const documentValidated = DocumentHandler.validate(document);

        return documentValidated;
    }
}
