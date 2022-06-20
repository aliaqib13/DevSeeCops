import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Table } from 'antd';
import CourseAdministration from './index';
import { COURSE_STATUSES } from '../../../../constants';

const props = {
    courses: [
        {
            status: COURSE_STATUSES.PRODUCTION,
            category: {
                id: 1,
                name: 'Secrets Management',
                created_at: null,
                updated_at: null,
            },
            category_id: 1,
            id: 1,
            image: '/img/sm.jpg',
            title: 'Secrets Management for your applications',
            __meta__: {
                activeCourses_count: 5,
            },
        },
        {
            status: COURSE_STATUSES.PRODUCTION,
            category: {
                id: 2,
                name: 'Container Security',
                created_at: null,
                updated_at: null,
            },
            category_id: 2,
            id: 4,
            image: '/img/test.jpg',
            title: 'Container Security in CI/CD',
            __meta__: {
                activeCourses_count: 1,
            },
        },
    ],
    getCourseUsers: jest.fn(() => Promise.resolve(false)),
    getCourseRequests: jest.fn(() => Promise.resolve(false)),
    fetchActiveCourses: jest.fn(() => Promise.resolve(false)),
    getCourseTemplates: jest.fn(() => Promise.resolve(false)),
    categories: [
        {
            id: 1, name: 'Secrets Management', created_at: null, updated_at: null,
        },
        {
            id: 2, name: 'Container Security', created_at: null, updated_at: null,
        },
        {
            id: 3, name: 'Application Security', created_at: null, updated_at: null,
        },
        {
            id: 4, name: 'ExamplePost Management', created_at: null, updated_at: null,
        },
    ],
    fetchCategories: jest.fn(() => Promise.resolve(false)),
    fetchCoursesPlatformInsights: jest.fn(() => Promise.resolve(false)),
    getAdminAccessRequests: jest.fn(() => Promise.resolve(false)),
    getLabs: jest.fn(() => Promise.resolve(false)),
    changeLabtimeRequestStatus: jest.fn(() => Promise.resolve(false)),
    deleteLabtimeRequest: jest.fn(() => Promise.resolve(false)),
    getCourseStatuses: jest.fn(() => Promise.resolve(false)),
    getCoursesByStatus: jest.fn(() => Promise.resolve(false)),
    getCourseTypes: jest.fn(() => Promise.resolve(false)),
    getCourseProposalsForReviews: jest.fn(() => Promise.resolve(false)),
    courseRequests: {
        data: [
            {
                id: 7,
                user_id: 11,
                course_id: 1,
                status: 'pending',
                created_at: '2020-07-30 12:53:49',
                updated_at: '2020-07-30 12:53:49',
                user: {
                    id: 11,
                    firstname: 'Test',
                    lastname: 'tester',
                    certificate_name: 'Test tester',
                    email: 'testtester93@mail.ru',
                    activated: 1,
                    coordinator: null,
                    is_fellow: 0,
                    created_at: '2020-07-30 11:31:33',
                    updated_at: '2020-07-30 11:32:06',
                },
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
    requests: [
        {
            id: 1,
            title: 'Secrets Management for your applications',
            description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
            information: {
                steps: 21,
                videos: 0,
                quizzes: 2,
            },
            course_is_for: null,
            required_exp: null,
            will_learn: null,
            preview_video: null,
            cert_badge: 0,
            version: '1.0.0',
            difficulty: 0,
            content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
            views: 19,
            image: '/img/sm.jpg',
            author: null,
            theory_duration: '15m',
            price: 100.99,
            status: COURSE_STATUSES.PRODUCTION,
            slug: 'secrets-management-for-your-applications',
            category_id: 1,
            created_at: '2020-07-29 16:49:57',
            updated_at: '2020-07-29 16:49:57',
            author_bio: null,
            author_pic_url: null,
            version_date: null,
            value_rating: null,
            number_of_ratings: null,
            enrolled_students: null,
            certificate_of_completion: 1,
            lab_steps_in_personal_archive: 1,
            requests: [
                {
                    id: 7,
                    user_id: 11,
                    course_id: 1,
                    status: 'pending',
                    created_at: '2020-07-30 12:53:49',
                    updated_at: '2020-07-30 12:53:49',
                    user: {
                        id: 11,
                        firstname: 'Test',
                        lastname: 'tester',
                        certificate_name: 'Test tester',
                        email: 'testtester93@mail.ru',
                        activated: 1,
                        coordinator: null,
                        is_fellow: 0,
                        created_at: '2020-07-30 11:31:33',
                        updated_at: '2020-07-30 11:32:06',
                    },
                },
            ],
            __meta__: {
                requests_count: 6,
            },
        },
    ],
    coursesPlatformInsights: [
        {
            status: COURSE_STATUSES.PRODUCTION,
            activeCoursesMany: [
                {
                    activeLabs: [
                        {
                            active_course_id: 1,
                            created_at: '2020-09-07 17:33:09',
                            duration: 1,
                            hint_is_open: null,
                            id: 2,
                            lab_end_at: 1599549385,
                            lab_id: 1,
                            max_hint_count: 5,
                            progress: 'Completed',
                            start_time: '2020-09-07T13:33:10.000Z',
                            status: 1,
                            stop_time: null,
                            updated_at: '2020-09-08 10:16:25',
                            user_id: 3,
                            user: {
                                id: 3,
                                roles: [{
                                    id: 1,
                                    slug: 'beta_tester',
                                }],
                            },
                        },
                    ],
                    course_id: 1,
                    created_at: '2020-09-07 17:30:16',
                    finished: 1,
                    id: 1,
                    theory_progress: null,
                    updated_at: '2020-09-07 17:34:56',
                    user_id: 3,
                    user_level: 'Medior',
                },
            ],
            category_id: 1,
            certificates: [{
                course_id: 1,
                id: 58,
                type: 'completion',
                user_id: 12,
                users: {
                    id: 3,
                    roles: [{
                        id: 1,
                        slug: 'beta_tester',
                    }],
                },
            }],
            id: 1,
            image: '/img/test.jpg',
            title: 'Secrets Management for your applications',
        },
    ],
    coursesByStatus: {
        data: [
            {
                id: 1,
                status: 'Configuration',
                title: 'Secrets Management for your applications',
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
    statuses: [
        { name: 'Preferred', number: '2' },
        { name: 'Draft', number: '2' },
        { name: 'Configuration', number: '2' },
        { name: 'Development', number: '2' },
        { name: 'Testing', number: '2' },
        { name: 'Beta-test', number: '2' },
        { name: 'Production', number: '2' },
    ],
    courseTypes: ['introduction', 'standard', 'exam'],
    labs: [
        {
            id: 1, name: 'Secrets Management Java Application', course_id: 1, activeLabs: [],
        },
    ],

};

function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 0);
    });
}

describe('CourseAdministration', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseAdministration {...props} />);
    });

    // Course Development Dashboard
    it('Should render Course-development-dashboard tab container successfully', () => {
        const courseDevDashboardTab = component.find('CourseDevelopmentDashboard');
        expect(courseDevDashboardTab).toHaveLength(1);
    });

    it("Should render Course-development-dashboard tab's title successfully", () => {
        const component = mount(<MemoryRouter><CourseAdministration {...props} /></MemoryRouter>);
        const courseDevDashboardTitle = component.find('CourseDevelopmentDashboard');
        expect(courseDevDashboardTitle.find('h1').text()).toEqual('Course Statuses');
    });

    it('Should render Course-development-dashboard table successfully', () => {
        const component = mount(<MemoryRouter><CourseAdministration {...props} /></MemoryRouter>);
        const courseDevDashboardTab = component.find('CourseDevelopmentDashboard');
        expect(courseDevDashboardTab.find('table')).toHaveLength(1);

        // Check columns titles
        expect(courseDevDashboardTab.find('.ant-table-column-title').at(0).text()).toBe('Status');
        expect(courseDevDashboardTab.find('.ant-table-column-title').at(1).text()).toBe('Number of courses');
        expect(courseDevDashboardTab.find('.ant-table-column-title').at(2).text()).toBe('Actions');
    });

    it("Should render Course-development-dashboard's statuses successfully", () => {
        const courseDevDashboardTab = component.props().children.props.children[0];
        expect(courseDevDashboardTab.props.children.props.statuses).toEqual(props.statuses);
    });

    it('Should Course development dashboard open drawer when click on view in action column in table', async () => {
        const component = mount(<MemoryRouter><CourseAdministration {...props} /></MemoryRouter>);
        const viewButton = component.find('tr.ant-table-row-level-0').at(0).childAt(2).find('td')
            .find('Button');
        viewButton.simulate('click');
        await tick();
        component.update();
        const drawer = component.find('CourseStatusDrawer');
        expect(drawer.prop('visible')).toBe(true);
    });

    // Course Access Requests Tab
    it('should render course-access-container successfully', () => {
        const courseAccessContainer = component.find('.course-access-container');
        expect(courseAccessContainer.exists()).toBeTruthy();
        expect(courseAccessContainer).toHaveLength(1);
    });

    it('should render course access title successfully', () => {
        const courseAccessTitle = component.find('Title').at(0);
        expect(courseAccessTitle.exists()).toBeTruthy();
        expect(courseAccessTitle).toHaveLength(1);
        expect(courseAccessTitle.props().children).toBe('Course access requests');
    });

    it('Should render course access requests table with all available requests', () => {
        const table = component.find(Table).at(0);
        expect(table.exists()).toBeTruthy();
        expect(table).toHaveLength(1);
        expect(table.props().dataSource).toEqual(props.requests);
    });

    it('Should render course-access-requests table with columns titles successfully ', () => {
        const table = component.find(Table).at(0);
        expect(table).toHaveLength(1);
        expect(table.props().children[0].props.title).toEqual('Image');
        expect(table.props().children[1].props.title).toEqual('Title');
        expect(table.props().children[2].props.title).toEqual('Number of requests');
        expect(table.props().children[3].props.title).toEqual('Actions');
    });

    // Course Users Tab
    it('Should render course-users container successfully', () => {
        const wrapper = component.find('.course-users-container');
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should render course-user tab's title successfully", () => {
        const courseUsersTitle = component.find('Title').at(1);
        expect(courseUsersTitle.exists()).toBeTruthy();
        expect(courseUsersTitle).toHaveLength(1);
        expect(courseUsersTitle.props().children).toBe('Course Administration'); // Tab Title
        expect(component.props().children.props.children[2].props.tab).toBe('Course users');// Tab name
    });

    it("Should render course-user table with columns' names successfully", () => {
        const table = component.find(Table).at(1);
        expect(table).toHaveLength(1);
        expect(table.props().children[0].props.title).toEqual('Image');
        expect(table.props().children[1].props.title).toEqual('Title');
        expect(table.props().children[2].props.title).toEqual('Category');
        expect(table.props().children[3].props.title).toEqual('Number of Users');
        expect(table.props().children[4].props.title).toEqual('Actions');
    });

    it('Should render course-user table requested data successfully', () => {
        const table = component.find(Table).at(1);
        expect(table.props().dataSource).toEqual(props.courses);
    });

    it('Should call getCourseUsers function when click on users in table actions column', () => {
        const wrapper = component.find('.course-users-container');
        wrapper.find('Column[title="Actions"]').props().render('test', props.courses[0]).props.onClick();
        expect(props.getCourseUsers).toBeCalledTimes(1);
    });

    it('Course-user tab should open ImportCourseModal when click Import Course button ', () => {
        const wrapper = component.find('.course-users-container');
        const importCourseButton = wrapper.find('div').at(1).find('Button').at(1);
        expect(component.find('UploadCourseModal').prop('visible')).toBe(false);
        importCourseButton.simulate('click');
        expect(component.find('UploadCourseModal').prop('visible')).toBe(true);
    });

    it('Course-user tab should open AddCourseModal when click Add Course button', () => {
        const wrapper = component.find('.course-users-container');
        const importCourseButton = wrapper.find('div').at(1).find('Button').at(0);
        expect(component.find('AddCourseModal').prop('visible')).toBe(false);
        importCourseButton.simulate('click');
        expect(component.find('AddCourseModal').prop('visible')).toBe(true);
    });

    // Course/Platform Insight Tab
    it('Should render course-platform-insights container successfully', () => {
        const courseInsightsContainer = component.find('.course-insights-container');
        expect(courseInsightsContainer.exists()).toBeTruthy();
        expect(courseInsightsContainer).toHaveLength(1);
    });

    it("should render course/platform insight tab's title successfully", () => {
        const courseInsightsTitle = component.find('Title').at(2);
        expect(courseInsightsTitle.exists()).toBeTruthy();
        expect(courseInsightsTitle.props().children).toBe('Course/Platform Insights');
    });

    it('Should render course-platform-insights table with all available coursesPlatformInsights', () => {
        const table = component.find(Table).at(2);
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource).toEqual(props.coursesPlatformInsights);
    });

    // Lab Time Requests
    it('Should render lab-time-requests container successfully', () => {
        const labTimeRequestsContainer = component.find('.lab-time-container');
        expect(labTimeRequestsContainer).toHaveLength(1);
    });

    it("Should render lab-time-requests tab's name and title successfully", () => {
        const labTimeRequestsTab = component.find('Title').at(3);
        expect(labTimeRequestsTab).toHaveLength(1);
        expect(labTimeRequestsTab.props().children).toBe('Lab Time Requests'); // Tab Title
        expect(component.props().children.props.children[4].props.tab).toBe('Lab time requests');// Tab name
    });

    it('Should render lab-time-requests table with all requests successfully', () => {
        const table = component.find(Table).at(3);
        expect(table.props().dataSource).toEqual(props.labs);
    });

    it("Should render lab-time-requests table with columns' names successfully", () => {
        const table = component.find(Table).at(3);
        expect(table).toHaveLength(1);
        expect(table.props().children[0].props.title).toEqual('Title');
        expect(table.props().children[1].props.title).toEqual('Number of Requests');
        expect(table.props().children[2].props.title).toEqual('Actions');
    });

    it('Should check authors successfully', () => {
        const instance = component.instance();
        expect(instance.checkAuthors([], 1)).toBe(true);
        expect(instance.checkAuthors([{ id: 1 }], 1)).toBe(false);
        expect(instance.checkAuthors([{ id: 2 }], 1)).toBe(true);
    });

    it('Should check countLabRequests successfully', () => {
        const lab = {
            activeLabs: [{ labtimeRequests: [1, 2, 3] }], course_id: 4, id: 3, name: 'Container Security in CI/CD',
        };
        const instance = component.instance();
        expect(instance.countLabtimeRequests(lab)).toBe(3);
        expect(instance.countLabtimeRequests({ ...lab, activeLabs: [] })).toBe(0);
    });

    it('Should render course-proposals-review tab successfully', () => {
        expect(component.props().children.props.children[5].props.tab).toBe('Course Proposal Review');
    });
    it('Should render Courses-in-development tab successfully', () => {
        expect(component.props().children.props.children[6].props.tab).toBe('Courses in development');
    });
});

describe('CourseAdministration Table', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><CourseAdministration {...props} /></MemoryRouter>);
    });

    it('should show course status', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(0).first()
            .text()).toBe(props.statuses[0].name);
    });

    it('Should show course status count', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(1).first()
            .text()).toBe(props.statuses[0].number);
    });

    it('Should show course status view link', () => {
        expect(component.find('tr.ant-table-row-level-0').at(0).childAt(2).first()
            .text()).toBe('View');
    });

    it('Should render as many rows as there are passed with props', () => {
        expect(component.find('BodyRow').length).toBe(props.statuses.length);
    });
});
