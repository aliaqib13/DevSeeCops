import coursePriceInTokens from './coursePriceInTokens';

describe('coursePriceInTokens() function ', () => {
    it('should check if coursePriceInTokens() working and returning count', () => {
        expect(coursePriceInTokens(10)).toEqual('(= 10 Tokens)');
    });

    it('should check if coursePriceInTokens() working and returning count of singular', () => {
        expect(coursePriceInTokens(1)).toEqual('(= 1 Token)');
    });

    it('should send error message if the either arguments is undefined', () => {
        const tokenCost = undefined;
        expect(() => coursePriceInTokens(tokenCost)).toThrow('The Token cost is undefined');
    });
});
