import {
    claimWalletIntroductionToken, getCurrentTokenBalance, getTokenWalletTransactions, adminGetUserCurrentTokenBalance,
} from './tokenWallet';
import api from '../../services/api';
import { FETCH_WALLET_BALANCE, FETCH_TOKEN_WALLET_TRANSACTIONS } from '../action-types/tokenWallet';

jest.mock('../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/tokenWallet', () => {
    it("calls '/api/v1/token-wallet/get-current-balance' and dispatches a FETCH_WALLET_BALANCE action", async () => {
        const dispatch = jest.fn();
        const mockResponseData = { data: 3 };

        api.get.mockResolvedValue(mockResponseData);
        await getCurrentTokenBalance()(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/token-wallet/get-current-balance');
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_WALLET_BALANCE,
            payload: mockResponseData.data,
        });
    });

    it('getCurrentTokenBalance() returns an error when GET fails', async () => {
        const dispatch = jest.fn();
        const mockRejectedData = {
            res: null,
        };

        api.get.mockRejectedValue(mockRejectedData);
        const response = await getCurrentTokenBalance()(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/token-wallet/get-current-balance');
        expect(response.message).toEqual('Something went wrong getting balance, please try again.');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("calls '/api/v1/wallet/transactions' and dispatches a FETCH_TOKEN_WALLET_TRANSACTIONS action with pagination", async () => {
        const dispatch = jest.fn();
        const mockResponseData = { data: 3 };

        api.get.mockResolvedValue(mockResponseData);
        await getTokenWalletTransactions()(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/wallet/transactions', { params: { page: 1 } });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_TOKEN_WALLET_TRANSACTIONS,
            payload: mockResponseData.data,
        });
    });

    it("calls '/api/v1/wallet/transactions' and dispatches a FETCH_TOKEN_WALLET_TRANSACTIONS action with pagination", async () => {
        const dispatch = jest.fn();
        const mockResponseData = { data: 3 };

        const page = 2;
        api.get.mockResolvedValue(mockResponseData);
        await getTokenWalletTransactions(page)(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/wallet/transactions', { params: { page: 2 } });
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: FETCH_TOKEN_WALLET_TRANSACTIONS,
            payload: mockResponseData.data,
        });
    });

    it('getCurrentTokenBalance() returns an error when GET fails', async () => {
        const dispatch = jest.fn();
        const mockRejectedData = {
            res: null,
        };
        const page = 2;

        api.get.mockRejectedValue(mockRejectedData);
        const response = await getTokenWalletTransactions(page)(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/wallet/transactions', { params: { page: 2 } });
        expect(response.message).toEqual('Something went wrong getting transactions, please try again');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("calls '/api/v1/wallet/intro' and return `true` ", async () => {
        const dispatch = jest.fn();
        const mockResponseData = { res: true };

        api.post.mockResolvedValue(mockResponseData);
        const response = await claimWalletIntroductionToken()(dispatch);

        expect(api.post).toHaveBeenCalledWith('api/v1/wallet/intro');
        expect(response).toEqual(true);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("calls '/api/v1/wallet/intro' returns an error when POST fails ", async () => {
        const dispatch = jest.fn();
        const mockRejectedData = {
            res: null,
        };
        api.post.mockRejectedValue(mockRejectedData);
        const response = await claimWalletIntroductionToken()(dispatch);

        expect(api.post).toHaveBeenCalledWith('api/v1/wallet/intro');
        expect(response.message).toEqual('Something went wrong claiming wallet introduction token, please try again');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("calls '/api/v1/admin/admin-get-user-balance/:userId' and return current balance ", async () => {
        const dispatch = jest.fn();
        const mockResponseData = { data: 5 };
        const userId = 2;

        api.get.mockResolvedValue(mockResponseData);
        const response = await adminGetUserCurrentTokenBalance(userId)(dispatch);

        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/admin-get-user-balance/${userId}`);
        expect(response).toEqual(mockResponseData.data);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("calls '/api/v1/admin/admin-get-user-balance/:userId' returns an error when GET fails ", async () => {
        const dispatch = jest.fn();
        const mockRejectedData = {
            data: null,
        };
        const userId = 2;
        api.get.mockRejectedValue(mockRejectedData);
        const response = await adminGetUserCurrentTokenBalance(userId)(dispatch);

        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/admin-get-user-balance/${userId}`);
        expect(response.message).toEqual("Something went wrong getting user'a balance, please try again");
        expect(dispatch).toHaveBeenCalledTimes(0);
    });
});
