import {
    FETCH_EVENTS,
    GET_EVENT,
} from '../action-types/events';
import {
    ADD_EVENT_MANAGER,
    REMOVE_EVENT_MANAGER,
    REMOVE_EVENT_EMAIL,
} from '../action-types/admin/eventAdministration';

import eventsReducer from './eventsReducer';

describe('eventsReducer', () => {
    const initialState = {
        events: [],
        event: {},
    };

    it('should set initialState when state is undefined', () => {
        const resultState = eventsReducer(undefined);
        expect(resultState.events).toEqual([]);
        expect(resultState.event).toEqual({});
    });

    it('FETCH_EVENTS should set state.events=action.payload', () => {
        const resultState = eventsReducer(initialState, {
            type: FETCH_EVENTS,
            payload: 'test',
        });
        expect(resultState.events).toBe('test');
    });

    it('GET_EVENT should set state.event=action.payload', () => {
        const resultState = eventsReducer(initialState, {
            type: GET_EVENT,
            payload: 'test',
        });
        expect(resultState.event).toBe('test');
    });

    it('ADD_EVENT_MANAGER should add the payload to the list of event.eventManagers', () => {
        const newInitialState = {
            events: [],
            event: {
                eventManagers: [],
            },
        };
        const resultState = eventsReducer(newInitialState, {
            type: ADD_EVENT_MANAGER,
            payload: 'test',
        });
        expect(resultState.event.eventManagers).toContain('test');
    });

    it('REMOVE_EVENT_MANAGER should set state.event.eventManagers without item from action.payload.id', () => {
        const newInitialState = {
            events: [],
            event: {
                eventManagers: ['foo', 'smthElse', 'bar'],
            },
        };
        const resultState = eventsReducer(newInitialState, {
            type: REMOVE_EVENT_MANAGER,
            payload: {
                id: 'smthElse',
            },
        });
        expect(resultState.event.eventManagers).toEqual(['foo', 'bar']);
    });

    it('REMOVE_EVENT_EMAIL should set state.event.eventEmails without item from action.payload.id', () => {
        const newInitialState = {
            events: [],
            event: {
                eventEmails: ['foo', 'smthElse', 'bar'],
            },
        };
        const resultState = eventsReducer(newInitialState, {
            type: REMOVE_EVENT_EMAIL,
            payload: {
                id: 'smthElse',
            },
        });
        expect(resultState.event.eventEmails).toEqual(['foo', 'bar']);
    });
});
