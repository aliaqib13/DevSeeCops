import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './home';

describe('Home', () => {
    let component; const
        props = {
            homePage: {
                courses: {
                    data: [
                        {
                            id: 1,
                            title: 'Secrets Management for your applications',
                            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
                            activeCourses: {
                                course_id: 1,
                                created_at: '2020-08-20 14:15:04',
                                finished: 0,
                                id: 2,
                                theory_progress: null,
                                updated_at: '2020-08-20 14:15:04',
                                user_id: 4,
                            },
                            certificates: [],
                            __meta__: {
                                activeCourses_count: 2,
                                labs_count: 2,
                            },
                        },
                    ],
                    lastPage: 1,
                    page: 1,
                    perPage: 10,
                    total: 1,
                },
                rightSideBar: {
                    id: 1,
                    sidebar_header: 'Academy updates',
                },
                recommendedCourses: [
                    {
                        id: 2,
                        title: 'Secrets Management in CI/CD',
                        image: '/img/sm-2.jpg',
                    },
                ],
            },
            fetchHomePage: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<Home {...props} />);
    });

    it('should render Home component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render course-item-button successfully', () => {
        const courseItemBtn = component.find('.course-item-button');
        expect(courseItemBtn.exists()).toBeTruthy();
        expect(courseItemBtn.at(1).props().children).toBe('Resume');
    });

    it('should render recommended courses successfully', () => {
        const reqCoursesTitle = component.find('.recommended-courses-title');
        const singelCourseTitle = component.find('.single-recommended-courses-title');
        expect(reqCoursesTitle.exists()).toBeTruthy();
        expect(singelCourseTitle.exists()).toBeTruthy();
    });
});
