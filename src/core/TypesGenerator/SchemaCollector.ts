import {
    ReferenceObject,
    ResponsesObject,
    ResponseObject,
    ContentObject,
    RequestBodyObject,
    OperationObject,
    PathItemObject,
    SchemaObject,
    isReferenceObject,
} from 'openapi3-ts/oas30';

import { SchemaName, SchemaEntry } from '../types/schema';
import { RefResolver } from './RefResolver';

// TODO change API of collect() — return { name: SchemaName, object: SchemaObject, meta: { isUnnamed: boolean } }[]
// TODO flag in config to generate types for UnnamedSchemas

// TODO split into different collectors
export class SchemaCollector {
    unnamedSchemaCounter = 0;
    auxillarySchemaCounter = 0;

    constructor(private paths: PathItemObject[], private refResolver: RefResolver) {}

    public createUnnamedSchema(schema: SchemaObject): SchemaEntry {
        this.unnamedSchemaCounter++;

        // TODO generate with comment, where there is more info:
        // `${path}_RequestBody_${mediaType}` or `${path}_Response_${statusCode}_${mediaType}`
        return [`UnnamedSchema${this.unnamedSchemaCounter}`, schema];
    }

    public createAuxillarySchema(schema: SchemaObject): SchemaEntry {
        this.auxillarySchemaCounter++;

        return [`AuxillarySchema${this.auxillarySchemaCounter}`, schema];
    }

    public saveSchema(
        schema: SchemaObject | ReferenceObject,
        storage: { map: Map<SchemaName, SchemaObject>, entries: SchemaEntry[] },
        meta: { schemaField?: boolean } = {},
    ) {
        const { map, entries } = storage;

        let entry: SchemaEntry;

        if (isReferenceObject(schema)) {
            // TODO why resolved schema cannot be ref to another schema
            entry = this.refResolver.resolveSchema(schema.$ref);
        } else if (meta.schemaField) {
            entry = this.createAuxillarySchema(schema);
        } else {
            entry = this.createUnnamedSchema(schema);
        }

        const [name, object] = entry;
        if (!map.has(name)) {
            map.set(name, object);
            entries.push(entry);
        }
    }

    public collect(): Map<SchemaName, SchemaObject> {
        // TODO parameters https://swagger.io/specification/v3/#parameter-object

        const schemasMap = new Map<SchemaName, SchemaObject>();

        const pathsItemObjects: PathItemObject[] = [];
        const pathsSet = new Set<PathItemObject>();

        this.paths.forEach(path => {
            if (pathsSet.has(path)) return;

            pathsSet.add(path);
            pathsItemObjects.push(path);
        });

        const operationObjects: OperationObject[] = [];
        let pathItemObjectIndex = 0;
        while (pathItemObjectIndex < pathsItemObjects.length) {
            // TODO fix openapi3-ts — if $ref defined, other fields will be ignored
            // https://swagger.io/docs/specification/using-ref/#sibling
            const path = pathsItemObjects[pathItemObjectIndex];

            if (isReferenceObject(path)) {
                const resolvedPath = this.refResolver.resolvePath(path.$ref);

                if (!pathsSet.has(path)) {
                    pathsSet.add(resolvedPath);
                    pathsItemObjects.push(resolvedPath);
                }
            } else {
                if (path.delete) operationObjects.push(path.delete);
                if (path.get) operationObjects.push(path.get);
                if (path.head) operationObjects.push(path.head);
                if (path.options) operationObjects.push(path.options);
                if (path.patch) operationObjects.push(path.patch);
                if (path.post) operationObjects.push(path.post);
                if (path.put) operationObjects.push(path.put);
                if (path.trace) operationObjects.push(path.trace);
            }

            pathItemObjectIndex++;
        }

        const requestBodyObjects: RequestBodyObject[] = [];
        const responsesObjects: ResponsesObject[] = [];

        for (const operationObject of operationObjects) {
            // TODO handle callbacks https://swagger.io/specification/v3/#callback-object
            // enable schema collection from callback via flag from config
            const {
                requestBody,
                responses,
            } = operationObject;

            if (requestBody && isReferenceObject(requestBody)) {
                const requestBodyResolved = this.refResolver.resolveRequestBody(requestBody.$ref);
                requestBodyObjects.push(requestBodyResolved);
            } else if (requestBody) {
                requestBodyObjects.push(requestBody);
            }

            responsesObjects.push(responses);
        }

        const contentObjects: ContentObject[] = [];

        for (const requestBodyObject of requestBodyObjects) {
            contentObjects.push(requestBodyObject.content);
        }

        const responseObjects: ResponseObject[] = [];

        for (const responsesObject of responsesObjects) {
            for (const [, responseObject] of Object.entries<ResponseObject | ReferenceObject | undefined>(responsesObject)) {
                // TODO validate statusCode (it can be stringified number or 'default')
                if (responseObject && isReferenceObject(responseObject)) {
                    const responseResolved = this.refResolver.resolveResponse(responseObject.$ref);
                    responseObjects.push(responseResolved);
                } else if (responseObject) {
                    responseObjects.push(responseObject);
                }
            }
        }

        for (const responseObject of responseObjects) {
            // TODO handle headers https://swagger.io/specification/v3/#response-object
            // enable schema collection from headers via flag from config
            if (responseObject.content) contentObjects.push(responseObject.content);
        }

        const schemaEntries: SchemaEntry[] = [];

        for (const contentObject of contentObjects) {
            for (const mediaTypeObject of Object.values(contentObject)) {
                if (!mediaTypeObject.schema) continue;

                this.saveSchema(
                    mediaTypeObject.schema,
                    { map: schemasMap, entries: schemaEntries },
                );
            }
        }

        let schemaEntryIndex = 0;
        while (schemaEntryIndex < schemaEntries.length) {
            const [, schemaObject] = schemaEntries[schemaEntryIndex];

            const schemasNested: (SchemaObject | ReferenceObject)[] = [];

            if (schemaObject.allOf) {
                schemasNested.push(...schemaObject.allOf);
            }
            if (schemaObject.oneOf) {
                schemasNested.push(...schemaObject.oneOf);
            }
            if (schemaObject.anyOf) {
                schemasNested.push(...schemaObject.anyOf);
            }
            if (schemaObject.not) {
                schemasNested.push(schemaObject.not);
            }
            if (schemaObject.additionalProperties && typeof schemaObject.additionalProperties !== 'boolean') {
                schemasNested.push(schemaObject.additionalProperties);
            }
            if (schemaObject.items) {
                schemasNested.push(schemaObject.items);
            }
            if (schemaObject.properties) {
                for (const property of Object.values(schemaObject.properties)) {
                    schemasNested.push(property);
                }
            }

            for (const schema of schemasNested) {
                this.saveSchema(
                    schema,
                    { map: schemasMap, entries: schemaEntries },
                    { schemaField: true }
                );
            }

            schemaEntryIndex++;
        }

        return schemasMap;
    }
}
