import {
    ADMIN_FETCH_ACTIVE_LAB_HISTORY,
    ADMIN_SET_ACTIVE_LAB_DURATION,
    ADMIN_CHANGE_PROGRESS,
    ADMIN_FETCH_ACTIVE_LAB,

} from '../../action-types/admin/activeLabsHistory';
import {
    UPDATE_AUTH_USER_ACTIVE_LAB,
    UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
} from '../../action-types/auth';

import {
    deleteActiveLabHistory,
    fetchActiveLabsHistory,
    fetchActiveLabs,
    updateActiveLabHistoryProgress,
    setDuration,
    getActiveLab,
    getLabReport,
    checkLabStages,
    resetChecker,
    sendEmailToUser,
} from './acitveLabsHistory';

import api from '../../../services/api';

jest.mock('../../../services/api');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/admin/activeLabsHistory.js', () => {
    it('fetchActiveLabsHistory() call with default values', async () => {
        // Arrange
        const dispatch = jest.fn();

        const activeLabs = [
            {
                id: 1,
                name: 'test lab',
            },
        ];

        // Act
        await api.get.mockResolvedValue({ data: activeLabs });

        await fetchActiveLabsHistory()(dispatch);

        // Assert
        expect(api.get).toHaveBeenCalledWith('api/v1/admin/active-labs-history', {
            params: {
                page: 1,
            },
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_FETCH_ACTIVE_LAB_HISTORY,
            payload: activeLabs,
        });
    });

    it('fetchActiveLabsHistory() call with userValues', async () => {
        // Arrange
        const dispatch = jest.fn();
        const searchData = {
            userSearch: 'Random user',
            statusSearch: 'Testing',
            filterOutDSOA: true,
        };
        // Act
        await fetchActiveLabsHistory(searchData)(dispatch);

        // Assert
        const { userSearch, statusSearch } = searchData;
        expect(api.get).toHaveBeenCalledWith('api/v1/admin/active-labs-history', {
            params: {
                user: userSearch,
                status: statusSearch,
                page: 1,
                filterOutDSOA: true,
            },
        });
    });

    it('fetchActiveLabsHistory() doesnt call dispatch on rejected request', async () => {
        // Arrange
        const dispatch = jest.fn();

        const mockResponseData = {
            response: {
                status: 500,
                data: 'Something went wrong, please try again',
            },
        };

        // Act
        api.get.mockRejectedValue(mockResponseData);

        await fetchActiveLabsHistory()(dispatch);

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('fetchActiveLabs() calls with default values', async () => {
        // Arrange
        const dispatch = jest.fn();
        const activeLabs = [
            {
                id: 1,
                name: 'test lab',
            },
        ];
        // Act
        const res = api.get.mockResolvedValue(activeLabs);

        await fetchActiveLabs()(dispatch);

        // Assert
        expect(api.get).toHaveBeenCalledWith('api/v1/admin/active-labs?page=1&pageSize=10');

        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_FETCH_ACTIVE_LAB,
            payload: res.activeLabs,
        });
    });

    it('fetchActiveLabs() doesnt call dispatch on rejected request', async () => {
        // Arrange
        const dispatch = jest.fn();
        const mockResponseData = {
            response: {
                status: 401,
                data: 'Unauthorized',
            },
        };
        // Act
        api.get.mockRejectedValue(mockResponseData);

        await fetchActiveLabs()(dispatch);

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('deleteActiveLabHistory() calls UPDATE_AUTH_USER_ACTIVE_LAB', async () => {
        // Arrange
        const dispatch = jest.fn();

        const mockResponseData = {
            status: 201,
            job_id: 1,
        };
        const data = {
            someData: Math.random().toString(),
        };
        const aLabId = 1;

        // Act
        api.post.mockResolvedValue(mockResponseData);

        await deleteActiveLabHistory(data, aLabId)(dispatch);

        // Assert
        expect(api.post).toHaveBeenCalledWith('api/v1/admin/active-labs/delete', data);

        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_AUTH_USER_ACTIVE_LAB,
            payload: aLabId,
        });
    });

    it('deleteActiveLabHistory() return Something went wrong', async () => {
        const dispatch = jest.fn();

        const mockResponseData = {
            response: {
                status: 422,
                data: 'Something went wrong, please try again',
            },
        };

        api.post.mockRejectedValue(mockResponseData);

        const data = {
            someData: Math.random().toString(),
        };

        const response = await deleteActiveLabHistory(data)(dispatch);

        expect(dispatch).not.toHaveBeenCalled();
        expect(response).toEqual('Something went wrong, please try again');
    });

    it('deleteActiveLabHistory() return true on 422 Lab is already destroyed', async () => {
        const dispatch = jest.fn();

        const mockResponseData = {
            response: {
                status: 422,
                data: {
                    message: 'Lab is already destroyed',
                },
            },
        };

        api.post.mockRejectedValue(mockResponseData);

        const data = {
            someData: Math.random().toString(),
        };

        const response = await deleteActiveLabHistory(data)(dispatch);

        expect(dispatch).not.toHaveBeenCalled();
        expect(response).toEqual(true);
    });

    it('updateActiveLabHistoryProgress() calls dispatch with ADMIN_CHANGE_PROGRESS', async () => {
        // Arrange
        const dispatch = jest.fn();
        const id = 1;
        const data = {
            a_lab_id: 1,
            status: 'TEST-COMPLETED',
        };
        // Act
        const res = api.post.mockResolvedValue(data);

        await updateActiveLabHistoryProgress(id, data)(dispatch);
        // Assert
        expect(api.post).toHaveBeenCalledWith('api/v1/admin/active-labs/change-status/1', data);

        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_CHANGE_PROGRESS,
            payload: {
                lab: res.data,
                id,
            },
        });
    });

    it('updateActiveLabHistoryProgress() doesnt call dispatch on rejected promise', async () => {
        // Arrange
        const dispath = jest.fn();
        const mockResponseData = {
            response: {
                status: 500,
                data: 'Something went wrong',
            },
        };
        // Act
        api.post.mockRejectedValue(mockResponseData);

        await updateActiveLabHistoryProgress()(dispath);
        // Assert
        expect(dispath).not.toHaveBeenCalled();
    });

    it('setDuration() calls ADMINSET_ACTIVE_LAB_DURATION, UPDATE_AUTH_USER_ACTIVE_LAB_DURATION', async () => {
        // Arrange
        const dispatch = jest.fn();

        const mockResponseData = {
            data: {
                id: 1,
                duration: 10,
                lab_end_at: 120,
            },
        };
        // Act
        api.post.mockResolvedValue(mockResponseData);

        const { id, duration } = mockResponseData.data;
        await setDuration(id, duration)(dispatch);
        // Assert
        expect(api.post).toHaveBeenCalledWith('api/v1/admin/active-labs/change-duration', {
            id, duration,
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_SET_ACTIVE_LAB_DURATION,
            payload: mockResponseData.data,
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_AUTH_USER_ACTIVE_LAB_DURATION,
            payload: {
                lab_end_at: mockResponseData.data.lab_end_at,
                lab_id: mockResponseData.data.id,
            },
        });
    });

    it('setDuration() doenst call dispatch on rejected promise', async () => {
        // Arrange
        const dispatch = jest.fn();
        const mockResponseData = {
            response: {
                status: 500,
                data: 'Something went wrong',
            },
        };

        // Act
        api.post.mockRejectedValue(mockResponseData);

        await setDuration()(dispatch);

        // Assert
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('getActiveLab() gets called', async () => {
        // Arrange
        const dispatch = jest.fn();
        const id = 1;
        const mockResolvedValue = 'Some test data';

        // Act
        api.get.mockResolvedValue(mockResolvedValue);

        await getActiveLab(id)(dispatch);

        // Assert
        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/active-lab/${id}`);
    });

    it('getLabReport() gets called', async () => {
        // Arrange
        const dispatch = jest.fn();
        const activeLabId = 1;
        const mockResolvedValue = 'Some test data';

        // Act
        api.get.mockResolvedValue(mockResolvedValue);

        await getLabReport(activeLabId)(dispatch);

        // Assert
        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/active-labs/get-report/${activeLabId}`);
    });

    it('checkLabStages() gets called', async () => {
        // Arrange
        const dispatch = jest.fn();
        const activeLabId = 1;
        const mockResolvedValue = 'Some test data';

        // Act
        api.get.mockResolvedValue(mockResolvedValue);

        await checkLabStages(activeLabId)(dispatch);

        // Assert
        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/active-labs/check-lab/${activeLabId}`);
    });

    it('resetChecker() gets called', async () => {
        // Arrange
        const dispatch = jest.fn();
        const activeLabId = 1;
        const data = {
            activeLabID: activeLabId,
        };
        const mockResolvedValue = 'Some test data';

        // Act
        api.post.mockResolvedValue(mockResolvedValue);

        await resetChecker(activeLabId)(dispatch);

        // Assert
        expect(api.post).toHaveBeenCalledWith('api/v1/admin/active-labs/reset-checker', data);
    });

    it('sendEmailToUser() gets called', async () => {
        // Arrange
        const dispatch = jest.fn();
        const data = 'Some test data';
        const mockResolvedValue = 'Some test data';

        // Act
        api.post.mockResolvedValue(mockResolvedValue);

        await sendEmailToUser(data)(dispatch);

        // Assert
        expect(api.post).toHaveBeenCalledWith('api/v1/admin/send-email-to-active-lab-user', data);
    });
});
