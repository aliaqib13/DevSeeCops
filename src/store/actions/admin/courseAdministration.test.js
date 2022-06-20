import api from '../../../services/api';
import {

    ADMIN_FETCH_DEVELOPMENT_COURSES,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,
} from '../../action-types/admin/courseAdministration';
import {
    getDevelopmentCourses, getCourseProposalById, listCourseProposalFiles,
    downloadCourseProposalFile, proposalAcceptance,
} from './courseAdministration';

jest.mock('../../../services/api');

describe('src/store/actions/admin/courseAdministration.js', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getDevelopmentCourses', () => {
        it('should dispatch FETCH_DEVELOPMENT_COURSES, when api returns fetching data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    total: 12,
                    perPage: 10,
                    page: 1,
                    lastPage: 2,
                    data: [
                        {
                            id: 1,
                            status: 'Development',
                            title: 'test 1',
                            updated_at: '2021-10-21 09:39:31',
                        },
                        {
                            id: 3,
                            status: 'Development',
                            title: 'test 2',
                            updated_at: '2020-10-21 09:39:31',
                        },
                        {
                            id: 5,
                            status: 'Development',
                            title: 'test 3',
                            updated_at: '2019-10-21 09:39:31',
                        },
                    ],
                },
            };

            api.get.mockResolvedValue(mockResData);
            const search = '';
            const page = 1;
            const perPage = 10;
            await getDevelopmentCourses(page, perPage, search)(dispatch);

            expect(api.get).toHaveBeenCalledWith('api/v1/admin/course-administration/courses-development-status', { params: { page, perPage, search } });
            expect(dispatch).toHaveBeenCalledWith({
                type: ADMIN_FETCH_DEVELOPMENT_COURSES,
                payload: mockResData.data,
            });
        });

        it('should dispatch wrong message, when api returns wrong  data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        error: 'Something went wrong',
                    },
                },
            };

            api.get.mockRejectedValue(mockResData);
            const search = '';
            const page = 1;
            const perPage = 10;
            const data = await getDevelopmentCourses(page, perPage, search)(dispatch);
            expect(api.get).toHaveBeenCalledWith('api/v1/admin/course-administration/courses-development-status', { params: { page, perPage, search } });
            expect(dispatch.mock.calls.length).toBe(0);
            expect(data).toBe(mockResData.response.data.error);
        });
    });

    describe('getCourseProposalById', () => {
        it('should dispatch ADMIN_FETCH_COURSE_PROPOSAL_BY_ID, when api returns fetching data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    course: {
                        id: 5,
                        title: 'course title',
                    },
                    course_id: 5,
                    created_at: '2021-10-21 09:39:31',
                    id: 4,
                    status: 'SUBMITTED',
                    suitability_explanation: 'test',
                    terms_accepted_on: '2021-11-18T09:38:00.000Z',
                    updated_at: '2020-10-21 09:39:31',
                    user: {
                        id: 2,
                        firstname: 'firstName',
                        lastname: 'lastName',
                        email: 'test@test.test',
                    },
                    user_id: 2,
                },
            };

            api.get.mockResolvedValue(mockResData);

            await getCourseProposalById(4)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/4');
            expect(dispatch).toHaveBeenCalledWith({
                type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
                payload: mockResData.data,
            });
        });

        it('should dispatch wrong message, when api returns wrong data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        error: 'Something went wrong',
                    },
                },
            };

            api.get.mockRejectedValue(mockResData);

            const data = await getCourseProposalById(4)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/4');
            expect(dispatch).not.toHaveBeenCalled();
            expect(data).toBe(mockResData.response.data.error);
        });
    });

    describe('listCourseProposalFiles', () => {
        it('should dispatch ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES, when api returns fetching data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: ['test1', 'test2'],

            };

            api.get.mockResolvedValue(mockResData);

            await listCourseProposalFiles(4)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/list-files/4');
            expect(dispatch).toHaveBeenCalledWith({
                type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,
                payload: mockResData.data,
            });
        });

        it('should dispatch wrong message, when api returns wrong data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        error: 'Something went wrong',
                    },
                },
            };

            api.get.mockRejectedValue(mockResData);

            const data = await listCourseProposalFiles(4)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/list-files/4');
            expect(dispatch).not.toHaveBeenCalled();
            expect(data).toBe(mockResData.response.data.error);
        });
    });

    describe('downloadCourseProposalFile', () => {
        it('should dispatch `res.data`, when api returns fetching data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    size: 10,
                    type: 'test',
                },

            };

            api.get.mockResolvedValue(mockResData);

            const id = 4;
            const fileName = 'test';

            await downloadCourseProposalFile(id, fileName)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/get-file/4/test', { responseType: 'blob' });
        });

        it('should dispatch wrong message, when api returns wrong data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        error: 'Something went wrong',
                    },
                },
            };

            api.get.mockRejectedValue(mockResData);

            const id = 4;
            const fileName = 'test';
            const data = await downloadCourseProposalFile(id, fileName)(dispatch);

            expect(api.get).toHaveBeenCalledWith('/api/v1/fellow-area/proposal/get-file/4/test', { responseType: 'blob' });
            expect(dispatch).not.toHaveBeenCalled();
            expect(data).toBe(mockResData.response.data.error);
        });
    });

    describe('proposalAcceptance', () => {
        it('POSTs to /api/v1/admin/course-proposal/acceptance/:id and returns the result', async () => {
            const courseProposal = {
                id: 1,
                user_id: 2,
                course_id: 2,
                status: 'SUBMITTED',
                suitability_explanation: 'Testing Explanation',
                course: {
                    id: 2,
                    title: 'test title',
                },
                user: {
                    firstname: 'firstNameTest',
                    lastname: 'lastNameTest',
                },

                terms_accepted_on: null,
            };
            const dispatch = jest.fn();
            const mockResData = {
                response: {
                    data: {
                        courseProposal,
                    },
                },
            };

            api.post.mockResolvedValue(mockResData);
            const url = '/api/v1/admin/course-proposal/acceptance';
            const result = await proposalAcceptance(1)(dispatch);

            expect(api.post).toHaveBeenCalledWith(url, { id: 1 });
            expect(result.response.data.courseProposal.id).toEqual(courseProposal.id);
        });
    });
});
