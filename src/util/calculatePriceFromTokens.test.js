import calculatePriceFromTokens from './calculatePriceFromTokens';

describe('calculatePriceFromTokens() function ', () => {
    it('should check if calculatePriceFromTokens() working and returning price from tokens * exchange rate', () => {
        expect(calculatePriceFromTokens(21, 5)).toEqual('105.00');
    });
    it('should send error message if the either arguments is undefined', () => {
        const tokenCost = undefined;
        const exchangeRate = undefined;

        expect(() => calculatePriceFromTokens(tokenCost, 5)).toThrow('The Token cost is undefined');
        expect(() => calculatePriceFromTokens(21, exchangeRate)).toThrow('The Token cost is undefined');
    });
});
