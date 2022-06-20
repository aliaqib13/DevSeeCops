import {
    // CLEAR_GENERAL_NOTIFICATION,
    FETCH_GENERAL_NOTIFICATION,
} from '../action-types/generalNotification';

import generalNotificationReducer from './generalNotificationReducer';

describe('generalNotificationReducer', () => {
    const initialState = {
        active: 0,
        text: '',
    };

    it('should set initialState when state is undefined', () => {
        const resultState = generalNotificationReducer(undefined);
        expect(resultState.active).toBe(0);
        expect(resultState.text).toBe('');
    });

    it('FETCH_GENERAL_NOTIFICATION should set new object from action.payload.globalNotification', () => {
        const resultState = generalNotificationReducer(initialState, {
            type: FETCH_GENERAL_NOTIFICATION,
            payload: {
                globalNotification: {
                    active: 50,
                    text: 'test',
                },
            },
        });
        expect(resultState).toEqual({ active: 50, text: 'test' });
    });
});
