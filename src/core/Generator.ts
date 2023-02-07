import { mkdir, writeFile } from 'fs/promises';
import {
    ComponentsObject,
    ContentObject,
    isReferenceObject,
    OpenAPIObject,
    PathItemObject,
    ReferenceObject,
    ResponseObject,
    SchemaObject,
} from 'openapi3-ts';
import { resolve } from 'path';
import ts, { factory } from 'typescript';

import { Registry } from './Registry';

// TODO extract to helpers
type GetSchemaNameFromRef = ($ref: string) => string;
const getSchemaNameFromRef: GetSchemaNameFromRef = $ref => {
    // TODO
    return $ref.replace(/#\/components\/schemas\//, '');
};

type SchemaName = string;
type SchemaDescriptor = NonNullable<ComponentsObject['schemas']>[SchemaName];
type SchemaEntry = [SchemaName, SchemaDescriptor];

type PathEntry = [string, PathItemObject];

// type NodeId = number;
// type NodeIdToProperties = Map<NodeId, ts.TypeNode[]>;

// type SchemaQueueItem = {
//     descriptor: SchemaDescriptor;
//     idToWrite: NodeId;
//     idToRead?: NodeId;
// };

export class Generator {
    constructor(private registry: Registry, private document: OpenAPIObject) {}

    private resolveOutputDir(): string {
        return resolve(process.cwd(), this.registry.config.output);
    }

    private gatherSchemasToGenerate(): SchemaEntry[] {
        const documentSchemas = this.document.components?.schemas || {};

        // TODO rewrite
        if (this.registry.config.pathWhitelist?.length && this.registry.config.pathWhitelist.length > 0) {
            const schemaNames: Set<SchemaName> = new Set();

            this.registry.config.pathWhitelist.forEach(pathRule => {
                const regExp = new RegExp(pathRule.regExp);

                // TODO handle any for descriptor
                const pathEntries: PathEntry[] = Object.entries(this.document.paths);
                pathEntries.forEach(([path, pathDescriptor]) => {
                    if (!path.match(regExp)) {
                        return;
                    }

                    const operationObjects = [
                        pathDescriptor.get,
                        pathDescriptor.put,
                        pathDescriptor.post,
                        pathDescriptor.delete,
                        pathDescriptor.options,
                        pathDescriptor.head,
                        pathDescriptor.patch,
                        pathDescriptor.trace,
                    ];

                    // TODO requestBody + responses
                    operationObjects.forEach(operationObject => {
                        if (!operationObject) {
                            return;
                        }

                        const contentObjects: ContentObject[] = [];

                        // TODO handle any for keys
                        const responseDescriptors: (ResponseObject | ReferenceObject)[] = Object.values(operationObject.responses);
                        responseDescriptors.forEach(descriptor => {
                            // TODO maybe ref isn't schema
                            if (isReferenceObject(descriptor)) {
                                schemaNames.add(getSchemaNameFromRef(descriptor.$ref));
                                return;
                            }

                            if (descriptor.content) {
                                contentObjects.push(descriptor.content);
                            }
                        });

                        if (operationObject.requestBody) {
                            if (isReferenceObject(operationObject.requestBody)) {
                                schemaNames.add(getSchemaNameFromRef(operationObject.requestBody.$ref));
                            } else {
                                contentObjects.push(operationObject.requestBody.content);
                            }
                        }

                        const mediaTypeObjects = contentObjects.flatMap(descriptor => Object.values(descriptor));
                        mediaTypeObjects.forEach(object => {
                            if (!object.schema) {
                                return;
                            }

                            if (isReferenceObject(object.schema)) {
                                schemaNames.add(getSchemaNameFromRef(object.schema.$ref));
                                return;
                            }

                            // TODO add object.schema to types. Now it is ignoring since all schemas expected in components.schemas
                        });
                    });
                });
            });

            // TODO resolve dependencies for schemas
            const schemaEntries: SchemaEntry[] = [];
            const schemasNamesArray = Array.from(schemaNames);
            schemasNamesArray.forEach(schemaName => {
                if (!documentSchemas[schemaName]) {
                    return;
                }

                schemaEntries.push([schemaName, documentSchemas[schemaName]]);
            });

            return schemaEntries;
        }

        return Object.entries(documentSchemas);
    }

    private mapRefObjectToTypeNode(descriptor: ReferenceObject): [ts.Identifier, ts.TypeNode] {
        const refSchemaName = getSchemaNameFromRef(descriptor.$ref);

        const refSchemaIdentifier = factory.createIdentifier(refSchemaName);
        const refSchemaTypeNode = factory.createTypeReferenceNode(refSchemaIdentifier);

        return [refSchemaIdentifier, refSchemaTypeNode];
    }

    private mapSchemaObjectToTypeNode(object: SchemaObject, refsToImport: ts.Identifier[]): ts.TypeNode {
        // TODO support it
        if (Array.isArray(object.type) || object.type === undefined) {
            throw new Error('Unimplemented: object.type cannot be array or undefined');
        }

        // TODO enum
        // TODO required fields
        // TODO all properties from SchemaObject

        switch (object.type) {
            case 'null':
                return factory.createLiteralTypeNode(
                    factory.createNull(),
                )
            case 'boolean':
                return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
            case 'integer':
                return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
            case 'number':
                return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
            case 'string':
                return factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
            case 'object':
                if (!object.properties) { // TODO support additionalProperties
                    throw new Error('Unexpected value undefined for properties inside schema object with type object');
                }

                const propertySignatures: ts.PropertySignature[] = [];
                const propertiesEntries = Object.entries(object.properties);

                propertiesEntries.forEach(([name, schemaObject]) => {
                    const property = factory.createPropertySignature(
                        undefined,
                        factory.createIdentifier(name),
                        undefined,
                        this.generateSchemaTypeNode(schemaObject, refsToImport),
                    );

                    propertySignatures.push(property);
                });

                return factory.createTypeLiteralNode(propertySignatures);
            case 'array':
                if (!object.items) {
                    throw new Error('Unexpected value undefined for items inside schema object with type array');
                }

                return factory.createArrayTypeNode(
                    this.generateSchemaTypeNode(object.items, refsToImport),
                );
        }
    }

    // private generateSchemaNodes(name: SchemaName, descriptor: SchemaDescriptor): ts.NodeArray<ts.TypeAliasDeclaration> {
    //     // TODO transform to import statements
    //     const refsToImport: ts.Identifier[] = [];

    //     // generateSchemaAST -> after schemaFile, before sourceFile
    //     // generateSchemaAST -> handleRefObject (mapRefObjectToTypeNode)
    //     // mapSchemaObjectToTypeNode -> mapSchemaObjectToTypeNode -> return ts.TypeNode
    //     // input schemaObject -> isRefObject -> save node as result
    //     // input schemaObject -> !isRefObject -> literalTypeNode with properties
    //     // rFunc(i: SchemaObject | ReferenceObject): ts.TypeNode; ref via mapRefObjectToTypeNode, schema via mapSchemaObjectToTypeNode
    //     // and if schema isn't primitive rFunc(notPrimitiveValue)
    //     // wrap result into typeAlias with export -> wrap into nodeArray

    //     const nodeIdResult = 0;
    //     let nodeId: NodeId = nodeIdResult;
    //     const nodeIdToProperties: NodeIdToProperties = new Map();

    //     let queueIx = 0;
    //     const queue: SchemaQueueItem[] = [{
    //         descriptor,
    //         idToWrite: nodeId,
    //     }];

    //     while (queueIx < queue.length) {
    //         const queueItem = queue[queueIx];

    //         if (typeof queueItem.idToRead === 'number' && nodeIdToProperties.has(queueItem.idToRead)) {
    //             // TODO
    //             const properties = nodeIdToProperties.get(queueItem.idToRead);
    //             factory.createTypeLiteralNode(properties);

    //             queueIx++;
    //             continue;
    //         }

    //         if (isReferenceObject(queueItem.descriptor)) {
    //             const [refSchemaIdentifier, refSchemaTypeNode] = this.mapRefObjectToTypeNode(queueItem.descriptor);

    //             refsToImport.push(refSchemaIdentifier);
    //             nodeIdToProperties.set(queueItem.idToWrite, [refSchemaTypeNode]);
    //         } else {
    //             // TODO isNotPrimitive
    //             const objectSchemaTypeNode = mapSchemaObjectToTypeNode(queueItem.descriptor);

    //             nodeIdToProperties.set(queueItem.idToWrite, [objectSchemaTypeNode]);
    //         }

    //         queueIx++;
    //     }

    //     const schemaTypeNode = nodeIdToProperties.get(nodeIdResult)?.[0] ?? null;
    //     if (!schemaTypeNode) {
    //         // TODO
    //         throw new Error('Unexpected empty schema type node');
    //     }

    //     const modifierExport = factory.createModifier(ts.SyntaxKind.ExportKeyword);

    //     const typeAliasSchema = factory.createTypeAliasDeclaration(
    //         [modifierExport],
    //         factory.createIdentifier(name),
    //         undefined,
    //         schemaTypeNode,
    //     );

    //     return factory.createNodeArray([typeAliasSchema]);
    // }

    private generateSchemaTypeNode(descriptor: SchemaDescriptor, refsToImport: ts.Identifier[]): ts.TypeNode {
        if (isReferenceObject(descriptor)) {
            const [refSchemaIdentifier, refSchemaTypeNode] = this.mapRefObjectToTypeNode(descriptor);

            refsToImport.push(refSchemaIdentifier);

            return refSchemaTypeNode;
        } else {
            // TODO isNotPrimitive
            const schemaTypeNode = this.mapSchemaObjectToTypeNode(descriptor, refsToImport);

            return schemaTypeNode;
        }
    }

    private generateImportDeclarations(identifiers: ts.Identifier[]): ts.ImportDeclaration[] {
        // TODO delete duplicates
        return identifiers.map(identifier => {
            return factory.createImportDeclaration(
                undefined,
                factory.createImportClause(
                    false,
                    undefined,
                    factory.createNamedImports([factory.createImportSpecifier(
                        false,
                        undefined,
                        identifier,
                    )])
                ),
                factory.createStringLiteral(`./${identifier.text}`), // TODO check
            )
        });
    }

    private generateSchemaNodes(name: SchemaName, descriptor: SchemaDescriptor): ts.NodeArray<ts.ImportDeclaration | ts.TypeAliasDeclaration> {
        const refsToImport: ts.Identifier[] = [];

        const schemaTypeNode = this.generateSchemaTypeNode(descriptor, refsToImport);

        const refsImportDeclarations = this.generateImportDeclarations(refsToImport);

        const modifierExport = factory.createModifier(ts.SyntaxKind.ExportKeyword);
        const schemaTypeAlias = factory.createTypeAliasDeclaration(
            [modifierExport],
            factory.createIdentifier(name),
            undefined,
            schemaTypeNode,
        );

        return factory.createNodeArray([...refsImportDeclarations, schemaTypeAlias]);
    }

    public async generateSchemas() {
        const output = this.resolveOutputDir();
        const outputSchemas = resolve(output, 'schemas');

        await mkdir(outputSchemas, { recursive: true });

        const schemasEntries = this.gatherSchemasToGenerate();

        for (const [schemaName, schemaDescriptor] of schemasEntries) {
            // TODO fix "-" and 0-9 as start
            // TODO use limited count of threads
            const schemaFileName = `${schemaName}.ts`;
            const schemaFile = resolve(outputSchemas, schemaFileName);

            const nodes = this.generateSchemaNodes(schemaName, schemaDescriptor);

            // TODO cleanup output directory

            const sourceFile = ts.createSourceFile(
                schemaFileName,
                "",
                ts.ScriptTarget.ESNext, // TODO setup via config
                true, // TODO investigate what is it
                ts.ScriptKind.TS,
            );

            const printer = ts.createPrinter();

            const schemaFileContent = printer.printList(
                ts.ListFormat.MultiLine, // TODO setup via config
                nodes,
                sourceFile,
            );

            await writeFile(schemaFile, schemaFileContent);
        }

        // TODO generate other schemas import
        // TODO fill out Schema type
    }
}
