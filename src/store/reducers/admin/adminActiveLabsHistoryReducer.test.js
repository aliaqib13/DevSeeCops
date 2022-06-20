import {
    ADMIN_CHANGE_PROGRESS,
    ADMIN_SET_ACTIVE_LAB_DURATION,
    // TODO: add tests for these actions:
    // ADMIN_FETCH_ACTIVE_LAB_HISTORY,
    // ADMIN_DESTROY_ACTIVE_LAB,
    // ADMIN_RECREATE_ACTIVE_LAB,
    // ADMIN_FETCH_ACTIVE_LAB,
} from '../../action-types/admin/activeLabsHistory';

import reducer from './adminActiveLabsHistoryReducer';

describe('adminActiveLabsHistoryReducer', () => {
    it('ADMIN_CHANGE_PROGRESS should change progress of the lab for the payload.id', () => {
        const payload = {
            id: 5,
            lab: {
                progress: 'something',
            },
        };

        const state = {
            labs: {
                data: [
                    { id: 1 },
                    { id: payload.id, progress: 'prevTestState' }, // The data we're targetting.
                    { id: 99 },
                ],
            },
        };
        const resultState = reducer(state, { type: ADMIN_CHANGE_PROGRESS, payload });

        // Make sure it's not the same object
        expect(resultState).not.toBe(state);

        // Make sure the correct lab has been updated:
        expect(resultState.labs.data[1].progress).toBe(payload.lab.progress);

        // Expect other labs were left un-touched
        expect(resultState.labs.data[0]).toBe(state.labs.data[0]);
        expect(resultState.labs.data[2]).toBe(state.labs.data[2]);
    });

    it('ADMIN_SET_ACTIVE_LAB_DURATION should change duration of the lab for the payload.id', () => {
        const payload = {
            id: 5,
            duration: 'forever',
        };

        const state = {
            labs: {
                data: [
                    { id: 1 },
                    { id: payload.id, duration: 'prevTestState' }, // The data we're targetting.
                    { id: 99 },
                ],
            },
        };
        const resultState = reducer(state, { type: ADMIN_SET_ACTIVE_LAB_DURATION, payload });

        // Make sure it's not the same object
        expect(resultState).not.toBe(state);

        // Make sure the correct lab has been updated:
        expect(resultState.labs.data[1].duration).toBe(payload.duration);

        // Expect other labs were left un-touched
        expect(resultState.labs.data[0]).toBe(state.labs.data[0]);
        expect(resultState.labs.data[2]).toBe(state.labs.data[2]);
    });

    it('should return the previous state for unrecognised actions', () => {
        const state = { random: Math.random(), arbitrary: 'data' };
        const originalState = JSON.parse(JSON.stringify(state));
        const resultState = reducer(state, { type: 'unrecognised action' });

        // Same object reference and no changes:
        expect(resultState).toBe(state);
        expect(resultState).toEqual(originalState);
    });
});
