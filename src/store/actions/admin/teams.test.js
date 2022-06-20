import api from '../../../services/api';
import { adminCreateTeam } from './teams';

jest.mock('../../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/admin/teams', () => {
    it("adminCreateTeam() calls 'api/v1/admin/create-team' and return data", async () => {
        const dispatch = jest.fn();

        const data = {
            name: 'teamName',
            logo: 'teamLogo',
            members: [
                {
                    email: 'test1@test.test',
                    user_id: 1,
                },
                {
                    email: 'test2@test.test',
                    user_id: 2,
                },
            ],
        };

        const mockResponseData = {
            data: {
                ...data,
                id: 1,
            },
        };

        api.post.mockResolvedValue(mockResponseData);
        const response = await adminCreateTeam(data)(dispatch);

        expect(api.post).toHaveBeenCalledWith('api/v1/admin/create-team', data);
        expect(response).toEqual(mockResponseData.data);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("adminCreateTeam() calls 'api/v1/admin/create-team' returns an error when POST fails", async () => {
        const dispatch = jest.fn();

        const data = {
            name: 'teamName',
            logo: 'teamLogo',
            members: [
                {
                    email: 'test1@test.test',
                    user_id: 1,
                },
                {
                    email: 'test2@test.test',
                    user_id: 2,
                },
            ],
        };

        const mockRejectedData = {
            res: null,
        };

        api.post.mockRejectedValue(mockRejectedData);
        const response = await adminCreateTeam(data)(dispatch);

        expect(api.post).toHaveBeenCalledWith('api/v1/admin/create-team', data);
        expect(response.message).toEqual('Something went wrong creating new team, please try again');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });
});
