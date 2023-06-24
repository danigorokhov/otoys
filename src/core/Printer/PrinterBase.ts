import {
    ListFormat,
    Node,
    NodeArray,
    ScriptKind,
    ScriptTarget,
    SourceFile,
    createPrinter,
    createSourceFile,
} from 'typescript';

/**
 * Base class to implement printer.
 */
export abstract class PrinterBase {
    static createSourceFile(fileName: string = '') {
        return createSourceFile(
            fileName,
            // Default text in file
            '',
            ScriptTarget.ESNext, // TODO setup via config
            undefined,
            ScriptKind.TS,
        );
    }

    /**
     * Prints TypeScript nodes as a string
     * @param sourceFile TypeScript SourceFile, that provides context for nodes
     */
    static printAST(nodes: NodeArray<Node>, sourceFile: SourceFile) {
        const printer = createPrinter();

        return printer.printList(
            ListFormat.MultiLine,
            nodes,
            sourceFile,
        );
    }

    public abstract print(nodes: NodeArray<Node>): Promise<string>;
}
