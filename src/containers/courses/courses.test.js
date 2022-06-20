import React from 'react';
import { shallow } from 'enzyme';
import { Courses } from './courses';
import { COURSE_STATUSES, COURSE_TYPE } from '../../constants';

const props = {
    auth: {
        user: {
            id: 1,
            activated: 1,
            email: 'dominik@araido.io',
            firstname: 'Dominik',
            is_fellow: 1,
            lastname: 'de Smit',
            roles: ['administrator'],
            userSubscription: {
            },
        },
    },
    courses: {
        categories: [
            { name: 'Secret Management' },
        ],
        data: {
            data: [
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
                    version_date: '2020-06-03',
                    value_rating: 3.5,
                    number_of_ratings: 12,
                    enrolled_students: 800,
                    content: 'At the end of this course you will know how to apply basic principles for secrets management for your applications',
                    views: 1,
                    image: '/img/sm.jpg',
                    author: null,
                    theory_duration: '15m',
                    price: 100.99,
                    slug: 'secrets-management-for-your-applications',
                    category_id: 1,
                    created_at: '2020-05-25 16:35:44',
                    updated_at: '2020-05-25 16:35:44',
                    author_bio: null,
                    author_pic: null,
                    labs: [
                        {
                            id: 1,
                            name: 'Secrets Management Java Application',
                            slug: 'secrets-mgmt-java-aws',
                            course_id: 1,
                            signature_author_id: null,
                            author_signature: null,
                            platform: 'AWS',
                            description: 'In this lab you will learn how to move hardcoded secrets in a Java SpringBoot application to Vault',
                            available_time: '3m',
                            max_hint_count: 5,
                            hands_on_desc: 'This lab lets you choose a customized lab environment providing hands-on practices',
                            hands_on_title: 'Hands on',
                            created_at: '2020-05-25 16:35:46',
                            updated_at: '2020-05-25 16:35:46',
                            application_language: null,
                        },
                    ],
                    category: {
                        id: 1,
                        name: 'Secrets Management',
                        created_at: null,
                        updated_at: null,
                    },
                    quizzes: [],
                    authors: [],
                    hints: [],
                    faq: [],
                    courseTags: [
                        {
                            id: 1, course_id: 1, title: 'js',
                        },
                        {
                            id: 2, course_id: 1, title: 'pyton',
                        },
                    ],
                    access_request: false,
                    status: COURSE_STATUSES.PRODUCTION,
                    type: COURSE_TYPE.STANDARD,
                },
            ],
        },
        total: 80,
        perPage: 8,
        page: 1,
        lastPage: 10,
    },
    tokenBalance: 0,
    fetchCourses: jest.fn(() => Promise.resolve(true)),
    getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
    getUserSubscriptionsInformation: jest.fn(() => Promise.resolve(true)),
    history: { push: jest.fn() },
};

describe('Courses page', () => {
    let component;
    let componentExam;

    const propsExam = { ...props };
    propsExam.courses = JSON.parse(JSON.stringify(props.courses));
    propsExam.courses.data.data[0].type = COURSE_TYPE.EXAM;

    beforeEach(() => {
        component = shallow(<Courses {...props} />);
        componentExam = shallow(<Courses {...propsExam} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render courses container successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('should render search input successfully', () => {
        expect(component.exists('Search')).toEqual(true);
    });

    it('should render categories select dropdown successfully', () => {
        expect(component.exists('Select')).toEqual(true);
    });

    it('should render categories options successfully', () => {
        expect(component.find('Select Option')).toHaveLength(2);
        expect(component.find('Select Option').at(0).props().children).toEqual('All categories');
        expect(component.find('Select Option').at(1).props().children).toEqual('Secret Management');
    });

    it('should not render exam icon if course type is not exam', () => {
        const list = component.find('List');
        expect(list.props().dataSource).toEqual(props.courses.data.data);
        const listItem = list.props().renderItem(props.courses.data.data[0]);
        const { extra } = listItem.props.children.props;
        expect(extra.props.children[1].props.children[0]).toEqual(false);
    });

    it('should render exam icon if course type is exam', () => {
        const list = componentExam.find('List');
        expect(list.props().dataSource).toEqual(propsExam.courses.data.data);
        const listItem = list.props().renderItem(propsExam.courses.data.data[0]);
        const { extra } = listItem.props.children.props;
        const icon = extra.props.children[1].props.children[0].props.children.props;
        expect(icon.type).toEqual('file-done');
        expect(icon.className).toEqual('course-type-icon');
    });

    it('selectHandleChange() calls fetchCourses and updates page info', async () => {
        const newCourses = {
            courses: {
                categories: [
                    { name: 'Secret Management' },
                ],
                data: {
                    data: [],
                },
                total: 80,
                perPage: 8,
                page: 1,
                lastPage: 10,
            },
        };
        const testProps = {
            auth: {
                user: {
                    id: 1,
                    activated: 1,
                    email: 'dominik@araido.io',
                    firstname: 'Dominik',
                    is_fellow: 1,
                    lastname: 'de Smit',
                    roles: ['administrator'],
                },
            },
            courses: {
                categories: [
                    { name: 'Secret Management' },
                ],
                data: {
                    data: [],
                },
                total: 5,
                perPage: 8,
                page: 1,
                lastPage: 1,
            },
            fetchCourses: jest.fn().mockResolvedValue(newCourses.courses),
            getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
            getUserSubscriptionsInformation: jest.fn(() => Promise.resolve(true)),
        };
        const testComponent = shallow(<Courses {...testProps} />);
        const instance = testComponent.instance();

        const stateSpy = jest.spyOn(instance, 'setState');

        await instance.selectHandleChange(1);

        expect(stateSpy).toHaveBeenCalledWith({
            total: newCourses.courses.total,
        });
    });

    it('Should call `getCurrentTokenBalance` and `getUserSubscriptionsInformation` in componentDidMount', () => {
        const wrapper = shallow(<Courses {...props} />, { disableLifecycleMethods: true });
        const instance = wrapper.instance();
        const compDidMountSpy = jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();
        expect(compDidMountSpy).toHaveBeenCalled();
        expect(props.getCurrentTokenBalance).toHaveBeenCalled();
        expect(props.getUserSubscriptionsInformation).toHaveBeenCalled();
    });

    it('should render `.subscriptionInfoBar()` method and `subscription-inform-bar` elements when `hideSubscriptionInfoBar` state is false and', () => {
        const instance = component.instance();
        const subscriptionInfoBarSpy = jest.spyOn(instance, 'subscriptionInfoBar');
        instance.subscriptionInfoBar();
        expect(subscriptionInfoBarSpy).toHaveBeenCalled();

        const subscriptionInfoBar = component.find('.subscription-inform-bar');
        const subscriptionInfoBarContent = subscriptionInfoBar.find('span');
        const subscriptionBtn = subscriptionInfoBar.find('.to-subscription-options');
        const closeInfoBar = subscriptionInfoBar.find('.cross');
        expect(subscriptionInfoBar).toHaveLength(1);
        expect(subscriptionInfoBarContent.text()).toBe('As you have no subscriptions and no tokens, you will be unable to purchase a course.Click the button to find out what subscriptions are available.');
        expect(subscriptionBtn.props().children).toBe('View subscription options');
        expect(closeInfoBar.props().children).toBe('✕');
    });

    it('should call history.push with `/platform/choose-subscription` when `to-subscription-options` button is clicked', () => {
        const subscriptionInfoBar = component.find('.subscription-inform-bar');
        const subscriptionBtn = subscriptionInfoBar.find('.to-subscription-options');
        subscriptionBtn.simulate('click');
        expect(props.history.push).toHaveBeenCalledWith('/platform/choose-subscription');
    });

    it('should set local storage item of `hideSubscriptionInfoBar` to true then Update `hideSubscriptionInfoBar` state if the cross button is clicked', () => {
        const subscriptionInfoBar = component.find('.subscription-inform-bar');
        const closeInfoBar = subscriptionInfoBar.find('.cross');
        expect(component.instance().state.hideSubscriptionInfoBar).toBe(false);

        closeInfoBar.simulate('click');

        // after closing the bar the local storage item will set to true
        const hideSubscriptionInfoBar = localStorage.getItem('hideSubscriptionRequiredBar');

        expect(JSON.parse(hideSubscriptionInfoBar)).toBe(true);
        expect(component.instance().state.hideSubscriptionInfoBar).toBe(true);
    });
});

describe('<Courses /> Subscription info bar', () => {
    const testProps = {
        ...props,
        auth: {
            ...props.auth,
            user: {
                ...props.auth.user,
                teams: [],
            },
        },
    };

    const component = shallow(<Courses {...testProps} />);

    it('<Courses /> renders a subscription info bar if user has no tokens/subscription/team', () => {
        const subscriptionBar = component.find('.subscription-inform-bar');

        expect(subscriptionBar).toHaveLength(1);
    });

    it('<Courses /> does not render the subscriptionInfoBar if user is part of a team', () => {
        const teamProps = {
            ...props,
            auth: {
                ...props.auth,
                user: {
                    ...props.auth.user,
                    teams: [
                        {
                            id: 1,
                        },
                    ],
                },
            },
        };

        const componentWithTeam = shallow(<Courses {...teamProps} />);
        const subscriptionBar = componentWithTeam.find('.subscription-inform-bar');

        expect(subscriptionBar).toHaveLength(0);
        const { auth: { user: { teams } } } = teamProps;
        expect(teams.length).toBe(1);
    });
});
