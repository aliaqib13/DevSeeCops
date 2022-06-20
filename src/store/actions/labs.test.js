import {
    EDIT_RESOURCE_URL_STATUS,
} from '../action-types/labs';
import { checkResourceURLStatus } from './labs';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/labs.js', () => {
    describe('checkResourceURLStatus()', () => {
        it('No dispatch or api call if the url contains `[no-check]`', async () => {
            const dispatch = jest.fn();
            const data = [
                {
                    type: 'fetch',
                    url: '[no-check] https://uncheckedTest.com',
                },
            ];
            await checkResourceURLStatus(data)(dispatch);
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(api.post).toHaveBeenCalledTimes(0);
        });

        it('No dispatch or api call if the url type is already success', async () => {
            const dispatch = jest.fn();
            const data = [
                {
                    type: 'success',
                    url: 'https://uncheckedTest.com',
                },
            ];
            await checkResourceURLStatus(data)(dispatch);
            expect(dispatch).toHaveBeenCalledTimes(0);
            expect(api.post).toHaveBeenCalledTimes(0);
        });

        it('dispatches `EDIT_RESOURCE_URL_STATUS` if the url does not contain `[no-check]`', async () => {
            const dispatch = jest.fn();

            const data = [
                {
                    id: 1,
                    type: 'fetch',
                    url: 'https://secondTest.com/',
                },
            ];

            const mockResponseData = {
                data: {
                    href: 'https://testtest.com/response', // Response can give a different url
                    status: 200,
                },
            };
            api.post.mockResolvedValue(mockResponseData);

            // Make the call
            await checkResourceURLStatus(data)(dispatch);

            // Assert
            expect(api.post).toHaveBeenCalledWith('/api/v1/labs/check-url-status', { url: data[0].url });
            expect(dispatch).toHaveBeenCalledWith({
                type: EDIT_RESOURCE_URL_STATUS,
                url: mockResponseData.data.href,
                id: data[0].id,
            });
        });
    });
});
