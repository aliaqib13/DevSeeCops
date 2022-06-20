import {
    createCourseProposal, submitDrafts, getDesiredCourses, saveCourseProposal, uploadProposalFile, sendQuestionsToSupportTeam, submitProposal, getProposalById,
} from './fellowArea';
import api from '../../services/api';
import imageApi from '../../services/imageApi';
import { GET_DESIRED_COURSES } from '../action-types/fellowArea';

jest.mock('../../services/api');
jest.mock('../../services/imageApi');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/fellowArea', () => {
    describe('getDesiredCourses()', () => {
        it('calls "api/v1/fellow-area/get-desired-courses" and dispatches a GET_DESIRED_COURSES action', async () => {
            const dispatch = jest.fn();
            const mockResponseData = ['desired course'];

            api.get.mockResolvedValue(mockResponseData);
            await getDesiredCourses()(dispatch);
            expect(api.get).toHaveBeenCalledWith('api/v1/fellow-area/get-desired-courses');
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_DESIRED_COURSES,
                payload: mockResponseData.data,
            });
        });

        it('getDesiredCourses() returns an error when GET fails', async () => {
            const dispatch = jest.fn();
            const mockRejectedData = {
                response: null,
            };

            api.get.mockRejectedValue(mockRejectedData);
            const response = await getDesiredCourses()(dispatch);

            expect(api.get).toHaveBeenCalledWith('api/v1/fellow-area/get-desired-courses');
            expect(response.message).toEqual('Something went wrong, please try again.');
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
    });

    describe('createCourseProposal()', () => {
        it('calls api.post with the courseId', async () => {
            const mockResponseData = {
                id: 1,
                fellow: 'Dominik',
            };
            const data = {
                courseId: 1,
            };

            api.post.mockResolvedValue(mockResponseData);
            const response = await api.post('api/v1/fellow-area/proposal', data);

            expect(api.post).toHaveBeenCalledWith('api/v1/fellow-area/proposal', data);
            expect(response).toEqual(mockResponseData);
        });

        it('returns the error data from a failed POST', async () => {
            const errData = {
                message: 'Something went wrong, please try again.',
            };
            api.post.mockRejectedValue(errData);

            const response = await createCourseProposal()();

            expect(response).toEqual(errData);
        });
    });

    describe('sendQuestionsToSupportTeam()', () => {
        it('calls api.post with the Message content', async () => {
            const messageData = 'testing Content';

            api.post.mockResolvedValue({ status: 200, body: { message: 'Message sent successfully' } });
            const response = await api.post('api/v1/fellow-area/sendMessageToSupport', messageData);

            expect(api.post).toHaveBeenCalledWith('api/v1/fellow-area/sendMessageToSupport', messageData);
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Message sent successfully');
        });

        it('returns the error data from a failed POST', async () => {
            const errData = {
                message: "Couldn't send a message, please try again.",
            };
            api.post.mockRejectedValue(errData);

            const response = await sendQuestionsToSupportTeam()();

            expect(response).toEqual(errData);
        });
    });
    describe('uploadProposalFile()', () => {
        it('returns an error when POST fails', async () => {
            const errData = {
                message: 'Something went wrong, please try again.',
            };
            imageApi.post.mockRejectedValue(errData);

            const response = await uploadProposalFile()();

            expect(response).toEqual(errData);
        });
        it('returns filePath and status 201', async () => {
            const data = {
                file: 'some file.txt',
            };

            const mockResponseData = {
                status: 201,
                filePath: 'some path',
            };

            imageApi.post.mockResolvedValue(mockResponseData);

            const response = await uploadProposalFile(data)();

            expect(response).toEqual(mockResponseData);
        });
    });

    describe('saveCourseProposal()', () => {
        it('returns an error when PATCH fails', async () => {
            const errData = {
                message: 'Something went wrong, please try again.',
            };

            api.patch.mockRejectedValue(errData);

            const response = await saveCourseProposal()();

            expect(response).toEqual(errData);
        });

        it('calls saveCourseProposal() with proposalId and data', async () => {
            const proposalId = 1;
            const data = {
                suitability_explanation: 'test success',
            };
            const mockResponseData = {
                id: 1,
                suitability_explanation: 'test success',
            };

            api.patch.mockResolvedValue(mockResponseData);

            const response = await api.patch(`api/v1/fellow-area/proposal/${proposalId}`, data);

            expect(api.patch).toHaveBeenCalledWith(`api/v1/fellow-area/proposal/${proposalId}`, data);
            expect(response).toEqual(mockResponseData);
        });
    });

    describe('submitProposal()', () => {
        it('returns an error when POST fails', async () => {
            const errData = {
                message: 'Something went wrong, please try again.',
            };
            api.post.mockRejectedValue(errData);
            const response = await submitProposal()();
            expect(response).toEqual(errData);
        });

        it('calls submitProposal() with data', async () => {
            const data = {
                id: 1,
            };
            const mockResponseData = {
                id: 1,
            };
            api.post.mockResolvedValue(mockResponseData);
            const response = await submitProposal(data)();
            expect(api.post).toHaveBeenCalledWith('api/v1/fellow-area/proposal/submitProposal', data);
            expect(response).toEqual(mockResponseData);
        });
    });
    describe('submitDrafts()', () => {
        it('returns an error when POST fails', async () => {
            const errData = false;
            api.post.mockRejectedValue(errData);
            const response = await submitDrafts()();
            expect(response).toEqual(errData);
        });

        it('calls submitDrafts() with drafts', async () => {
            const drafts = [
                {
                    user_id: 1,
                    field_id: 1,
                    value: 'Test',
                    is_course_created: 0,
                },
            ];
            const mockResponseDrafts = [
                {
                    user_id: 1,
                    field_id: 1,
                    value: 'Test',
                    is_course_created: 0,
                },
            ];
            api.post.mockResolvedValue(mockResponseDrafts);
            const response = await submitDrafts(drafts)();
            expect(api.post).toHaveBeenCalledWith('/api/v1/fellow-area/submit-draft', { drafts });
            expect(response).toEqual(true);
        });
    });

    describe('getProposalById()', () => {
        it('calls getProposalById() with id', async () => {
            const id = 1;
            const mockResponseData = {
                id: 1,
            };
            api.get.mockResolvedValue(mockResponseData);
            const response = await getProposalById(id)();
            expect(response.id).toEqual(id);
        });

        it('returns an error when GET fails', async () => {
            const errData = {
                message: 'Something went wrong, please try again.',
            };
            api.get.mockRejectedValue(errData);
            const response = await getProposalById()();
            expect(response).toEqual(errData);
        });
    });
});
