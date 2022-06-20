import { FETCH_WALLET_BALANCE, FETCH_TOKEN_WALLET_TRANSACTIONS } from '../action-types/tokenWallet';

import tokenWalletReducer from './tokenWalletReducer';

describe('tokenWalletReducer', () => {
    const initialState = {
        tokenBalance: 0,
        tokenWalletTransactions: {
            data: [],
        },
    };

    it('should set initialState when state is undefined', () => {
        const action = { type: FETCH_WALLET_BALANCE, payload: initialState.tokenBalance };
        const resultState = tokenWalletReducer(undefined, action);
        expect(resultState).toEqual(initialState);
    });

    it('should return the unaltered state if action is not recognized', () => {
        const action = {};
        const state = { tokenBalance: 10 };
        const resultantState = tokenWalletReducer(state, action);

        expect(resultantState).toEqual(state);
    });

    it('should set the state from the payload for FETCH_WALLET_BALANCE', () => {
        const action = {
            type: FETCH_WALLET_BALANCE,
            payload: 3,
        };

        const resultantState = tokenWalletReducer(initialState, action);

        expect(resultantState.tokenBalance).toStrictEqual(action.payload);
    });
    it('should set initialState when state is undefined', () => {
        const action = { type: FETCH_TOKEN_WALLET_TRANSACTIONS, payload: initialState.tokenBalance };
        const resultState = tokenWalletReducer(undefined, action);
        expect(resultState).toEqual(initialState);
    });

    it('should return the unaltered state if action is not recognized', () => {
        const action = {};
        const state = {
            tokenWalletTransactions: {
                data: {
                    page: 1,
                    perPage: 25,
                    total: 2,
                    lastPage: 1,
                    data: [{
                        id: 3, wallet_id: 2, description: 'Adding 5 Tokens to the wallet', change: 5, created_at: '2021-11-17 09:50:41',
                    }],
                },
            },
        };
        const resultantState = tokenWalletReducer(state, action);

        expect(resultantState).toEqual(state);
    });

    it('should set the state from the payload for FETCH_TOKEN_WALLET_TRANSACTIONS', () => {
        const action = {
            type: FETCH_TOKEN_WALLET_TRANSACTIONS,
            payload: {
                page: 1,
                perPage: 25,
                total: 2,
                lastPage: 1,
                data: [{
                    id: 3, wallet_id: 2, description: 'Purchase Course', change: -5, created_at: '2021-11-17 10:50:41',
                }],
            },
        };

        const resultantState = tokenWalletReducer(initialState, action);
        expect(resultantState.tokenWalletTransactions).toStrictEqual(action.payload);
    });
});
