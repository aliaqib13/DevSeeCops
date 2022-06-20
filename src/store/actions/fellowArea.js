import {
    FETCH_FELLOW_COURSES, GET_DESIRED_COURSES, CREATE_COURSE_PROPOSAL, GET_PROPOSALS,
} from '../action-types/fellowArea';
import api from '../../services/api';
import imageApi from '../../services/imageApi';

export function fetchFellowCourses() {
    return async dispatch => {
        try {
            const res = await api.get('/api/v1/fellow-area');
            dispatch({
                type: FETCH_FELLOW_COURSES,
                payload: res.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
        return null;
    };
}

export function saveDrafts(drafts) {
    return async () => {
        try {
            await api.post('/api/v1/fellow-area/save-draft', { drafts });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function searchCourse(keyword) {
    return async () => {
        try {
            const res = await api.get(`api/v1/search-fellow-courses?keyword=${keyword}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function fetchLabBlocks() {
    return async () => {
        try {
            const res = await api.get('api/v1/get-lab-blocks');
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function assignLabBlocks(data) {
    return async () => {
        try {
            await api.post('api/v1/assign-lab-blocks', data);
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function getLabBlocks(id) {
    return async () => {
        try {
            const res = await api.get(`api/v1/get-lab-blocks/${id}`);
            return res.data;
        } catch (e) {
            return false;
        }
    };
}

export function getCourseScenarios() {
    return async () => {
        try {
            const res = await api.get('api/v1/fellow-area/get-course-scenarios');
            return res.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function submitDrafts(drafts) {
    return async () => {
        try {
            await api.post('/api/v1/fellow-area/submit-draft', { drafts });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function notifyScenarioSelection(data) {
    return async () => {
        try {
            await api.post('/api/v1/fellow-area/notify-scenario-selection', { data });
            return true;
        } catch (e) {
            return false;
        }
    };
}

export function clearDrafts() {
    return async () => {
        try {
            await api.delete('/api/v1/fellow-area/delete-drafts');
            return true;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getDesiredCourses() {
    return async dispatch => {
        try {
            const res = await api.get('api/v1/fellow-area/get-desired-courses');
            dispatch({
                type: GET_DESIRED_COURSES,
                payload: res.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
        return null;
    };
}

export function createCourseProposal(data) {
    return async dispatch => {
        try {
            const response = await api.post('api/v1/fellow-area/proposal', data);
            dispatch({
                type: CREATE_COURSE_PROPOSAL,
                payload: response.data,
            });
            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function uploadProposalFile(id, fileName, data) {
    return async () => {
        try {
            const response = await imageApi.post(`api/v1/fellow-area/proposal/upload-files/${id}/${fileName}`, data);
            return response;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function saveCourseProposal(proposalId, data) {
    return async () => {
        try {
            const response = await api.patch(`api/v1/fellow-area/proposal/${proposalId}`, data);
            return response.data;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getProposals() {
    return async dispatch => {
        try {
            const response = await api.get('api/v1/fellow-area/proposals');
            dispatch({
                type: GET_PROPOSALS,
                payload: response.data,
            });
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
        return null;
    };
}

export function sendQuestionsToSupportTeam(message) {
    return async () => {
        try {
            const response = await api.post('api/v1/fellow-area/sendMessageToSupport', message);
            return response;
        } catch (error) {
            return error.response ? error.response.data : { message: "Couldn't send a message, please try again." };
        }
    };
}

export function submitProposal(data) {
    return async () => {
        try {
            const response = await api.post('api/v1/fellow-area/proposal/submitProposal', data);
            return response;
        } catch (error) {
            return error.response ? error.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}

export function getProposalById(id) {
    return async () => {
        try {
            const response = await api.get(`/api/v1/fellow-area/proposal/${id}`);
            return response;
        } catch (e) {
            return e.response ? e.response.data : { message: 'Something went wrong, please try again.' };
        }
    };
}
