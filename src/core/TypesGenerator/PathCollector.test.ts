import { expect, describe, it } from '@jest/globals';
import { PathsObject } from 'openapi3-ts';

import { PathCollector } from './PathCollector';

describe('TypesGenerator/TypesGeneratorV3/PathCollector', () => {
    let paths: PathsObject;

    beforeEach(() => {
        paths = {
            '/path1': {
                summary: 'path1',
            },
            '/path2': {
                summary: 'path2',
            },
            '/path3': {
                summary: 'path3',
            },
        };
    });

    it('should collect all paths without whitelist parameter', () => {
        const collector = new PathCollector(paths, undefined);

        expect(collector.collect()).toStrictEqual([
            {
                summary: 'path1',
            },
            {
                summary: 'path2',
            },
            {
                summary: 'path3',
            },
        ]);
    });

    it('should collect only paths matched to whitelist regexp', () => {
        const collector = new PathCollector(paths, '^/path[13]');

        expect(collector.collect()).toStrictEqual([
            {
                summary: 'path1',
            },
            {
                summary: 'path3',
            },
        ]);
    });
});
