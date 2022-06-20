import { GET_PUBLIC_CERTIFICATE_BY_ID } from '../../action-types/certificate';

const initialState = {
    data: {},
};

export default function publicCheckCertificateReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === GET_PUBLIC_CERTIFICATE_BY_ID) {
        return {
            ...state,
            data: action.payload,
        };
    }

    // If we're not processing the action, return this state unaltered.
    return state;
}
