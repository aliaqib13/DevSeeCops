import { requestCourseFromTeam } from './coursePayment';
import api from '../../services/api';

jest.mock('../../services/api');

describe('src/store/actions/coursePayment.js', () => {
    describe('requestCourseFromTeam()', () => {
        it('calls `api/v1/request-team-course` with courseId and teamId', async () => {
            const data = {
                course_id: 1,
                team_id: 2,
            };

            await requestCourseFromTeam(data.course_id, data.team_id)();

            expect(api.post).toHaveBeenCalledWith('api/v1/request-team-course', data);
        });

        it('requestCourseFromTeam() returns an error when POST fails', async () => {
            const mockRejectedData = {
                response: null,
            };

            const data = {
                course_id: 1,
                team_id: 2,
            };

            api.post.mockRejectedValue(mockRejectedData);
            const response = await requestCourseFromTeam()();

            expect(api.post).toHaveBeenCalledWith('api/v1/request-team-course', data);
            expect(response.message).toEqual('Something went wrong, please try again.');
        });
    });
});
