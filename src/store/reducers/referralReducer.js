import { CREATE_REFERRAL, FETCH_REFERRALS, DELETE_REFERRAL } from '../action-types/referrals';
import { BASE_URL } from '../../util/processEnv';

const initialState = {
    data: [],
};

export default function referralReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
    case FETCH_REFERRALS: {
        const withLink = [...action.payload].map(e => {
            const link = `${BASE_URL}/register/${e.token}`;
            return { ...e, link };
        });
        return {
            data: [...withLink],
        };
    }
    case CREATE_REFERRAL: {
        const data = { ...action.payload };
        const link = `${BASE_URL}/register/${data.token}`;
        data.link = link;
        return {
            ...state,
            data: [...state.data, data],
        };
    }
    case DELETE_REFERRAL: {
        const deleteReferral = [...state.data];
        const index = deleteReferral.findIndex(e => +e.id === +action.payload.id);
        deleteReferral.splice(index, 1);
        return {
            ...state,
            data: [...deleteReferral],
        };
    }
    default:
        return state;
    }
}
