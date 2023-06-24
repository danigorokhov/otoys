export type GeneratorType = 'otoys' | 'swagger-typescript-api';

export type GeneratorSettings = {
    pathWhitelist: string;
    typeSuffix: string;
    type: GeneratorType;
};
