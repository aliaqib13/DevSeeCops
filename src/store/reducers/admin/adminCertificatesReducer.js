import {
    ADMIN_FETCH_CERTIFICATES,
    ADMIN_DELETE_CERTIFICATE,
    ADMIN_UPDATE_CERTIFICATE,
}
    from '../../action-types/admin/menageCertificate';

const initialState = {
    certificates: [],
};

export default function adminCertificatesReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case ADMIN_FETCH_CERTIFICATES:
        return {
            ...state,
            certificates: action.payload,
        };
    case ADMIN_DELETE_CERTIFICATE: {
        const certificates = state.certificates.filter(item => item.id !== action.payload);
        return {
            ...state,
            certificates,
        };
    }
    case ADMIN_UPDATE_CERTIFICATE: {
        const certificates = state.certificates.map(item => {
            if (item.id === action.payload.id) {
                return action.payload;
            }
            return item;
        });
        return {
            ...state,
            certificates,
        };
    }

    default:
        return state;
    }
}
