import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_AUTH_USER,
    GET_QR_CODE_SUCCESS,
} from '../action-types/auth';
import {
    login, getAuthUser, checkMfaToken, register,
} from './auth';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/auth.js', () => {
    describe('login()', () => {
        it('dispatches the `GET_QR_CODE_SUCCESS` if a user\'s data is received from the api', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                data: {
                    user: 'Bob',
                    token: 'someToken',
                    mfaSession: 'SomeMfaSession',
                    qrImage: Math.random(),
                },
            };
            api.post.mockResolvedValue(mockResponseData);
            // Set some data:
            const data = {
                someData: Math.random().toString(),
            };

            // Dispatch the login
            await login(data)(dispatch);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('login', data);

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_QR_CODE_SUCCESS,
                payload: mockResponseData.data.qrImage,
            });
        });

        it('dispatches `AUTH_FILED` with appropriate error message if API returns 422', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                response: {
                    status: 422,
                },
            };
            api.post.mockRejectedValue(mockResponseData);
            // Set some data:
            const data = {
                someData: Math.random().toString(),
            };

            // Dispatch the login
            await login(data)(dispatch);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('login', data);

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_FILED,
                error: { message: 'Wrong username or password, or account not activated' },
            });
        });

        it('dispatches `AUTH_FILED` with appropriate error message if API returns unrecognised error', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                response: {
                    status: 400, // Any value that isn't 422 can be used here
                },
            };
            api.post.mockRejectedValue(mockResponseData);
            // Set some data:
            const data = {
                someData: Math.random().toString(),
            };

            // Dispatch the login
            await login(data)(dispatch);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('login', data);

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_FILED,
                error: { message: 'Something went wrong try again later.' },
            });
        });

        it('sets local storage and send success if .token and .refresh token are in the response', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                data: {
                    user: 'Bob',
                    token: 'someToken',
                    refreshToken: 'someRefreshToken',
                },
            };
            api.post.mockResolvedValue(mockResponseData);
            // Clear any existing localStorage
            window.localStorage.clear();

            // Set some data:
            const data = {
                someData: Math.random().toString(),
            };

            // Dispatch the login
            await login(data)(dispatch);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('login', data);

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_SUCCESS,
                payload: null,
            });

            // Check local storage gets set
            expect(localStorage.getItem('token')).toEqual(mockResponseData.data.token);
            expect(localStorage.getItem('refresh_token')).toEqual(mockResponseData.data.refreshToken);
        });
    });

    describe('getAuthUser()', () => {
        it('returns true if API succeeds', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                data: {
                    user: 'Bob',
                    token: 'someToken',
                    qrImage: Math.random(),
                },
            };
            api.post.mockResolvedValue(mockResponseData);

            // Dispatch the login
            const result = await getAuthUser()(dispatch);

            expect(result).toBe(true);
            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('api/v1/me');

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_AUTH_USER,
                payload: mockResponseData.data,
            });
        });

        it('returns false if API throws', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                data: {
                    user: 'Bob',
                    token: 'someToken',
                    qrImage: Math.random(),
                },
            };
            api.post.mockRejectedValue(mockResponseData);

            // Dispatch the login
            const result = await getAuthUser()(dispatch);

            expect(result).toBe(false);
            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('api/v1/me');

            // Check that expected dispatches happened:
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: AUTH_FILED,
                error: { message: 'Wrong username or password, or account not activated' },
            });
        });
    });

    describe('checkMfaToken()', () => {
        it('calls check-mfa endpoint and sets tokens in local storage if sucessful', async () => {
            // Mock the dispatch
            const mfaSession = Math.random().toString(36).slice(2);
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({ auth: { mfaSession } });

            // Mock the return value of the API
            const mockResponseData = {
                data: {
                    token: 'someToken',
                    refreshToken: 'aRefreshToken',
                },
            };
            api.post.mockResolvedValue(mockResponseData);
            // Set some data:
            const token = '123456';

            // Dispatch the login
            const result = await checkMfaToken(token)(dispatch, getState);

            expect(result).toBe(true);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('check-mfa', { token, mfaSession });

            // There are no dispatches:
            expect(dispatch).not.toHaveBeenCalled();
            // Check the local storage was set:
            expect(localStorage.getItem('token')).toEqual(mockResponseData.data.token);
            expect(localStorage.getItem('refresh_token')).toEqual(mockResponseData.data.refreshToken);
        });

        it('returns the error object from the API', async () => {
            // Mock the dispatch
            const mfaSession = Math.random().toString(36).slice(2);
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({ auth: { mfaSession } });

            // Mock the return value of the API
            const mockResponseData = {
                response: {
                    some: 'data',
                },
            };
            api.post.mockRejectedValue(mockResponseData);
            // Set some data:
            const token = '123456';

            // Dispatch the login
            const result = await checkMfaToken(token)(dispatch, getState);

            expect(result).toEqual(mockResponseData.response);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('check-mfa', { token, mfaSession });

            // There are no dispatches:
            expect(dispatch).not.toHaveBeenCalled();
        });

        it('returns generic error object if other error seen', async () => {
            // Mock the dispatch
            const mfaSession = Math.random().toString(36).slice(2);
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({ auth: { mfaSession } });

            // Mock the return value of the API
            const mockResponseData = {
                notResponse: 2, // there is no "response" key
            };

            api.post.mockRejectedValue(mockResponseData);
            // Set some data:
            const token = '123456';

            // Dispatch the login
            const result = await checkMfaToken(token)(dispatch, getState);

            expect(result).toEqual({ message: 'Something went wrong please try again' });

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('check-mfa', { token, mfaSession });

            // There are no dispatches:
            expect(dispatch).not.toHaveBeenCalled();
        });
    });

    describe('register()', () => {
        it('calls /register endpoint and dispatches REGISTER_SUCCESS if sucessful', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            api.post.mockResolvedValue();
            // Set some data:

            // Dispatch the login
            const data = {
                some: 'data',
            };
            const result = await register(data)(dispatch);

            // Action returns true when successful
            expect(result).toBe(true);

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('/register', data);

            // There were 2 dispatches:
            expect(dispatch).toHaveBeenCalledWith({
                type: REGISTER_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: REGISTER_SUCCESS,
            });
        });

        it('returns the error object if an error is thrown', async () => {
            // Mock the dispatch
            const dispatch = jest.fn();

            // Mock the return value of the API
            const mockResponseData = {
                notResponse: 2, // there is no "response" key
            };

            api.post.mockRejectedValue(mockResponseData);
            // Set some data:
            const data = '123456';

            // Dispatch the login
            const result = await register(data)(dispatch);

            expect(result).toEqual({ data: { error: 'Unknown error' } });

            // Check that the api was called with expected data:
            expect(api.post).toHaveBeenCalledWith('/register', data);

            // There are no dispatches:
            expect(dispatch).toHaveBeenCalledWith({
                type: REGISTER_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: REGISTER_ERROR,
                error: 'Unknown error',
            });
        });
    });
});
