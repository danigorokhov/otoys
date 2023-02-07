import { Config } from './Config';

type Dependencies = {
    config: Config;
};

export class Registry {
    public config: Config;

    constructor(dependencies: Dependencies) {
        this.config = dependencies.config;
    }
}
