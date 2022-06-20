import { fetchPublicIntroCourses, getPublicCourseById } from './courses';
import api from '../../../services/api';
import { FETCH_INTRO_COURSES } from '../../action-types/courses';
import { GET_COURSE_BY_ID } from '../../action-types/course';

// Use the api mock
jest.mock('../../../services/api');

describe('src/store/actions/public/course.js', () => {
    beforeEach(() => {
        api.get.mockClear();
    });

    describe('fetchPublicIntroCourses()', () => {
        it('dispatches FETCH_INTRO_COURSES with results from GET api/v1/public/intro-courses', async () => {
            const url = 'api/v1/public/intro-courses';
            const mockResponseData = {
                data: {
                    some: 'test data',
                },
            };
            api.get.mockResolvedValue(mockResponseData);

            const dispatch = jest.fn();

            // Call the action:
            await fetchPublicIntroCourses()(dispatch);

            //
            expect(api.get).toHaveBeenCalledWith(url);

            expect(dispatch).toHaveBeenCalledWith({
                type: FETCH_INTRO_COURSES,
                payload: mockResponseData.data,
            });
        });
        it('returns undefined if successful', async () => {
            api.get.mockResolvedValue({ data: { some: 'test data' } });
            const dispatch = jest.fn();

            // Call the action:
            const result = await fetchPublicIntroCourses()(dispatch);

            // Check the returned value
            expect(result).toBe(undefined);
        });

        it('returns the error object if the API calls fails and supplies an error message', async () => {
            const errorMessage = {
                response: {
                    data: {
                        message: 'Example Error Message',
                    },
                },
            };
            api.get.mockRejectedValue(errorMessage);
            const dispatch = jest.fn();

            // Call the action:
            const result = await fetchPublicIntroCourses()(dispatch);

            // Check the returned value
            expect(result).toEqual(errorMessage.response.data);
            expect(dispatch).not.toHaveBeenCalled();
        });

        it('returns a generic error object if the API calls fails without expected message', async () => {
            const genericApiError = new Error('generic error for test');
            api.get.mockRejectedValue(genericApiError);
            const dispatch = jest.fn();

            // Call the action:
            const result = await fetchPublicIntroCourses()(dispatch);

            // Check the returned value
            expect(result).toEqual({
                message: 'Something went wrong, please try again.',
            });
            expect(dispatch).not.toHaveBeenCalled();
        });
    });

    describe('getPublicCourseById()', () => {
        const url = 'api/v1/public/course';
        it('dispatches GET_COURSE_BY_ID with results from GET api/v1/public/course', async () => {
            const id = 5;
            const type = 'randomType';
            const mockResponseData = {
                data: {
                    some: 'test data',
                },
            };
            api.get.mockResolvedValue(mockResponseData);

            const dispatch = jest.fn();

            // Call the action:
            await getPublicCourseById(id, type)(dispatch);

            // Check API was called
            expect(api.get).toHaveBeenCalledWith(url, { params: { id, type } });

            expect(dispatch).toHaveBeenCalledWith({
                type: GET_COURSE_BY_ID,
                payload: mockResponseData.data,
            });
        });

        it('returns true if successful', async () => {
            api.get.mockResolvedValue({ data: { some: 'test data' } });
            const dispatch = jest.fn();

            // Call the action:
            const result = await getPublicCourseById()(dispatch);

            // Check the returned value
            expect(result).toBe(true);
        });

        it('returns the error object if the API calls fails and supplies an error message', async () => {
            const errorMessage = {
                response: {
                    data: {
                        message: 'Example Error Message',
                    },
                },
            };
            api.get.mockRejectedValue(errorMessage);
            const dispatch = jest.fn();

            // Call the action:
            const result = await getPublicCourseById()(dispatch);

            // Check the returned value
            expect(result).toEqual(errorMessage.response.data);
            expect(dispatch).not.toHaveBeenCalled();
        });

        it('returns a generic error object if the API calls fails without expected message', async () => {
            const genericApiError = new Error('generic error for test');
            api.get.mockRejectedValue(genericApiError);
            const dispatch = jest.fn();

            // Call the action:
            const result = await getPublicCourseById()(dispatch);

            // Check the returned value
            expect(result).toEqual({
                message: 'Something went wrong, please try again.',
            });
            expect(dispatch).not.toHaveBeenCalled();
        });
    });
});
