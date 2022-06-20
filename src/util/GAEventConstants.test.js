import { ACTIONS } from './GAEventConstants';

describe('ACTIONS functions in GAEventConstants ', () => {
    test.each(Object.entries(ACTIONS))('Action %s returns a string', (keu, val) => {
        expect(typeof val()).toBe('string');
    });
});
