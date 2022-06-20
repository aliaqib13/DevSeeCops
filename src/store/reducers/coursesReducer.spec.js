import {
    FETCH_COURSES_START,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_ERROR,
    GET_COURSE_START,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR,
    GET_AWS_LINK_SUCCESS,
    FETCH_INTRO_COURSES,
    FETCH_COURSES_GROUPED_BY_TYPES,
} from '../action-types/courses';

import coursesReducer, { initialState } from './coursesReducer';

describe('coursesReducer', () => {
    it('should set initialState when state is undefined', () => {
        const resultState = coursesReducer();
        expect(resultState).toEqual(initialState);
        expect(resultState).not.toBe(initialState); // SHouldn't be the same object though
    });

    it('should return the unaltered state if action is not recognised', () => {
        const action = {};
        const state = { some: 'state' };
        const resultantState = coursesReducer(state, action);

        expect(resultantState).toBe(state);
    });

    describe('FETCH_COURSES_*', () => {
        it('FETCH_COURSES_START removes errors and sets loading to true', () => {
            const action = {
                type: FETCH_COURSES_START,
                payload: {},
            };
            const state = {};

            // Call the reducer
            const resultantState = coursesReducer(state, action);

            // Should be exactly the payload object given
            expect(resultantState.loading).toBe(true);
            expect(resultantState.error).toBe(null);
        });

        it('FETCH_COURSES_SUCCESS sets loading false and attaches data and categories from response', () => {
            const action = {
                type: FETCH_COURSES_SUCCESS,
                payload: {
                    courses: [],
                    categories: [],
                },
            };
            const resultState = coursesReducer({}, action);

            expect(resultState.data).toBe(action.payload.courses);
            expect(resultState.categories).toBe(action.payload.categories);
            expect(resultState.loading).toBe(false);
        });

        it('FETCH_COURSES_ERROR sets loading false and attaches data and categories from response', () => {
            const action = {
                type: FETCH_COURSES_ERROR,
                error: {
                    message: 'someError',
                },
            };
            const resultState = coursesReducer({}, action);

            expect(resultState.error).toBe(action.error);
            expect(resultState.loading).toBe(false);
        });
    });

    describe('GET_COURSE_*', () => {
        it('GET_COURSE_START removes errors and sets loadingCourse to true', () => {
            const action = {
                type: GET_COURSE_START,
                payload: {},
            };
            const state = {};

            // Call the reducer
            const resultantState = coursesReducer(state, action);

            // Should be exactly the payload object given
            expect(resultantState.loadingCourse).toBe(true);
            expect(resultantState.error).toBe(null);
        });

        it('GET_COURSE_SUCCESS sets loadingCourse false and attaches data and categories from response', () => {
            const action = {
                type: GET_COURSE_SUCCESS,
                payload: {
                    courses: [],
                    categories: [],
                },
            };
            const resultState = coursesReducer({}, action);

            expect(resultState.course).toBe(action.payload);
            expect(resultState.loadingCourse).toBe(false);
        });

        it('GET_COURSE_ERROR sets loadingCourse false and attaches data and categories from response', () => {
            const action = {
                type: GET_COURSE_ERROR,
                error: {
                    message: 'someError',
                },
            };
            const resultState = coursesReducer({}, action);

            expect(resultState.error).toBe(action.error);
            expect(resultState.loadingCourse).toBe(false);
        });

        it('GET_AWS_LINK_SUCCESS sets the course.aws property', () => {
            const state = {
                course: {
                    extra: 'courseData',
                    goes: ['here'],
                },
                some: 'data',
            };
            const copyOfOriginalState = JSON.parse(JSON.stringify(state));

            const action = {
                type: GET_AWS_LINK_SUCCESS,
                payload: 'AWS LINK DATA',
            };

            // Call reducer
            const resultState = coursesReducer(state, action);

            // Check course.aws was set
            expect(resultState.course.aws).toEqual(action.payload);
            expect(resultState.course.extra).toEqual(state.course.extra); // Hasn't modified other parts of the course object

            // Check it did not modify the original state
            expect(state).toEqual(copyOfOriginalState);
        });
    });

    it('FETCH_INTRO_COURSES sets introCourses and userDidIntroductions from the payload', () => {
        const action = {
            type: FETCH_INTRO_COURSES,
            payload: {
                introCourses: { a: 1 },
                userDidIntroductions: { b: 2 },
            },
        };
        const resultState = coursesReducer({}, action);

        expect(resultState.introCourses).toBe(action.payload.introCourses);
        expect(resultState.userDidIntroductions).toBe(action.payload.userDidIntroductions);
    });
    it('FETCH_COURSES_GROUPED_BY_TYPES sets coursesGroupedByTypes from the payload', () => {
        const action = {
            type: FETCH_COURSES_GROUPED_BY_TYPES,
            payload: {
                some: 'data',
                a: 1,
            },
        };
        const resultState = coursesReducer({}, action);

        expect(resultState.coursesGroupedByTypes).toBe(action.payload);
    });
});
