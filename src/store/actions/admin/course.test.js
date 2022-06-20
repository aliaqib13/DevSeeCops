import api from '../../../services/api';
import {
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    GET_COURSE_BY_ID_START,
    GET_COURSE_BY_ID_SUCCESS,
    GET_COURSE_BY_ID_ERROR,
    UPDATE_COURSE,
    ADMIN_FETCH_CATEGORY,
    CREATE_COURSE,
} from '../../action-types/admin/course';
import {
    createCategory, deleteCategory, fetchCategories, updateCategory, getCourseById, updateCourse, updateCourseAdmin,
    getCategory, createCourse,
} from './course';
import { COURSE_STATUSES } from '../../../constants';

jest.mock('../../../services/api');

describe('src/store/actions/admin/course.js', () => {
    describe('updateCategory', () => {
        it('should dispatch UPDATE_CATEGORY, if api returns updated data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    id: 15,
                    name: 'test category`',
                },

            };
            api.put.mockResolvedValue(mockResData);
            const data = {
                id: 15,
                name: 'test cat',
            };
            await updateCategory(data.id, data)(dispatch);

            expect(api.put).toHaveBeenCalledWith(`api/v1/admin/categories/${data.id}`, data);

            expect(dispatch).toHaveBeenCalledWith({
                type: UPDATE_CATEGORY,
                payload: mockResData.data,
            });
        });
        it('should dispatch CREATE_COURSE', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    title: 'test title',
                    content: 'test content',
                    status: 'draft',
                    image: 'test image',
                    category: 1,
                    description: 'test category',
                    theory_duration: '15m',
                    token_cost: 15,
                    slug: 'test slug',
                    author: 'test',
                    version: '1.0.0',
                    difficulty: 0,
                    cert_badge: 0,
                    preview_video: null,

                    course_is_for: null,
                    required_exp: null,
                    will_learn: null,
                    author_bio: null,
                    version_date: null,
                    value_rating: null,
                    number_of_ratings: null,
                    enrolled_students: null,
                    certificate_of_completion: 1,
                    lab_steps_in_personal_archive: 1,
                    linkedIn_url: null,
                    author_pic: null,
                    publicly_visible: 0,

                    type: 'standard',
                },

            };
            api.post.mockResolvedValue(mockResData);
            const data = {
                title: 'test title',
                content: 'test content',
                status: 'Draft',
                image: 'test image',
                category: 1,
                description: 'test category',
                theory_duration: '15m',
                token_cost: 15,
                slug: 'test slug',
                author: 'test',
                version: '1.0.0',
                difficulty: 0,
                cert_badge: 0,
                preview_video: null,

                course_is_for: null,
                required_exp: null,
                will_learn: null,
                author_bio: null,
                version_date: null,
                value_rating: null,
                number_of_ratings: null,
                enrolled_students: null,
                certificate_of_completion: 1,
                lab_steps_in_personal_archive: 1,
                linkedIn_url: null,
                author_pic: null,
                publicly_visible: 0,

                type: 'standard',
            };

            await createCourse(data, data)(dispatch);

            expect(api.post).toHaveBeenCalledWith('api/v1/admin/courses', data);

            expect(dispatch).toHaveBeenCalledWith({
                type: CREATE_COURSE,
                payload: mockResData.data,
            });
        });

        it('should  dispatch CREATE_CATEGORY, if api returns created data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: {
                    id: 3,
                    name: 'new cat',
                },

            };
            api.post.mockResolvedValue(mockResData);

            const data = {
                name: 'new cat',
            };
            await createCategory(data)(dispatch);
            expect(api.post).toHaveBeenCalledWith('api/v1/admin/categories', data);
            expect(dispatch).toHaveBeenCalledWith({
                type: CREATE_CATEGORY,
                payload: mockResData.data,
            });
        });

        it('should dispatch DELETE_CATEGORY when category deleted', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                id: 3,
            };
            api.delete.mockResolvedValue(mockResData);
            await deleteCategory(0, mockResData.id)(dispatch);
            expect(api.delete).toHaveBeenCalledWith(`api/v1/admin/categories/${mockResData.id}`);
            expect(dispatch).toHaveBeenCalledWith({
                type: DELETE_CATEGORY,
                payload: mockResData.id,
            });
        });

        it('should dispatch FETCH_CATEGORIES, when api returns fetching data', async () => {
            const dispatch = jest.fn();
            const mockResData = {
                data: [{
                    id: 3,
                    name: 'first cat',
                },
                {
                    id: 4,
                    name: 'second cat',
                },
                ],
            };

            api.get.mockResolvedValue(mockResData);
            await fetchCategories()(dispatch);

            expect(api.get).toHaveBeenCalledWith('api/v1/admin/categories');
            expect(dispatch).toHaveBeenCalledWith({
                type: FETCH_CATEGORIES,
                payload: mockResData.data,
            });
        });
    });
    describe('courses', () => {
        it('should dispatch GET_COURSE_BY_ID_START and GET_COURSE_BY_ID_SUCCESS, when returns data ', async () => {
            const dispatch = jest.fn();
            const mockData = {
                data: {
                    id: 1,
                    title: 'Secrets Management in CI/CD',
                    slug: 'secrets-management-for-ci-cd',
                    image: '/img/sm-2.jpg',
                    description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                    content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                    category: 1,
                    status: COURSE_STATUSES.DEVELOPMENT,
                    theory_duration: '15m',
                    price: 100.99,
                    information: 1,
                },
            };
            api.get.mockResolvedValue(mockData);
            await getCourseById(mockData.data.id)(dispatch);
            expect(api.get).toHaveBeenCalledWith(`api/v1/admin/courses/${mockData.data.id}`);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_COURSE_BY_ID_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_COURSE_BY_ID_SUCCESS,
                payload: mockData.data,
            });
        });

        it('should dispatch GET_COURSE_BY_ID_ERROR when returns wrong data ', async () => {
            const dispatch = jest.fn();
            const mockData = {
                data: {
                    message: 'Something went wrong, please try again.',
                },
            };
            const param = {
                id: 1,
            };
            api.get.mockRejectedValue(mockData);
            await getCourseById(param.id)(dispatch);
            expect(api.get).toHaveBeenCalledWith(`api/v1/admin/courses/${param.id}`);
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_COURSE_BY_ID_START,
            });
            expect(dispatch).toHaveBeenCalledWith({
                type: GET_COURSE_BY_ID_ERROR,
                error: mockData.data,
            });
        });
    });

    it('should dispatch UPDATE_COURSE, when api returns success data', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                id: 1,
                title: 'Secrets Management in CI/CD',
                slug: 'secrets-management-for-ci-cd',
                image: '/img/sm-2.jpg',
                description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                category: 1,
                status: COURSE_STATUSES.DEVELOPMENT,
                theory_duration: '15m',
                price: 100.99,
                information: 1,
            },
        };
        api.put.mockResolvedValue(mockData);
        await updateCourse(mockData.data.id, mockData.data)(dispatch);
        expect(api.put).toHaveBeenCalledWith(`api/v1/admin/courses/${mockData.data.id}`, mockData.data);
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_COURSE,
            payload: mockData.data,
        });
    });
    it('should dispatch wrong message, when api returns wrong  data', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                message: 'Something went wrong, please try again.',
            },
        };
        const param = {
            data: {
                id: 1,
                title: 'Secrets Management in CI/CD',
                slug: 'secrets-management-for-ci-cd',
                image: '/img/sm-2.jpg',
                description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                category: 1,
                status: COURSE_STATUSES.DEVELOPMENT,
                theory_duration: '15m',
                price: 100.99,
                information: 1,
            },
        };
        api.put.mockRejectedValue(mockData);
        await updateCourse(param.data.id, param.data)(dispatch);
        expect(api.put).toHaveBeenCalledWith(`api/v1/admin/courses/${param.data.id}`, param.data);
    });

    it('should dispatch UPDATE_COURSE, for admin user when api returns success data', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                id: 1,
                title: 'Secrets Management in CI/CD',
                slug: 'secrets-management-for-ci-cd',
                image: '/img/sm-2.jpg',
                description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                category: 1,
                status: COURSE_STATUSES.DEVELOPMENT,
                theory_duration: '15m',
                price: 100.99,
                information: 1,
            },
        };
        api.put.mockResolvedValue(mockData);
        await updateCourseAdmin(mockData.data.id, mockData.data)(dispatch);
        expect(api.put).toHaveBeenCalledWith(`api/v1/admin/courses-admin/${mockData.data.id}`, mockData.data);
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_COURSE,
            payload: mockData.data,
        });
    });
    it('should dispatch wrong message, for admin user when api returns wrong  data', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                message: 'Something went wrong, please try again.',
            },
        };
        const param = {
            data: {
                id: 1,
                title: 'Secrets Management in CI/CD',
                slug: 'secrets-management-for-ci-cd',
                image: '/img/sm-2.jpg',
                description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                category: 1,
                status: COURSE_STATUSES.DEVELOPMENT,
                theory_duration: '15m',
                price: 100.99,
                information: 1,
            },
        };
        api.put.mockRejectedValue(mockData);
        await updateCourseAdmin(param.data.id, param.data)(dispatch);
        expect(api.put).toHaveBeenCalledWith(`api/v1/admin/courses-admin/${param.data.id}`, param.data);
    });

    it('should dispatch ADMIN_FETCH_CATEGORY, for admin user when api returns success data', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                created_at: null,
                id: 1,
                name: 'Secrets Management',
                updated_at: null,
            },
        };
        api.get.mockResolvedValue(mockData);
        const data = await getCategory(mockData.data.id)(dispatch);
        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/categories/${mockData.data.id}`);
        expect(dispatch).toHaveBeenCalledWith({
            type: ADMIN_FETCH_CATEGORY,
            payload: mockData.data,
        });
        expect(data).toBe(true);
    });
    it('when api returns wrong  data it should not dispatch any actions', async () => {
        const dispatch = jest.fn();
        const mockData = {
            data: {
                message: 'Something went wrong, please try again.',
            },
        };
        const param = {
            data: {
                created_at: null,
                id: 1,
                name: 'Secrets Management',
                updated_at: null,
            },
        };
        api.get.mockRejectedValue(mockData);
        const data = await getCategory(param.data.id)(dispatch);
        expect(api.get).toHaveBeenCalledWith(`api/v1/admin/categories/${param.data.id}`);
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(data).toBe(false);
    });
});
