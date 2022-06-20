import React from 'react';
import { shallow } from 'enzyme';
import { Categories } from './index';
import { COURSE_STATUSES } from '../../../constants';

const props = {
    categories: [
        {
            id: 1,
            name: 'Secrets Management',
            created_at: null,
            updated_at: '2021-03-26 11:24:57',
            courses: [
                {
                    id: 1,
                    title: 'Secrets Management for your applications',
                    description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                    information: {
                        steps: 21,
                        videos: 0,
                        quizzes: 1,
                    },
                    course_is_for: [],
                    required_exp: '<p>Test</p>\n',
                    will_learn: [
                        'Docker, Kubernetes',
                    ],
                    tools_used: [
                        'kubernetes',
                    ],
                    preview_video: null,
                    preview_video2: null,
                    cert_badge: 0,
                    version: '1.0.0',
                    difficulty: 0,
                    content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                    views: 311,
                    image: '/img/sm.jpg',
                    author: 'John Smith',
                    theory_duration: '15m',
                    price: 0,
                    slug: 'secrets-management-for-your-applications',
                    linkedIn_url: 'https://www.linkedin.com/company/araidohq/',
                    category_id: 1,
                    created_at: '2020-11-10 17:12:18',
                    updated_at: '2021-03-12 11:15:33',
                    author_bio: 'bio',
                    version_date: null,
                    value_rating: null,
                    number_of_ratings: null,
                    enrolled_students: null,
                    certificate_of_completion: 1,
                    lab_steps_in_personal_archive: 1,
                    author_pic: 'c15659d7-2edc-4bc5-bd9e-b70ca303fae3',
                    publicly_visible: 1,
                    stripe_product_id: '{"usd":"prod_IjrFnuCQyjL3ca","eur":"prod_IjrFocHJyPWEoP"}',
                    stripe_price_id: '{"usd":"price_1I8NXJE2GQolyFR7RnIhArM7","eur":"price_1I8NXKE2GQolyFR73lG6GEmQ"}',
                    is_template: 0,
                    template_id: null,
                    access_request: 0,
                    is_from_draft: 0,
                    status: COURSE_STATUSES.PRODUCTION,
                    second_author: 'Secod Author',
                    second_author_bio: 'Second Author Bio',
                    second_author_pic: '5c7ea66e-d807-40b6-91e5-38d65a731364',
                    second_linkedIn_url: 'https://www.linkedin.com/company/apple/',
                    theory_title: 'Theory lab',
                    theory_description: 'This will open a lab where you will learn more about secrets management concepts',
                    free_access: 0,
                    type: 'standard',
                },
            ],
        },
        {
            id: 2,
            name: 'Container Security',
            created_at: null,
            updated_at: null,
            courses: [
                {
                    id: 4,
                    title: 'Container Security in CI/CD',
                    description: 'Making sure your containers are secure',
                    information: {
                        steps: 19,
                        videos: 0,
                        quizzes: 1,
                    },
                    course_is_for: [
                    ],
                    required_exp: null,
                    will_learn: [
                    ],
                    tools_used: [
                    ],
                    preview_video: null,
                    preview_video2: null,
                    cert_badge: 0,
                    version: '1.0.0',
                    difficulty: 0,
                    content: 'At the end of this course you will know how to make sure you are running safe container in production',
                    views: 39,
                    image: 'https://i2.wp.com/foxutech.com/wp-content/uploads/2017/03/Docker-Security.png?fit=820%2C407&ssl=1',
                    author: null,
                    theory_duration: '16m',
                    price: 0,
                    slug: 'container-security-cicd',
                    linkedIn_url: null,
                    category_id: 2,
                    created_at: '2020-11-10 17:12:19',
                    updated_at: '2021-03-11 13:46:01',
                    author_bio: null,
                    version_date: null,
                    value_rating: null,
                    number_of_ratings: null,
                    enrolled_students: null,
                    certificate_of_completion: 1,
                    lab_steps_in_personal_archive: 1,
                    author_pic: null,
                    publicly_visible: 1,
                    stripe_product_id: '{"usd":"prod_Ij6JRXhPt9Lt3V","eur":"prod_Ij6JaX7wh6r7GY"}',
                    stripe_price_id: '{"usd":"price_1I7e75E2GQolyFR7LN54SVzQ","eur":"price_1I7e76E2GQolyFR7OxWgtKwx"}',
                    is_template: 0,
                    template_id: 16,
                    access_request: 0,
                    is_from_draft: 0,
                    status: COURSE_STATUSES.PRODUCTION,
                    second_author: null,
                    second_author_bio: null,
                    second_author_pic: null,
                    second_linkedIn_url: null,
                    theory_title: 'Theory lab',
                    theory_description: 'This will open a lab where you will learn more about secrets management concepts',
                    free_access: 0,
                    type: 'standard',
                },
            ],
        },
    ],
    fetchCategoriesFunc: jest.fn(() => Promise.resolve(true)),
    createCategoryFunc: jest.fn(() => Promise.resolve(true)),
    history: { push: jest.fn(() => Promise.resolve(true)) },
};

describe('CourseDesign', () => {
    let component;
    component = shallow(<Categories {...props} />);

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should set props, to false', () => {
        const data = {
            ...props,
            fetchCategoriesFunc: jest.fn(() => Promise.resolve(2)),
        };
        component = shallow(<Categories {...data} />);
    });

    it('should simulate OpenCreateModal function', () => {
        const button = component.find('Button[type="primary"]');
        button.simulate('click');
    });

    it('should simulate function history push', () => {
        const historyMock = { push: jest.fn() };
        const data = {
            ...props,
            history: historyMock,
        };
        component = shallow(<Categories {...data} />);

        const column = component.find('Column[title="Courses"]');
        const course = column.props().render(props.categories[0]).props.children[0].props.overlay.props.children[0];
        course.props.onClick(props.categories[0].courses.id);
    });

    it('should simulate function add category with errors', () => {
        const data = {
            ...props,
            createCategoryFunc: jest.fn(() => Promise.resolve({ errors: [{ message: 'simulate error' }] })),
        };
        component = shallow(<Categories {...data} />);
        component.setState({ name: 'RandomName' });
        const modal = component.find('Modal');
        const saveButton = modal.props().footer[1].props;
        saveButton.onClick();
    });

    it('should simulate function add category success', () => {
        const data = {
            ...props,
            createCategoryFunc: jest.fn(() => Promise.resolve(true)),
        };
        component = shallow(<Categories {...data} />);
        component.setState({ name: 'RandomName' });
        const modal = component.find('Modal');
        const saveButton = modal.props().footer[1].props;
        saveButton.onClick();
    });

    it('should simulate function go to edit category', () => {
        const column = component.find('Column[title="Actions"]');
        const singleCategory = props.categories[0];
        const spy = jest.spyOn(component.instance(), 'goToEditCategory');
        column.props().render(singleCategory).props.children[1].props.onClick(singleCategory.id);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should simulate function deleteCategory', () => {
        const data = {
            categories: [
                {
                    id: 1,
                    name: 'Secrets Management',
                    created_at: null,
                    updated_at: '2021-03-26 11:24:57',
                    courses: [],
                    learningPaths: [],
                },
                {
                    id: 2,
                    name: 'Container Security',
                    created_at: null,
                    updated_at: null,
                    courses: [],
                    learningPaths: [],
                },
            ],
            fetchCategoriesFunc: jest.fn(() => Promise.resolve(true)),
            deleteCategoryFunc: jest.fn(() => Promise.resolve(true)),
        };

        component = shallow(<Categories {...data} />);
        component.setState({
            name: 'RandomName',
        });
        const column = component.find('Column[title="Actions"]');
        const singleCategory = data.categories[0];
        const spy = jest.spyOn(component.instance(), 'deleteCategory');
        column.props().render(singleCategory).props.children[0].props.onClick({}, data.categories[0].id);
        component.update();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
