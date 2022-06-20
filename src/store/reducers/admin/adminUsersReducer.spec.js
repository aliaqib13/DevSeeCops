import {
    // TODO: Add tests for these other actions
    // ADMIN_FETCH_USERS_START
    // ADMIN_FETCH_USERS_SUCCESS,
    // ADMIN_FETCH_USERS_ERROR,
    // ADMIN_CHANGE_USER_STATUS_START,
    ADMIN_CHANGE_USER_STATUS_SUCCESS,
    // ADMIN_CHANGE_USER_STATUS_ERROR,
    // ADMIN_DELETE_USER_START,
    ADMIN_DELETE_USER_SUCCESS,
    // ADMIN_DELETE_USER_ERROR,
    // ADMIN_CREATE_USER,
    ADMIN_UPDATE_USER,
    ADMIN_CHANGE_FELLOW,
} from '../../action-types/admin/users';

import reducer, { initialState } from './adminUsersReducer';

describe('adminUsersReducer', () => {
    describe('ADMIN_DELETE_USER_SUCCESS', () => {
        test('it removes the user from the data, selected by the id in the payload', () => {
            const state = JSON.parse(JSON.stringify(initialState));
            const action = {
                type: ADMIN_DELETE_USER_SUCCESS,
                payload: 1,
            };
            state.data = [
                { id: 0 },
                { id: action.payload },
                { id: 5 },
            ];
            const originalDataLength = state.data.length;

            const newState = reducer(state, action);

            // Original state must not have been altered
            expect(newState.data).not.toEqual(state.data);
            expect(state.data).toHaveLength(originalDataLength);

            // Expected one place to be deleted
            expect(newState.data).toHaveLength(originalDataLength - 1);

            expect(newState.data).not.toContainEqual({ id: action.payload });
            expect(newState.loadingDeleteUser).toBe(false);
            expect(newState.total).toBe(state.total - 1);
            expect(newState.error).toBe(null); // any errors are cleared
        });
    });

    describe('ADMIN_CHANGE_USER_STATUS_SUCCESS', () => {
        test('it changes the `activated` property from the `status` of the action for the id given', () => {
            const state = JSON.parse(JSON.stringify(initialState));
            const action = {
                type: ADMIN_CHANGE_USER_STATUS_SUCCESS,
                payload: {
                    id: 1,
                    status: 'SOMETHING',
                },
            };
            state.data = [
                { id: 0, activated: false },
                { id: action.payload.id, activated: false },
                { id: 5, activated: false },
            ];

            const newState = reducer(state, action);

            // Original state must not have been altered
            expect(newState.data).not.toEqual(state.data);

            expect(newState.data).toContainEqual({ id: action.payload.id, activated: action.payload.status });
        });
    });

    describe('ADMIN_CHANGE_FELLOW', () => {
        test('changes the `is_fellow` property of the user with matching id', () => {
            const state = JSON.parse(JSON.stringify(initialState));
            const action = {
                type: ADMIN_CHANGE_FELLOW,
                payload: {
                    id: 1,
                    is_fellow: 'SOMETHING',
                },
            };
            state.data = [
                { id: 0 },
                { id: action.payload.id, is_fellow: false },
                { id: 5 },
            ];

            const newState = reducer(state, action);

            // Original state must not have been altered
            expect(newState.data).not.toEqual(state.data);

            // make sure expected change is found
            expect(newState.data).toContainEqual({ id: action.payload.id, is_fellow: action.payload.is_fellow });
            expect(newState.data).toEqual([
                { id: 0 },
                { id: action.payload.id, is_fellow: action.payload.is_fellow },
                { id: 5 },
            ]);
        });
    });

    describe('ADMIN_UPDATE_USER', () => {
        test('it creates a new state (does not alter the existing state)', () => {
            const state = JSON.parse(JSON.stringify(initialState));
            const action = {
                type: ADMIN_UPDATE_USER,
                payload: {
                    id: 1,
                    name: 'user name',
                },
            };
            state.data = [
                { id: 0 },
                { id: action.payload.id },
                { id: 5 },
            ];

            const newState = reducer(state, action);

            // Original state must not have been altered
            expect(newState.data).not.toEqual(state.data);

            expect(newState.data).toContainEqual(action.payload);
        });
    });

    test('returns existing state if action not recognised', () => {
        const state = { some: 'data' };

        const newState = reducer(state, { type: 'InvalidAction' });

        // Expect to get the same state object back
        expect(newState).toBe(state);
    });
});
