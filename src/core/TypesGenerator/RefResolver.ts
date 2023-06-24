import { URL } from 'url';
import {
    OpenAPIObject,
    ResponseObject,
    RequestBodyObject,
    PathItemObject,
} from 'openapi3-ts/oas30';
import get from 'lodash/get';

import {
    isPathItemObject,
    isResponseObject,
    isRequestBodyObject,
    isSchemaObject,
} from '../utils/typePredicates';
import { SchemaEntry } from '../types/schema';

type RefParsed = {
    root: OpenAPIObject;
    path: string[];
};

// TODO maybe on higher level along with entire schema validation
type ValidateSchemaName = (name: string) => void;

const validateSchemaName: ValidateSchemaName = name => {
    if (name.match(/\W/)) {
        throw new Error(
            'validateSchemaName: schema name must consists of ASCII based characters'
        );
    }
}

// TODO think of nested refs (inside components.schemas['schema'] there is $ref field)
// TODO support all cases from guide https://swagger.io/docs/specification/using-ref/
/**
 * Resolves objects in document by reference. Reference corresponds RFC3986.
 */
export class RefResolver {
    constructor(private document: OpenAPIObject) {}

    public isValidURL(ref: string): boolean {
        try {
            new URL(ref);
        } catch (error) {
            // TODO https://stackoverflow.com/q/75382275/13215082
            if (error !== null && typeof error === 'object' && 'code' in error && error.code === 'ERR_INVALID_URL') {
                return false;
            }

            throw error;
        }

        return true;
    }

    /**
     * Validates reference
     * @returns reference in format `#[\w/]+`
     */
    public validateRef(ref: string): string {
        if (this.isValidURL(ref)) {
            throw new Error(
                `RefResolver: reference to schema by URL isn't supported. Passed reference: ${ref}`
            );
        }

        if (!ref.startsWith('#')) {
            throw new Error(
                `RefResolver: reference to schema by different file isn't supported. Passed reference: ${ref}`
            );
        }

        if (!ref.match(/^#[\w/]+$/)) {
            throw new Error(
                `RefResolver: reference has invalid format. Passed reference: ${ref}`
            );
        }

        return ref;
    }

    public parseRef(ref: string): RefParsed {
        const refValidate = this.validateRef(ref);

        const pathRaw = refValidate
            // cut '#', since validateRef returns local references
            .substring(1)
            .split('/');

        // https://swagger.io/docs/specification/using-ref/#escape
        const pathUnescaped = pathRaw.map(pathPart => {
            // Order is worth. If tilde is unescaped firstly, it can be created one more '~1' combination.
            // For instance: '/test~01' becomes '/test/' instead of '/test~1'.
            const withUnescapedSlash = pathPart.replaceAll('~1', '/');
            const withUnescapedTilde = withUnescapedSlash.replaceAll('~0', '~');

            return withUnescapedTilde;
        });

        const path = pathUnescaped.filter(pathPart => pathPart.length !== 0);

        return {
            root: this.document,
            path,
        };
    }

    public resolvePath(ref: string): PathItemObject {
        const {
            root,
            path: refPath,
        } = this.parseRef(ref);

        const path: unknown = get(root, refPath, null);

        if (path === null) {
            throw new Error(
                `RefResolver: path resolving failed. Cannot resolve object by passed reference. Passed reference: ${ref}`
            );
        }

        if (!isPathItemObject(path)) {
            throw new Error(
                `RefResolver: path resolving failed. Resolved object isn't of type PathItemObject. Passed reference: ${ref}`
            );
        }

        return path;
    }

    public resolveRequestBody(ref: string): RequestBodyObject {
        const {
            root,
            path,
        } = this.parseRef(ref);

        const requestBody: unknown = get(root, path, null);

        if (requestBody === null) {
            throw new Error(
                `RefResolver: requestBody resolving failed. Cannot resolve object by passed reference. Passed reference: ${ref}`
            );
        }

        if (!isRequestBodyObject(requestBody)) {
            throw new Error(
                `RefResolver: requestBody resolving failed. Resolved object isn't of type RequestBodyObject. Passed reference: ${ref}`
            );
        }

        return requestBody;
    }

    public resolveResponse(ref: string): ResponseObject {
        const {
            root,
            path,
        } = this.parseRef(ref);

        const response: unknown = get(root, path, null);

        if (response === null) {
            throw new Error(
                `RefResolver: response resolving failed. Cannot resolve object by passed reference. Passed reference: ${ref}`
            );
        }

        if (!isResponseObject(response)) {
            throw new Error(
                `RefResolver: response resolving failed. Resolved object isn't of type ResponseObject. Passed reference: ${ref}`
            );
        }

        return response;
    }

    public resolveSchema(ref: string): SchemaEntry {
        const {
            root,
            path,
        } = this.parseRef(ref);

        const schemaObject: unknown = get(root, path, null);

        if (schemaObject === null) {
            throw new Error(
                `RefResolver: schema resolving failed. Cannot resolve object by passed reference. Passed reference: ${ref}`
            );
        }

        if (!isSchemaObject(schemaObject)) {
            throw new Error(
                `RefResolver: schema resolving failed. Resolved object isn't of type SchemaObject. Passed reference: ${ref}`
            );
        }

        const schemaName = path.at(-1) ?? null;

        if (schemaName === null) {
            throw new Error(
                `RefResolver: schema resolving failed. Schema name isn't valid. Passed reference: ${ref}`
            );
        }
        validateSchemaName(schemaName);

        return [schemaName, schemaObject];
    }
}
