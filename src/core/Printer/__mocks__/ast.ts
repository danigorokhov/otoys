import ts, { factory } from 'typescript';

export const nodesMock = factory.createNodeArray([
    factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier('Tag'),
        undefined,
        factory.createTypeLiteralNode([
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('id'),
                undefined,
                factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('name'),
                undefined,
                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
        ]),
    ),
    factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier('Category'),
        undefined,
        factory.createTypeLiteralNode([
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('id'),
                undefined,
                factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('name'),
                undefined,
                factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
        ]),
    ),
    factory.createTypeAliasDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier('Pet'),
        undefined,
        factory.createTypeLiteralNode([
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('category'),
                undefined,
                factory.createTypeReferenceNode(
                    factory.createIdentifier('Category'),
                    undefined,
                ),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('photoUrls'),
                undefined,
                factory.createArrayTypeNode(factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)),
            ),
            factory.createPropertySignature(
                undefined,
                factory.createIdentifier('tags'),
                undefined,
                factory.createArrayTypeNode(factory.createTypeReferenceNode(
                    factory.createIdentifier('Tag'),
                    undefined,
                )),
            ),
        ]),
    ),
]);

export const nodesPrintedMock = `export type Tag = {
    id: number;
    name: string;
};
export type Category = {
    id: number;
    name: string;
};
export type Pet = {
    category: Category;
    photoUrls: string[];
    tags: Tag[];
};
`;
