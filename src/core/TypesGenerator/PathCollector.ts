import { PathsObject, PathItemObject } from 'openapi3-ts';

import { Config } from '../Config';

export class PathCollector {
    constructor(private paths: PathsObject, private whitelist: Config['pathWhitelist']) {}

    public collect() {
        const collectedPaths: PathItemObject[] = [];

        let whitelistRegExp: RegExp | null = null;
        if (this.whitelist) {
            whitelistRegExp = new RegExp(this.whitelist);
        }

        const pathEntries = Object.entries<PathItemObject>(this.paths);

        for (const [path, pathItem] of pathEntries) {
            if (this.matchPath(path, whitelistRegExp)) {
                collectedPaths.push(pathItem);
            }
        }

        return collectedPaths;
    }

    private matchPath(path: string, regExp: RegExp | null) {
        if (!regExp) return true;

        return Boolean(
            path.match(regExp),
        );
    }
}
