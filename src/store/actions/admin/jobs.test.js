import { fetchJobs } from './jobs';
import api from '../../../services/api';
import { ADMIN_GET_JOBS_SUCCESS } from '../../action-types/admin/jobs';

jest.mock('../../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/admin/labs.js', () => {
    it('fetchJobs() call with default values', async () => {
        const dispatch = jest.fn();

        const aLabId = 1;
        const params = {
            type: '',
            user: 'test@gmail.com',
            page: 1,
            activeLabId: aLabId,
        };
        await fetchJobs(params)(dispatch);

        expect(api.get).toHaveBeenCalledWith('api/v1/admin/jobs',
            {
                params: {
                    type: '',
                    user: 'test@gmail.com',
                    page: 1,
                    activeLabId: aLabId,
                },
            });

        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_GET_JOBS_SUCCESS,
        });
    });
});
