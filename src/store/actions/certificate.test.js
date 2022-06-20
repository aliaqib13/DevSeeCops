import {
    getUserCertificateById,
} from './certificate';
import api from '../../services/api';
import { GET_USER_CERTIFICATE_BY_ID } from '../action-types/certificate';

jest.mock('../../services/api');
jest.mock('../../services/imageApi');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('src/store/actions/certificate', () => {
    describe('getUserCertificateById()', () => {
        it("calls 'api/v1/certificate/${id}' and dispatches a GET_USER_CERTIFICATE_BY_ID action", async () => {
            const dispatch = jest.fn();
            const id = 10;
            const mockResponseData = {
                data: {
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
            api.get.mockResolvedValue(mockResponseData);

            const response = await getUserCertificateById(id)(dispatch);

            expect(api.get).toHaveBeenCalledWith(`api/v1/certificate/${id}`);
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_USER_CERTIFICATE_BY_ID,
                payload: mockResponseData.data,
            });
            expect(response).toBe(true);
        });

        it("calls 'api/v1/certificate/${id}' returns an error when GET fails", async () => {
            const dispatch = jest.fn();
            const id = 10;
            const mockRejectedData = {
                response: null,
            };

            api.get.mockRejectedValue(mockRejectedData);
            const response = await getUserCertificateById(id)(dispatch);

            expect(api.get).toHaveBeenCalledWith(`api/v1/certificate/${id}`);
            expect(response.message).toEqual('Something went wrong getting certificate data, please try again.');
            expect(dispatch).toHaveBeenCalledTimes(0);
        });
    });
});
