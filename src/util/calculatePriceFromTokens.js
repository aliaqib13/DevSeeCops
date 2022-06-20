const calculatePriceFromTokens = (tokenCostTotal, exchangeRate) => {
    if (typeof tokenCostTotal === 'undefined' || typeof exchangeRate === 'undefined') {
        throw new Error('The Token cost is undefined');
    }
    return (tokenCostTotal * exchangeRate).toFixed(2);
};

export default calculatePriceFromTokens;
