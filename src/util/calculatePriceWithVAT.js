const calculatePriceWithVAT = (calculatedPriceFromToken, rateOfVAT) => {
    if (typeof calculatedPriceFromToken === 'undefined' || typeof rateOfVAT === 'undefined') {
        throw new Error('The calculatedPriceFromToken or rateOfVAT is undefined');
    }

    return (calculatedPriceFromToken * rateOfVAT).toFixed(2);
};

export default calculatePriceWithVAT;
