import {
    SchemaObject,
    SchemaObjectType,
    isReferenceObject,
} from 'openapi3-ts/oas30';
import {
    Node,
    NodeArray,
    PropertySignature,
    QuestionToken,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
    factory,
} from 'typescript';

import { SchemaEntry, SchemaName } from '../types/schema';
import { RefResolver } from './RefResolver';

export class ASTBuilderTypes {
    constructor(private schemas: Map<SchemaName, SchemaObject>, private refResolver: RefResolver) {}

    public getSchemasToGenerate(schemas: Map<SchemaName, SchemaObject>): SchemaEntry[] {
        const schemasArray = Array.from(schemas);

        const schemasArrayFiltered = schemasArray.filter(schemaEntry => {
            const [schemaName] = schemaEntry;

            return (
                !schemaName.startsWith('UnnamedSchema') &&
                !schemaName.startsWith('AuxillarySchema')
            );
        });

        return schemasArrayFiltered;
    }

    // TODO to base class — ASTBuilderBase
    public buildReferenceNode(identifier: string, typeParameters?: readonly TypeNode[]): TypeReferenceNode {
        return factory.createTypeReferenceNode(
            factory.createIdentifier(identifier),
            typeParameters,
        );
    }

    // TODO to base class — ASTBuilderBase
    public buildRecord(key: TypeNode, value: TypeNode): TypeReferenceNode {
        return this.buildReferenceNode(
            'Record',
            [key, value],
        );
    }

    public inferSchemaType(schema: SchemaObject): SchemaObjectType | null {
        if (schema.items) {
            return 'array';
        }

        if (schema.properties) {
            return 'object';
        }

        return null;
    }

    // TODO extract
    // TODO option to generate `[propertyName: string]: any` when additionalProperties is true
    // Cannot be used by default. Example — https://clck.ru/34o4ek.
    // https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
    public useAdditionalProperties(
        schema: SchemaObject,
        objectTypeNode: TypeNode,
        options: { isEnabled: boolean },
    ): TypeNode {
        const { isEnabled } = options;
        if (!isEnabled) {
            return objectTypeNode;
        }

        // additionalProperties defaults to true https://swagger.io/specification/v3/#schema-object
        // TypeScript object by default can be extended by new properties =>
        // => take into account additionalProperties only if it's ReferenceObject or SchemaObject
        const propertiesAdditional = schema.additionalProperties ?? true;
        let propertiesAdditionalNode: TypeReferenceNode | null = null;

        if (isReferenceObject(propertiesAdditional)) {
            const [schemaName] = this.refResolver.resolveSchema(propertiesAdditional.$ref);

            propertiesAdditionalNode = this.buildRecord(
                factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
                this.buildReferenceNode(schemaName),
            );
        } else if (typeof propertiesAdditional === 'object') {
            propertiesAdditionalNode = this.buildRecord(
                factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
                this.buildTypeNode(propertiesAdditional),
            );
        }

        // TODO comment for additionalProperties
        if (propertiesAdditionalNode) {
            return factory.createIntersectionTypeNode([
                objectTypeNode,
                propertiesAdditionalNode,
            ]);
        }
        return objectTypeNode;
    }

    // TODO option to create enum instead of type union
    public buildTypeNode(schema: SchemaObject): TypeNode {
        let node: TypeNode | null = null;

        if (schema.type) {
            // TODO fix openapi3-ts — schema.type cannot be 'null'
            // https://swagger.io/docs/specification/data-models/data-types/
            // TODO fix openapi3-ts — schema.type cannot be array of types
            // https://swagger.io/docs/specification/data-models/data-types/
            switch (schema.type) {
                case 'integer':
                case 'number': {
                    if (schema.enum) {
                        const numericLiterals = schema.enum.map(enumItem => {
                            if (typeof enumItem !== 'number' && enumItem !== null) {
                                throw new Error(
                                    // TODO add schema name to error message
                                    `ASTBuilderTypes: enum item should be number for schema of type "${schema.type}"`
                                );
                            }

                            const enumItemTyped: number | null = enumItem;

                            if (enumItemTyped === null) {
                                return factory.createLiteralTypeNode(
                                    factory.createNull(),
                                );
                            }

                            return factory.createLiteralTypeNode(
                                factory.createNumericLiteral(enumItemTyped),
                            );
                        });

                        node = factory.createUnionTypeNode(numericLiterals);
                    } else {
                        // TODO to comments format, exclusiveMinimum, exclusiveMaximum, minimum, maximum, multipleOf
                        node = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
                    }

                    break;
                } case 'string': {
                    if (schema.enum) {
                        const stringLiterals = schema.enum.map(enumItem => {
                            if (enumItem === null) {
                                return factory.createLiteralTypeNode(
                                    factory.createNull(),
                                );
                            }

                            return factory.createLiteralTypeNode(
                                factory.createStringLiteral(String(enumItem)),
                            );
                        });

                        node = factory.createUnionTypeNode(stringLiterals);
                    } else {
                        // TODO to comments format, pattern
                        node = factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                    }

                    break;
                } case 'boolean': {
                    node = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
                    break;
                } case 'array': {
                    // TODO fix openapi3-ts — items field is required here
                    // https://swagger.io/docs/specification/data-models/data-types/#array
                    if (!schema.items) {
                        throw new Error(
                            'ASTBuilderTypes: field "items" must be provided for schema of type "array"',
                        );
                    }

                    let nodeItems: TypeNode;

                    if (isReferenceObject(schema.items)) {
                        const [schemaName] = this.refResolver.resolveSchema(schema.items.$ref);

                        nodeItems = this.buildReferenceNode(schemaName);
                    } else {
                        nodeItems = this.buildTypeNode(schema.items);
                    }

                    // TODO support tuple if length fields were provided
                    // TODO to comments maxLength, minLength, maxItems, minItems, uniqueItems
                    node = factory.createArrayTypeNode(nodeItems);

                    break;
                } case 'object': {
                    const properties = schema.properties || {};
                    const propertiesRequired = new Set(schema.required);

                    const propertiesSignatures: PropertySignature[] = [];

                    for (const [name, property] of Object.entries(properties)) {
                        let propertyNode: TypeNode;

                        if (isReferenceObject(property)) {
                            const [schemaName] = this.refResolver.resolveSchema(property.$ref);

                            propertyNode = this.buildReferenceNode(schemaName);
                        } else {
                            propertyNode = this.buildTypeNode(property);
                        }

                        let questionToken: QuestionToken | null = null;
                        if (!propertiesRequired.has(name)) {
                            questionToken = factory.createToken(SyntaxKind.QuestionToken);
                        }

                        const propertySignature = factory.createPropertySignature(
                            // Modifiers
                            undefined,
                            name,
                            questionToken ?? undefined,
                            propertyNode,
                        );

                        propertiesSignatures.push(propertySignature);
                    }

                    // TODO to comments maxProperties, minProperties, readOnly, writeOnly
                    const nodeObjectType = factory.createTypeLiteralNode(propertiesSignatures);

                    node = this.useAdditionalProperties(
                        schema,
                        nodeObjectType,
                        // TODO option in config to enable
                        { isEnabled: false },
                    );

                    break;
                }
            }
        }

        // TODO in docs, that we cannot express with TS,
        // that data should match only one or any schemas
        const oneOfOrAnyOf = schema.oneOf || schema.anyOf;
        if (!node && oneOfOrAnyOf) {
            const nodesToUnion = oneOfOrAnyOf.map(item => {
                if (isReferenceObject(item)) {
                    const [schemaName] = this.refResolver.resolveSchema(item.$ref);

                    return this.buildReferenceNode(schemaName);
                }

                return this.buildTypeNode(item);
            });

            node = factory.createUnionTypeNode(nodesToUnion);
        }

        // If schemas from allOf conflict with each other,
        // generated type will not be convenient in use. Example — https://clck.ru/34oAWs.
        // It responsibility of document provider.
        if (!node && schema.allOf) {
            const nodesAllOf = schema.allOf.map(item => {
                if (isReferenceObject(item)) {
                    const [schemaName] = this.refResolver.resolveSchema(item.$ref);

                    return this.buildReferenceNode(schemaName);
                }

                return this.buildTypeNode(item);
            });

            node = factory.createIntersectionTypeNode(nodesAllOf);
        }

        const schemaTypeInfered = this.inferSchemaType(schema);
        if (!node && schemaTypeInfered) {
            return this.buildTypeNode({
                ...schema,
                type: schemaTypeInfered,
            });
        }

        // TODO in docs, that otoys doesn't support schema.not

        // TODO support schema.discriminator

        // TODO support schema.xml

        // TODO strict mode: if schema.nullable defined, schema.enum must contain 'null'
        if (schema.nullable) {
            const nodeNullType = factory.createLiteralTypeNode(
                factory.createNull(),
            );

            if (!node) {
                node = nodeNullType;
            } else {
                node = factory.createUnionTypeNode([
                    node,
                    nodeNullType,
                ]);
            }
        }

        // TODO to comments deprecated, description, externalDocs,
        // example/examples, default, title

        if (node === null) {
            node = factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
        }

        return node;
    }

    public buildTypeAliasDeclaration(entry: SchemaEntry): TypeAliasDeclaration {
        const [name, object] = entry;

        const modifierExport = factory.createModifier(SyntaxKind.ExportKeyword);
        return factory.createTypeAliasDeclaration(
            [modifierExport],
            factory.createIdentifier(name),
            // Generics
            undefined,
            this.buildTypeNode(object),
        );
    }

    public build(): NodeArray<Node> {
        const schemasToGenerate = this.getSchemasToGenerate(this.schemas);

        const nodes = schemasToGenerate.map(schema => this.buildTypeAliasDeclaration(schema));

        return factory.createNodeArray(nodes);
    }
}
