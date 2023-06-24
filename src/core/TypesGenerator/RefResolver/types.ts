import {
    OpenAPIObject,
    PathsObject,
    ComponentsObject,
} from 'openapi3-ts/oas30';

export type RefParsed = {
    root: OpenAPIObject;
    path: string[];
};

export type PathItemObjectResolved = PathsObject[keyof PathsObject];

type ComponentsObjectRequired = Required<ComponentsObject>

export type RequestBodyObjectResolved = ComponentsObjectRequired['requestBodies'][
    keyof ComponentsObjectRequired['requestBodies']
];

export type ResponseObjectResolved = ComponentsObjectRequired['responses'][
    keyof ComponentsObjectRequired['responses']
];
