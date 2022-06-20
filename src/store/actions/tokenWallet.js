import { FETCH_WALLET_BALANCE, FETCH_TOKEN_WALLET_TRANSACTIONS } from '../action-types/tokenWallet';
import api from '../../services/api';

export function getCurrentTokenBalance() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/token-wallet/get-current-balance');
            dispatch({
                type: FETCH_WALLET_BALANCE,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong getting balance, please try again.' };
        }
    };
}

export function getTokenWalletTransactions(page) {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/wallet/transactions', {
                params: {
                    page: page || 1,
                },
            });

            dispatch({
                type: FETCH_TOKEN_WALLET_TRANSACTIONS,
                payload: res.data,
            });

            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong getting transactions, please try again' };
        }
    };
}

export function claimWalletIntroductionToken() {
    return async () => {
        try {
            await api.post('api/v1/wallet/intro');

            return true;
        } catch (e) {
            return e.response ? e.response.data.error : { message: 'Something went wrong claiming wallet introduction token, please try again' };
        }
    };
}

export function adminGetUserCurrentTokenBalance(userId) {
    return async () => {
        try {
            const res = await api.get(`api/v1/admin/admin-get-user-balance/${userId}`);
            return res.data;
        } catch (e) {
            return e.response ? e.response.data.error : { message: "Something went wrong getting user'a balance, please try again" };
        }
    };
}
export function adminAddTokensToUser(data) {
    return async () => {
        try {
            const res = await api.post('api/v1/admin/add-tokens-to-user', data);

            return res.data;
        } catch (e) {
            return e.response ? e.response.data.error : { message: "Something went wrong getting user'a balance, please try again" };
        }
    };
}
