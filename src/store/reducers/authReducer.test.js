import {
    AUTH_START,
    // AUTH_SUCCESS,
    AUTH_FILED,
    // REGISTER_START,
    // REGISTER_SUCCESS,
    REGISTER_ERROR,
    // GET_AUTH_USER,
    UPDATE_AUTH_USER,
    UPDATE_AUTH_USER_ACTIVE_LAB,
    UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
    GET_QR_CODE_SUCCESS,
} from '../action-types/auth';
import { GET_USER_SUBSCRIPTION_DATA } from '../action-types/tokenSubscriptions';

import authReducer from './authReducer';

describe('authReducer', () => {
    it('should set initialState when state is undefined', () => {
        const resultState = authReducer(undefined);
        expect(resultState.loading).toBe(false);
        expect(resultState.user).toBe(null);
        expect(resultState.qrCode).toBe(null);
    });

    it('AUTH_START sets loading:true and removes any error objects', () => {
        const initState = {
            something: 'here',
            loading: false,
            error: { an: 'object' },
        };
        const resultState = authReducer(initState, { type: AUTH_START });

        // Make sure it's not the same object
        expect(resultState).not.toBe(initState);

        // Expect the state changes
        expect(resultState.error).toBe(null);
        expect(resultState.loading).toBe(true);

        // Expect other state is un-modified
        expect(resultState.something).toEqual(initState.something);
    });
    it('GET_QR_CODE_SUCCESS sets qrCode from payload', () => {
        const initState = {
            qrCode: '',
        };
        const newQRCode = 'testQrCode';
        const resultState = authReducer(initState, { type: GET_QR_CODE_SUCCESS, payload: newQRCode });
        expect(resultState.qrCode).toBe(newQRCode);
    });
    it('AUTH_FILED sets authenticated to false', () => {
        const initState = {
            authenticated: true,
        };
        const resultState = authReducer(initState, { type: AUTH_FILED });
        expect(resultState.authenticated).toBe(false);
    });
    it('UPDATE_AUTH_USER sets authenticated to true and update user object', () => {
        const testData = {
            user: {
                firstname: 'test',
                lastname: 'test',
                roles: ['testData1'],
                permissions: ['testData2'],
            },

        };
        const initState = {
            loading: false,
            authenticated: false,
            user: {
                roles: ['test'],
                permissions: ['test'],
            },
        };
        const action = {
            type: UPDATE_AUTH_USER,
            payload: testData,
        };

        // testData Before using reducer
        expect(testData.user.roles).toStrictEqual(['testData1']);
        expect(testData.user.permissions).toStrictEqual(['testData2']);

        const resultState = authReducer(initState, action);

        expect(resultState.authenticated).toBe(true);
        expect(resultState.user.firstname).toBe(testData.user.firstname);
        expect(resultState.user.lastname).toBe(testData.user.lastname);
        expect(testData.user.roles).toStrictEqual(resultState.user.roles);
        expect(testData.user.permissions).toStrictEqual(resultState.user.permissions);
    });

    it('REGISTER_ERROR sets "registerLoading" to false and attaches the action.error to error', () => {
        const initState = {
            registerLoading: true,
        };

        const action = {
            type: REGISTER_ERROR,
            error: {
                some: 'error',
                goes: 'here',
            },
        };

        const resultState = authReducer(initState, action);
        expect(resultState.registerLoading).toBe(false);
        expect(resultState.error).toBe(action.error);
    });

    it('UPDATE_AUTH_USER_ACTIVE_LAB removes the given activeLab from the state', () => {
        const testedId = 1;
        const initState = {
            user: {
                activeLabs: [
                    { id: 0 },
                    { id: testedId },
                    { id: 2 },
                ],
            },
        };

        const action = {
            type: UPDATE_AUTH_USER_ACTIVE_LAB,
            payload: testedId,
        };

        const resultState = authReducer(initState, action);

        // Check the removed element isn't there
        expect(resultState.user.activeLabs).not.toContainEqual({ id: testedId });
        expect(resultState.user.activeLabs).toEqual([{ id: 0 }, { id: 2 }]);

        // Make sure it's a new array and the old one was not changed.
        expect(resultState.user.activeLabs).not.toBe(initState.user.activeLabs);
        expect(initState.user.activeLabs).toHaveLength(3);
    });

    it('UPDATE_AUTH_USER_ACTIVE_LAB functions fine if active lab with that id does not exist', () => {
        const testedId = 99;
        const initState = {
            user: {
                activeLabs: [
                    { id: 0 },
                    { id: 1 },
                    { id: 2 },
                ],
            },
        };

        const action = {
            type: UPDATE_AUTH_USER_ACTIVE_LAB,
            payload: testedId,
        };

        const resultState = authReducer(initState, action);

        expect(resultState.user.activeLabs).toEqual([{ id: 0 }, { id: 1 }, { id: 2 }]);
        expect(resultState.user.activeLabs).toHaveLength(3);
    });

    it('UPDATE_AUTH_USER_ACTIVE_LAB_DURATION adjusts the lab_end_at value for a given activeLab', () => {
        const testedId = 1;
        const initState = {
            user: {
                activeLabs: [
                    { id: 0 },
                    { id: testedId },
                    { id: 2 },
                ],
            },
        };
        const originalActiveLabs = JSON.parse(JSON.stringify(initState.user.activeLabs));

        const action = {
            type: UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
            payload: {
                lab_id: testedId,
                lab_end_at: 'asdfasdf',
            },
        };

        const resultState = authReducer(initState, action);

        // Check the expected element has been updated
        expect(resultState.user.activeLabs).toContainEqual({ id: testedId, lab_end_at: action.payload.lab_end_at });

        // Make sure it's a new array and the old one was not changed.
        expect(resultState.user.activeLabs).not.toBe(initState.user.activeLabs);
        expect(initState.user.activeLabs).toEqual(originalActiveLabs);
    });

    it('UPDATE_AUTH_USER_ACTIVE_LAB_DURATION functions fine if active lab with that id does not exist', () => {
        const testedId = 99;
        const initState = {
            user: {
                activeLabs: [
                    { id: 0 },
                    { id: 1 },
                    { id: 2 },
                ],
            },
        };

        const action = {
            type: UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
            payload: {
                lab_id: testedId,
                lab_end_at: 'asdfasdf',
            },
        };

        const resultState = authReducer(initState, action);

        expect(resultState.user.activeLabs).toEqual([{ id: 0 }, { id: 1 }, { id: 2 }]);
        expect(resultState.user.activeLabs).toHaveLength(3);
    });
    it('GET_USER_SUBSCRIPTION_DATA should set the state for user from the payload', () => {
        const userSubscription = {
            lastRenewed: 1641207794,
            subscriptionId: 'sub_test',
            subscriptionName: 'Bronze Monthly',
        };
        const initState = {
            user: {

            },
        };

        const action = {
            type: GET_USER_SUBSCRIPTION_DATA,
            payload: userSubscription,
        };

        const resultState = authReducer(initState, action);

        expect(resultState.user.userSubscription).toStrictEqual(userSubscription);
    });
});
