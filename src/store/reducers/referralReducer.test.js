import {
    DELETE_REFERRAL,
    FETCH_REFERRALS,
    CREATE_REFERRAL,
} from '../action-types/referrals';
import { BASE_URL } from '../../util/processEnv';
import referralReducer from './referralReducer';

let initialState = {
    data: [],
};

describe('referralsReducer', () => {
    it('when not state, state will be initial state', () => {
        const initState = {
            data: [],
        };
        const resultState = referralReducer(undefined, { type: FETCH_REFERRALS, payload: initState.data });
        expect(resultState).not.toBe(initState);
    });
    it('fetch referrals is add payload data to data', () => {
        const initState = {
            data: [
                { id: 1, email: 'test@test.test', token: 'testToken' },
                { id: 2, email: 'test2@test.test', token: 'test2Token' },
            ],
        };
        const resultState = referralReducer(initialState, { type: FETCH_REFERRALS, payload: initState.data });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initState);

        // Expect the state changes
        expect(resultState.data.length).toBe(initState.data.length);
        expect(resultState.data[0].id).toBe(initState.data[0].id);
        expect(resultState.data[0].link).toBe(
            `${BASE_URL}/register/${initState.data[0].token}`,
        );
    });
    it('create referrals is add referral to data', () => {
        const initState = {
            id: 3, email: 'test@test.test', token: 'testToken',
        };
        const resultState = referralReducer(initialState, { type: CREATE_REFERRAL, payload: initState });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initState);

        // Expect the state changes
        expect(resultState.data[0].id).toBe(initState.id);
        expect(resultState.data[0].link).toBe(
            `${BASE_URL}/register/${initState.token}`,
        );
    });
    it('delete referral is delete referral from data', () => {
        initialState = {
            data: [
                {
                    id: 1, email: 'test1', token: 'test1', link: 'test1',
                },
                {
                    id: 2, email: 'test2', token: 'test2', link: 'test2',
                },
                {
                    id: 3, email: 'test3', token: 'test3', link: 'test3',
                },
            ],
        };
        const initState = {
            id: 2,
        };
        const resultState = referralReducer(initialState, { type: DELETE_REFERRAL, payload: initState });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initState);
        expect(resultState.data.length).toBe(initialState.data.length - 1);
        const withId = resultState.data.includes(e => e.id === initState.id);
        expect(withId).toBe(false);
    });
    it('should return state', () => {
        const resultState = referralReducer(initialState, { type: '' });
        // Make sure it the same object
        expect(resultState).toBe(initialState);
    });
});
