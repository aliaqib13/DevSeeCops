import { createNotifyMe, deleteNotifyCourse } from './course';
import api from '../../services/api';

// Use the api mock
jest.mock('../../services/api');

describe('src/store/actions/course.js', () => {
    describe('createNotifyMe()', () => {
        const id = 1;
        const url = `api/v1/courses/${id}/interested`;
        it('Return interested true', async () => {
            const mockResponseData = { interested: true };
            api.post.mockResolvedValue(mockResponseData);
            const result = await createNotifyMe(1)();
            expect(result.interested).toBe(mockResponseData.interested);
            expect(api.post).toHaveBeenCalledWith(url);
        });
        it('Return interested false', async () => {
            const errData = false;
            api.post.mockResolvedValue(errData);
            const result = await createNotifyMe()();
            expect(result).toBe(errData);
            expect(api.post).toHaveBeenCalledWith(url);
        });
    });

    describe('deleteNotifyCourse()', () => {
        const id = 1;
        const url = `api/v1/courses/${id}/interested`;
        it('Return interested true', async () => {
            const mockResponseData = { status: 200 };
            api.delete.mockResolvedValue(mockResponseData);
            const result = await deleteNotifyCourse(1)();
            expect(result.status).toBe(mockResponseData.status);
            expect(api.delete).toHaveBeenCalledWith(url);
        });
        it('Return interested false when we call deleteNotifyCourse without course id', async () => {
            const errData = false;
            api.post.mockResolvedValue(errData);
            const result = await deleteNotifyCourse()();
            expect(result).toBe(errData);
            expect(api.delete).toHaveBeenCalledWith(url);
        });
    });
});
