import { resolve as resolvePath } from 'path';

type Resolve = (path: string) => unknown;

export const resolve: Resolve = path => {
    const pathResolved = resolvePath(path);

    return require(pathResolved);
};
