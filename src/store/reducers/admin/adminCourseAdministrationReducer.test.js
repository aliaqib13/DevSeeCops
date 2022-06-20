import {
    ADMIN_FETCH_DEVELOPMENT_COURSES,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
    ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,

} from '../../action-types/admin/courseAdministration';

import adminCourseAdministrationReducer from './adminCourseAdministrationReducer';

const initialState = {
    courses: [],
    statuses: [],
    users: {
        data: [],
    },
    courseRequests: {
        data: [],
    },
    labtimeRequests: {
        data: [],
    },
    coursesByStatus: {
        data: [],
    },
    developmentCourses: {
        data: [],
    },
    courseProposalsForReview: {
        data: [],
    },
    courseProposalById: {},
    courseProposalByIdFiles: [],

};

describe('adminCourseAdministrationReducer', () => {
    it('ADMIN_FETCH_DEVELOPMENT_COURSES should add payload data to courseInterests', () => {
        const payload = {
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
                }],
        };
        const resultState = adminCourseAdministrationReducer(initialState, {
            type: ADMIN_FETCH_DEVELOPMENT_COURSES,
            payload,
        });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initialState);
        expect(resultState.developmentCourses.data).toEqual(payload.data);
    });

    it('ADMIN_FETCH_COURSE_PROPOSAL_BY_ID should add payload data to courseInterests', () => {
        const payload = {

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

        };
        const resultState = adminCourseAdministrationReducer(initialState, {
            type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID,
            payload,
        });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initialState);
        expect(resultState.courseProposalById).toStrictEqual(payload);
    });

    it('ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES should add payload data to courseInterests', () => {
        const payload = ['VideoTest', 'ZipTest'];

        const resultState = adminCourseAdministrationReducer(initialState, {
            type: ADMIN_FETCH_COURSE_PROPOSAL_BY_ID_FILES,
            payload,
        });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initialState);
        expect(resultState.courseProposalByIdFiles).toStrictEqual(payload);
    });

    it('should return initial state when state is undefined', () => {
        const resultState = adminCourseAdministrationReducer(undefined);
        expect(resultState).toEqual(initialState);
    });

    it('should return the previous state for unrecognized actions', () => {
        // state example
        const state = {
            data: [
                {
                    id: 1,
                    status: 'Development',
                    title: 'test 1',
                    updated_at: '2021-10-21 09:39:31',
                }],
        };
        const originalState = JSON.parse(JSON.stringify(state));

        const resultState = adminCourseAdministrationReducer(state, {
            type: 'wrongType',
        });
        expect(resultState).toBe(state);
        expect(resultState).toEqual(originalState);
    });
});
