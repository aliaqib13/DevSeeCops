const coursePriceInTokens = token => {
    if (typeof token === 'undefined') {
        throw new Error('The Token cost is undefined');
    }
    return `(= ${token} Token${token !== 1 ? 's' : ''})`;
};

export default coursePriceInTokens;
