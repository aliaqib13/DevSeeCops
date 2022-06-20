import { getCampaign } from './campaign';
import { GET_CAMPAIGN } from '../action-types/campaign';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/campaign.js', () => {
    describe('getCampaign()', () => {
        const id = 1;
        const url = `api/v1/campaign/${id}`;
        it('dispatches `GET_CAMPAIGN` with data', async () => {
            const dispatch = jest.fn();
            const mockResponseData = {
                data: {
                    name: 'buyOneGetOneFree',
                    active: 1,
                    config: {
                        emailText: '<p>test</p>',
                        bellowButtonText: 'test',
                    },
                },
            };
            api.get.mockResolvedValue(mockResponseData);
            const result = await getCampaign(1)(dispatch);
            expect(result).toBe(true);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_CAMPAIGN,
                payload: mockResponseData.data,
                campaign_id: 1,
            });
            expect(api.get).toHaveBeenCalledWith(url);
        });
    });
});
