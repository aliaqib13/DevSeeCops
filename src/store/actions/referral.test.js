import {
    FETCH_REFERRALS,
    CREATE_REFERRAL,
    DELETE_REFERRAL,
} from '../action-types/referrals';
import { fetchReferrals, deleteReferral, createReferral } from './referral';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/referrals.js', () => {
    describe('fetchReferrals()', () => {
        it('get referrals success and dispatch it to store', async () => {
            const dispatch = jest.fn();
            const mockResponseData = {
                data: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                ],
            };
            api.get.mockResolvedValue(mockResponseData);

            await fetchReferrals()(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledWith({
                type: FETCH_REFERRALS,
                payload: mockResponseData.data,
            });
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('api/v1/referrals');
        });
        it('return false if Api throw error', async () => {
            const dispatch = jest.fn();
            const mockRejectedData = {
                response: {
                    message: 'this route is not found',
                },
            };
            api.get.mockRejectedValue(mockRejectedData);
            await fetchReferrals()(dispatch);

            // Check that the api was called with expected data:
            expect(api.get).toHaveBeenCalledWith('api/v1/referrals');

            // Check that dispatch was not called, because runs catch
            expect(dispatch).toHaveBeenCalledTimes(0);
        });

        it('return error without message', async () => {
            const dispatch = jest.fn();
            const mockRejectedData = {
                response: null,
            };
            api.get.mockRejectedValue(mockRejectedData);
            await fetchReferrals()(dispatch);

            // Check that the api was called with expected data:
            expect(api.get).toHaveBeenCalledWith('api/v1/referrals');
            // Check that dispatch was not called, because runs catch
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
    });

    describe('createReferral()', () => {
        it('return data when successfully created', async () => {
            const dispatch = jest.fn();
            const data = {
                email: 'test@test.test',
            };
            const mockResponseData = {
                data: {
                    id: 34,
                    email: data.email,
                },
            };
            api.post.mockResolvedValue(mockResponseData);

            const res = await createReferral(data.email)(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledWith({
                type: CREATE_REFERRAL,
                payload: mockResponseData.data,
            });
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('api/v1/referral/create', { email: data.email });
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(res).toBe(true);
        });
        it('return message when something went wrong', async () => {
            const dispatch = jest.fn();
            const data = {
                email: 'test@test.test',
            };
            const mockResponseData = {
                message: 'Id is exists',

            };
            api.post.mockResolvedValue(mockResponseData);

            const res = await createReferral(data.email)(dispatch);

            // check api calls and dispatches
            expect(api.post).toHaveBeenCalledWith('api/v1/referral/create', data);
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(res.message).toBe('Id is exists');
        });
        it('return message when something went wrong', async () => {
            const dispatch = jest.fn();
            const mockRejectedData = {
                response: null,
            };
            api.post.mockRejectedValue(mockRejectedData);
            const res = await createReferral('TestEmail')(dispatch);
            expect(res.message).toBe('Something went wrong, please try again.');
            // Check that the api was called with expected data:
            expect(api.get).toHaveBeenCalledWith('api/v1/referrals');
            // Check that dispatch was not called, because runs catch
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
        it('return message when server give error message', async () => {
            const dispatch = jest.fn();
            const mockRejectedData = {
                response: {
                    data: 'Test error message',
                },
            };
            api.post.mockRejectedValue(mockRejectedData);
            const res = await createReferral('TestEmail')(dispatch);
            expect(res).toBe(mockRejectedData.response.data);
            // Check that the api was called with expected data:
            expect(api.get).toHaveBeenCalledWith('api/v1/referrals');
            // Check that dispatch was not called, because runs catch
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
    });
    describe('deleteReferral()', () => {
        it('return data when successfully deleted', async () => {
            const dispatch = jest.fn();
            const data = {
                id: 1,
            };
            const mockResponseData = {
                data: {
                    id: 1,
                },
            };
            api.delete.mockResolvedValue(mockResponseData);

            const res = await deleteReferral(data.id)(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledWith({
                type: DELETE_REFERRAL,
                payload: mockResponseData.data,
            });
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`api/v1/referral/${data.id}`);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(res).toBe(true);
        });
        it('return data with error message', async () => {
            const dispatch = jest.fn();
            const data = {
                id: 1,
            };
            const mockResponseData = {
                message: 'Test error',
            };
            api.delete.mockResolvedValue(mockResponseData);

            const res = await deleteReferral(data.id)(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(api.delete).toHaveBeenCalledWith(`api/v1/referral/${data.id}`);
            expect(res.message).toBe(mockResponseData.message);
        });
        it('return error when something went wrong', async () => {
            const dispatch = jest.fn();
            const data = {
                id: 1,
            };
            const mockResponseData = { };

            api.delete.mockRejectedValue(mockResponseData);

            const res = await deleteReferral(data.id)(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(api.delete).toHaveBeenCalledWith(`api/v1/referral/${data.id}`);
            expect(res.message).toBe('Something went wrong, please try again.');
        });
        it('return error when id is required ', async () => {
            const dispatch = jest.fn();
            const data = {
                id: 1,
            };
            const mockResponseData = {
                response: {
                    data: 'Id is required',
                },
            };
            api.delete.mockRejectedValue(mockResponseData);

            const res = await deleteReferral(data.id)(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(api.delete).toHaveBeenCalledWith(`api/v1/referral/${data.id}`);
            expect(res).toBe('Id is required');
        });
    });
});
