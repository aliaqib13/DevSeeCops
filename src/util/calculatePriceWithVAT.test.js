import calculatePriceWithVAT from './calculatePriceWithVAT';
import { DUTCH_VAT } from './constants';

describe('calculatePriceWithVAT() function ', () => {
    it('returns calculatedPriceFromToken * VAT rate as a string to only 2 decimal places', () => {
        expect(calculatePriceWithVAT(5, DUTCH_VAT)).toEqual('6.05');
        expect(calculatePriceWithVAT(11.55, DUTCH_VAT)).toEqual('13.98');   // Actually 13.9755, but should get rounded up to 13.98
        expect(calculatePriceWithVAT(8.26, DUTCH_VAT)).toEqual('9.99');  // actually 9.9946, but should be rounded down
        expect(calculatePriceWithVAT(25.55, DUTCH_VAT)).toEqual('30.92');   // Actually 30.915, but should get rounded up.
        expect(calculatePriceWithVAT(100, DUTCH_VAT)).toEqual('121.00'); // Make sure it always puts it to 2 decimal places
    });
    it('should send error message if the either arguments is undefined', () => {
        expect(() => calculatePriceWithVAT(undefined, 5)).toThrow('The calculatedPriceFromToken or rateOfVAT is undefined');
        expect(() => calculatePriceWithVAT(21, undefined)).toThrow('The calculatedPriceFromToken or rateOfVAT is undefined');
    });
});
