import api from '../../../services/api';
import {
    ADMIN_FETCH_COURSE_INTERESTS,
} from '../../action-types/admin/courseInterests';
import {
    getCourseInterests,
} from './courseInterests';

jest.mock('../../../services/api');

describe('src/store/actions/admin/courseInterests.js', () => {
    describe('getCourseInterests', () => {
        it('should get interested courses successfully', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: [{
                    id: 3,
                    name: 'first cat',
                },
                {
                    id: 4,
                    name: 'second cat',
                },
                ],
            };

            api.get.mockResolvedValue(mockResData);
            await getCourseInterests()(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/admin/course-interests');
            expect(dispatch).toHaveBeenCalledWith({
                type: ADMIN_FETCH_COURSE_INTERESTS,
                payload: mockResData.data,
            });
        });
        it('should return error message from api', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        message: 'Something went wrong',
                    },
                },
            };

            api.get.mockRejectedValue(mockResData);
            const data = await getCourseInterests()(dispatch);
            expect(api.get).toHaveBeenCalledWith('/api/v1/admin/course-interests');
            expect(dispatch.mock.calls.length).toBe(0);
            expect(data.message).toBe(mockResData.response.data.message);
        });
    });
});
