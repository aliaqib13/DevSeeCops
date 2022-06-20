import {
    ADMIN_FETCH_COURSE_INTERESTS,
} from '../../action-types/admin/courseInterests';

import adminCourseInterestsReducer from './adminCourseInterestsReducer';

const initialState = {
    courseInterests: [],
};

describe('adminCourseInterestsReducer', () => {
    it('ADMIN_FETCH_COURSE_INTERESTS should add payload data to courseInterests', () => {
        const payload = {
            data: [
                { id: 1 },
                { id: 2 },
            ],
        };
        const resultState = adminCourseInterestsReducer(initialState, { type: ADMIN_FETCH_COURSE_INTERESTS, payload });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initialState);
        expect(resultState.courseInterests).toEqual(payload.data);
    });
    it('should return initial state when state is undefined', () => {
        const resultState = adminCourseInterestsReducer(undefined);
        expect(resultState).toEqual({ courseInterests: [] });
    });
    it('should return the previous state for unrecognised actions', () => {
        // state example
        const state = {
            course: {
                id: 1,
            },
        };
        const resultState = adminCourseInterestsReducer(state, { type: 'wrongType' });
        expect(resultState.course).toBe(state.course);
        expect(resultState.course.id).toBe(state.course.id);
    });
});
