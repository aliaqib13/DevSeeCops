import {
    FETCH_USER_CERTIFICATES,
    GET_USER_CERTIFICATE_BY_ID,
    SHARE_CERTIFICATE_EMAIL_ERROR,
    SHARE_CERTIFICATE_EMAIL_START,
    SHARE_CERTIFICATE_EMAIL_SUCCESS,
} from '../action-types/certificate';

import certificateReducer from './certificateReducer';

describe('certificateReducer', () => {
    const initialState = {
        loading: false,
        error: null,
        theory_certificates: [],
        completion_certificates: [],
        certificate_of_progress: [],
        certificateById: null,
    };

    it('certificateReducer should return the unaltered state if action is not recognized', () => {
        const action = {};
        const state = { test: 'test' };
        const resultantState = certificateReducer(state, action);

        expect(resultantState).toEqual(state);
    });

    it('SHARE_CERTIFICATE_EMAIL_START should set initialState when state is undefined', () => {
        const action = { type: SHARE_CERTIFICATE_EMAIL_START };
        const resultState = certificateReducer(undefined, action);
        expect(resultState).toEqual(initialState);
    });

    it('SHARE_CERTIFICATE_EMAIL_START should set the state of loading to true', () => {
        const action = {
            type: SHARE_CERTIFICATE_EMAIL_START,
        };

        const resultantState = certificateReducer(initialState, action);

        expect(resultantState.loading).toStrictEqual(true);
        expect(resultantState.error).toStrictEqual(null);
    });

    it('SHARE_CERTIFICATE_EMAIL_SUCCESS should set initialState when state is undefined', () => {
        const action = { type: SHARE_CERTIFICATE_EMAIL_SUCCESS };
        const resultState = certificateReducer(undefined, action);
        expect(resultState).toEqual(initialState);
    });

    it('SHARE_CERTIFICATE_EMAIL_SUCCESS should set the state of loading to true', () => {
        const state = {
            loading: true,
            error: null,
            theory_certificates: [],
            completion_certificates: [],
            certificate_of_progress: [],
            certificateById: null,
        };

        const action = {
            type: SHARE_CERTIFICATE_EMAIL_SUCCESS,
        };

        const resultantState = certificateReducer(state, action);

        expect(resultantState.loading).toStrictEqual(false);
        expect(resultantState.error).toStrictEqual(null);
    });

    it('SHARE_CERTIFICATE_EMAIL_ERROR should set initialState when state is undefined', () => {
        const action = { type: SHARE_CERTIFICATE_EMAIL_ERROR };
        const resultState = certificateReducer(undefined, action);

        expect(resultState).toEqual(initialState);
    });

    it('SHARE_CERTIFICATE_EMAIL_ERROR should set the state of loading to true', () => {
        const state = {
            loading: true,
            error: null,
            theory_certificates: [],
            completion_certificates: [],
            certificate_of_progress: [],
            certificateById: null,
        };

        const action = {
            type: SHARE_CERTIFICATE_EMAIL_ERROR,
            error: 'test',
        };

        const resultantState = certificateReducer(state, action);

        expect(resultantState.loading).toStrictEqual(false);
        expect(resultantState.error).toStrictEqual('test');
    });

    it('FETCH_USER_CERTIFICATES should set initialState when state is undefined', () => {
        const action = { type: FETCH_USER_CERTIFICATES };
        const resultState = certificateReducer(undefined, action);

        expect(resultState).toEqual(initialState);
    });

    it('FETCH_USER_CERTIFICATES should set the state of loading to true', () => {
        const action = {
            type: FETCH_USER_CERTIFICATES,
            payload: {
                certificate_of_theory: [{
                    id: 2,
                    title: 'test',
                    uuid: '32452532',
                }],
                certificate_of_completion: [{
                    id: 11,
                    title: 'test',
                    uuid: '1245454',
                }],
                certificate_of_progress: [{
                    id: 12,
                    title: 'test',
                    uuid: '235325',
                }],
            },
        };

        const resultantState = certificateReducer(initialState, action);

        expect(resultantState.theory_certificates).toStrictEqual(action.payload.certificate_of_theory);
        expect(resultantState.completion_certificates).toStrictEqual(action.payload.certificate_of_completion);
        expect(resultantState.certificate_of_progress).toStrictEqual(action.payload.certificate_of_progress);
    });

    it('GET_USER_CERTIFICATE_BY_ID should set initialState when state is undefined', () => {
        const action = { type: GET_USER_CERTIFICATE_BY_ID, payload: initialState.certificateById };
        const resultState = certificateReducer(undefined, action);

        expect(resultState).toEqual(initialState);
    });

    it('GET_USER_CERTIFICATE_BY_ID should set the state from the payload', () => {
        const action = {
            type: GET_USER_CERTIFICATE_BY_ID,
            payload: {
                id: 10,
                cert_info: {
                    date: '26 Aug, 2020',
                    certificateName: 'in Appreciation',
                },
                course_id: 2,
                courses: {
                    id: 2,
                    title: 'test',
                },
                badge: 'test_badge',
                created_at: 'test_date',
                difficulty: 'difficulty',
                image: 'test_image',
                lab_name: 'test Lab',
                type: 'completion',
                updated_at: 'test_date',
                user_id: 2,
                uuid: '123456',
            },
        };

        const resultantState = certificateReducer(initialState, action);

        expect(resultantState.certificateById).toStrictEqual(action.payload);
    });
});
