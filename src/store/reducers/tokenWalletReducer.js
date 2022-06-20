import { FETCH_WALLET_BALANCE, FETCH_TOKEN_WALLET_TRANSACTIONS } from '../action-types/tokenWallet';

const initialState = {
    tokenBalance: 0,
    tokenWalletTransactions: {
        data: [],
    },
};

export default function tokenWalletReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
    case FETCH_WALLET_BALANCE: {
        return {
            ...state,
            tokenBalance: action.payload,
        };
    }
    case FETCH_TOKEN_WALLET_TRANSACTIONS:
        return {
            ...state,
            tokenWalletTransactions: action.payload,
        };
    default:
        return state;
    }
}
