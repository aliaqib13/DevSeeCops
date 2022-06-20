import api from '../../../services/api';
import { adminSearchUsersByEmail } from './users';

jest.mock('../../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/admin/users', () => {
    it("adminSearchUsersByEmail() calls 'api/v1/admin/users/search-users-by-email' and return data", async () => {
        const dispatch = jest.fn();

        const emailInput = 'example';
        const mockResponseData = {
            data: {
                users: {
                    data: [{
                        email: 'test1@example.test',
                    },
                    {
                        email: 'test2@example.test',
                    }],
                },
            },
        };

        api.get.mockResolvedValue(mockResponseData);
        const response = await adminSearchUsersByEmail(emailInput)(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/admin/users', { params: { pageSize: 100, email: emailInput } });
        expect(response).toEqual(mockResponseData.data.users.data);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("adminSearchUsersByEmail() calls 'api/v1/admin/users/search-users-by-email' returns an error when GET fails", async () => {
        const dispatch = jest.fn();

        const emailInput = 'example';
        const mockRejectedData = {
            res: null,
        };

        api.get.mockRejectedValue(mockRejectedData);
        const response = await adminSearchUsersByEmail(emailInput)(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/admin/users', { params: { pageSize: 100, email: emailInput } });
        expect(response.message).toEqual('Something went wrong searching users by email, please try again');
        expect(dispatch).toHaveBeenCalledTimes(0);
    });
});
