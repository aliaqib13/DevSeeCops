import {
    FETCH_FELLOW_COURSES,
    GET_DESIRED_COURSES,
} from '../action-types/fellowArea';

import fellowAreaReducer from './fellowAreaReducer';

describe('fellowAreaReducer', () => {
    const state = {
        categories: [],
        desiredCourses: [],
        draft: [],
        fellow_courses: [],
        proposals: [],
        user: [],
    };

    it('should set initialState when state is undefined', () => {
        const resultState = fellowAreaReducer(undefined);
        expect(resultState).toEqual(state);
    });

    it('should return the unaltered state if action is not recognised', () => {
        const action = {};
        const testState = { old: 'state' };
        const resultantState = fellowAreaReducer(testState, action);

        expect(resultantState).toBe(testState);
    });

    it('should set the state from the payload for FETCH_FELLOW_COURSES', () => {
        const action = {
            type: FETCH_FELLOW_COURSES,
            payload: {
                fellow_courses: [{ course: 1 }],
                draft: [],
                categories: ['kubernetes'],
                user: [{ name: 'test' }],
            },
        };

        const resultantState = fellowAreaReducer(state, action);

        expect(resultantState).toStrictEqual({
            categories: ['kubernetes'],
            desiredCourses: [],
            draft: [],
            fellow_courses: [{ course: 1 }],
            proposals: [],
            user: [{ name: 'test' }],
        });
    });

    it('should set the state from the payload for GET_DESIRED_COURSES', () => {
        const action = {
            type: GET_DESIRED_COURSES,
            payload: [{ course: 'some desired course' }],
        };

        const resultantState = fellowAreaReducer(state, action);
        expect(resultantState).toStrictEqual({
            categories: [],
            desiredCourses: [{ course: 'some desired course' }],
            draft: [],
            fellow_courses: [],
            proposals: [],
            user: [],
        });
    });
});
