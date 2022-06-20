import {
    GET_FAQ,
} from '../action-types/tutorial';
import { fetchFaq } from './tutorial';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/tutorial.js', () => {
    describe('fetchFaq()', () => {
        it('sends a GET_FAQ action with the result of an API call to api/v1/tutorial/get_faq and returns true', async () => {
            const dispatch = jest.fn();
            const mockResponseData = {
                data: [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 },
                ],
            };
            api.get.mockResolvedValue(mockResponseData);

            const result = await fetchFaq()(dispatch);

            // check dispatch and api calls
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_FAQ,
                payload: mockResponseData.data,
            });
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('api/v1/tutorial/get_faq');

            expect(result).toBe(true, 'Expected the call to return true');
        });

        describe('api error', () => {
            it('returns the response.data field as the error message', async () => {
                const dispatch = jest.fn();
                const mockRejectedData = {
                    info: 'this is a mocked rejection used in a test',
                    response: {
                        data: {
                            message: 'this route is not found',
                        },
                    },
                };
                api.get.mockRejectedValue(mockRejectedData);

                // Test
                const result = await fetchFaq()(dispatch);

                // Check that the api was called with expected data:
                expect(api.get).toHaveBeenCalledWith('api/v1/tutorial/get_faq');

                // Check that dispatch was not called, because runs catch
                expect(dispatch).toHaveBeenCalledTimes(0);

                // Expect the call to return the error message from the failed api call
                expect(result).toBe(mockRejectedData.response.data);
            });

            it('if response does not contain data, returns a generic "Something went wrong" error message', async () => {
                const dispatch = jest.fn();
                const mockRejectedData = {
                    info: 'this is a mocked rejection used in a test',
                    response: null,
                };
                api.get.mockRejectedValue(mockRejectedData);

                // Test
                const result = await fetchFaq()(dispatch);

                // Check that the api was called with expected data:
                expect(api.get).toHaveBeenCalledWith('api/v1/tutorial/get_faq');

                // Check that dispatch was not called, because runs catch
                expect(dispatch).toHaveBeenCalledTimes(0);

                // Expect the call to return the generic message
                expect(result).toEqual({ message: 'Something went wrong, please try again.' });
            });
        });
    });
});
