import {
    ResponseObject,
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
        'content' in requestBody && typeof requestBody.content === 'object' && requestBody.content !== null
    );
};

// TODO deep validation
export const isResponseObject = (response: unknown): response is ResponseObject => {
    return (
        typeof response === 'object' && response !== null &&
        'description' in response && typeof response.description === 'string'
    );
};

// TODO deep validation
export const isSchemaObject = (schema: unknown): schema is SchemaObject => {
    return (
        typeof schema === 'object' && schema !== null
    );
};
