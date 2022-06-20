import { getCampaigns, updateCampaignActiveness, updateCampaignConfig } from './campaign';
import { GET_CAMPAIGNS } from '../../action-types/admin/campaign';
import api from '../../../services/api';

// Use the api mock
jest.mock('../../../services/api');

describe('src/store/actions/admin/campaign.js', () => {
    describe('getCampaigns()', () => {
        const url = 'api/v1/admin/campaigns';
        it('dispatches `GET_CAMPAIGNS` with data', async () => {
            const dispatch = jest.fn();
            const mockResponseData = {
                data: [
                    {
                        name: 'buyOneGetOneFree',
                        active: 1,
                        config: {
                            emailText: '<p>test</p>',
                            bellowButtonText: 'test',
                        },
                    },
                    {
                        name: 'firstCourse',
                        active: 1,
                        config: {
                            emailText: '<p>test</p>',
                            aboveButtonText: 'test',
                        },
                    },
                ],
            };
            api.get.mockResolvedValue(mockResponseData);
            const result = await getCampaigns()(dispatch);
            expect(result).toBe(true);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_CAMPAIGNS,
                payload: mockResponseData.data,
            });
            expect(api.get).toHaveBeenCalledWith(url);
        });
    });
    describe('updateCampaignActiveness()', () => {
        const id = 1;
        const url = `api/v1/admin/campaign/${id}/active`;
        it('should do request to backend and update the campaign activeness', async () => {
            const result = await updateCampaignActiveness(id)();
            expect(result).toBe(true);
            expect(api.put).toHaveBeenCalledWith(url);
        });
    });
    describe('updateCampaignConfig()', () => {
        const id = 1;
        const data = { emailText: 'test', bellowButtonText: 'Buy one get one free' };
        const url = `api/v1/admin/campaign/${id}/config`;
        it('should do request to backend and update the campaign config', async () => {
            const result = await updateCampaignConfig(id, data)();
            expect(result).toBe(true);
            expect(api.put).toHaveBeenCalledWith(url, data);
        });
    });
});
