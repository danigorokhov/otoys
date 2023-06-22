import {
    ResponsesObject,
    RequestBodyObject,
    PathItemObject,
    SchemaObject,
} from 'openapi3-ts/oas30';

// TODO deep validation
export const isPathItemObject = (path: unknown): path is PathItemObject => {
    return (
        typeof path === 'object' && path !== null
    );
};

// TODO deep validation
export const isRequestBodyObject = (requestBody: unknown): requestBody is RequestBodyObject => {
    return (
        typeof requestBody === 'object' && requestBody !== null &&
        'content' in requestBody
    );
};

// TODO deep validation
export const isResponsesObject = (responses: unknown): responses is ResponsesObject => {
    return (
        typeof responses === 'object' && responses !== null
    );
};

// TODO deep validation
export const isSchemaObject = (schema: unknown): schema is SchemaObject => {
    return (
        typeof schema === 'object' && schema !== null
    );
};
