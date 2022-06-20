/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import CourseInformation from './course-information';
import Loading from '../../components/Loading/Loading';
import TokensCount from '../../components/course-information/TokensCount/TokensCount';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const course = {
    __meta__: {
        activeCourses_count: 3,
    },
    hints_count: 5,
    certificate_of_completion: true,
    access_request: false,
    free_access: false,
    lab_steps_in_personal_archive: true,
    id: 2,
    ratings: [],
    courseTags: [
        { id: 1, course_id: 1, title: 'Js' },
        { id: 2, course_id: 1, title: 'Php' },
        { id: 3, course_id: 1, title: 'Python' },
    ],
    token_cost: 21,
};
const props = {
    isExam: false,
    course,
    user: {
        roles: [
            'administrator',
        ],
        userSubscription: { },
        teams: [],
    },
    match: {
        params: {
            id: 1,
        },
    },
    campaign: {
        name: 'buyOneGetOneFree',
        active: 1,
        config: {
            emailText: '<p>test</p>',
            bellowButtonText: 'test',
        },
    },
    tokenBalance: 25,
    getCourseById: jest.fn(() => Promise.resolve(true)),
    getExamCourseById: jest.fn(() => Promise.resolve(true)),
    findCourseRequest: jest.fn(() => Promise.resolve(true)),
    getCampaign: jest.fn(() => Promise.resolve(true)),
    adminCreateActiveCourse: jest.fn(() => Promise.resolve(true)),
    createActiveCourse: jest.fn(() => Promise.resolve(true)),
    getAuthUser: jest.fn(),
    history: { push: jest.fn() },
    getCurrentTokenBalance: jest.fn(() => Promise.resolve(true)),
    getUserSubscriptionsInformation: jest.fn(() => Promise.resolve(true)),
    requestCourseFromTeam: jest.fn(() => Promise.resolve(true)),
};

describe('course-information', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseInformation {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders only a Loader when state.loading is true', () => {
        component.setState({ loading: true });

        // We should see the loading spinner
        const loadingComponent = component.find(Loading);
        expect(loadingComponent).toHaveLength(1);
    });

    it('sets state.loading to true when mounting', () => {
        expect(component.state('loading')).toBe(false);

        component.instance().componentDidMount();

        expect(component.state('loading')).toBe(true);
    });

    it('should render hints count successfully if isExam false', () => {
        const hintsCount = component.find('.hints_count');
        expect(hintsCount).toHaveLength(1);
    });

    it('should not render hints count successfully if isExam true', () => {
        const testProps = { ...props, isExam: true };

        const testComponent = shallow(<CourseInformation {...testProps} />);

        const hintsCount = testComponent.find('.hints_count');
        expect(hintsCount).toHaveLength(0);
    });

    it('should render certificate of completion successfully', () => {
        const certificateOfCompletion = component.find('.certificate_of_completion');

        expect(certificateOfCompletion).toHaveLength(1);
    });

    it('should render lab steps in personal archive successfully', () => {
        const labStepsInPersonalArchive = component.find('.lab_steps_in_personal_archive');
        expect(labStepsInPersonalArchive).toHaveLength(1);
    });

    it('should render paragraph Learning Path tags ', () => {
        const courseTagsTitle = component.find('.tags-title');
        expect(courseTagsTitle.text()).toEqual('Learning Path tags');
    });

    it('should render section of course tags', () => {
        const courseTagsParagraph = component.find('.course-tags-list');
        expect(courseTagsParagraph).toHaveLength(1);
    });

    it('should render course assigned tags', () => {
        const tagsList = component.find('Tag[color="blue"]');
        expect(tagsList.at(0).props().children[1]).toEqual(course.courseTags[0].title);
        expect(tagsList.at(1).props().children[1]).toEqual(course.courseTags[1].title);
        expect(tagsList.at(2).props().children[1]).toEqual(course.courseTags[2].title);
    });

    it('should successfully create active course', async () => {
        const instance = component.instance();
        const createACourse = instance.createActiveCourse;
        await createACourse();
        const viewdCourses = localStorage.getItem('viewed-courses');
        expect(props.adminCreateActiveCourse).toBeCalled();
        expect(viewdCourses.includes(props.course.id)).toBeTruthy();
    });

    it('should successfully create active course free access', async () => {
        const instance = component.instance();
        const createACourse = instance.createActiveCourseFreeAccess;
        await createACourse();
        const viewdCourses = localStorage.getItem('viewed-courses');
        expect(props.createActiveCourse).toBeCalled();
        expect(viewdCourses.includes(props.course.id)).toBeTruthy();
    });

    it('.getData() should wait for both getCampaign() and getCourseById() before finishing if isExam false', async () => {
        const sleep = t => new Promise(resolve => setTimeout((resolve), t));
        const LONGER_WAIT = 1000;
        const testProps = {
            ...props,
            getCampaign: jest.fn(() => sleep(LONGER_WAIT)),
            getCourseById: jest.fn(() => sleep(LONGER_WAIT / 3).then(() => true)),
        };

        const testComponent = shallow(<CourseInformation {...testProps} />);
        const instance = testComponent.instance();

        const now = Date.now();
        await instance.getData();
        const then = Date.now();

        // Expect it not to return until both promises already finished
        expect(then - now).toBeGreaterThanOrEqual(LONGER_WAIT);
    });

    it('.getInfoData() should wait for both getCampaign() and getCourseById() before finishing if isExam false', async () => {
        const sleep = t => new Promise(resolve => setTimeout((resolve), t));
        const LONGER_WAIT = 1000;
        const testProps = {
            ...props,
            getCampaign: jest.fn(() => sleep(LONGER_WAIT)),
            getCourseById: jest.fn(() => sleep(LONGER_WAIT / 3).then(() => true)),
        };

        const testComponent = shallow(<CourseInformation {...testProps} />);
        const instance = testComponent.instance();

        const now = Date.now();
        await instance.getInfoData();
        const then = Date.now();

        // Expect it not to return until both promises already finished
        expect(then - now).toBeGreaterThanOrEqual(LONGER_WAIT);
    });

    it('.getExamData() should wait for getExamCourseById() before finishing if isExam true', async () => {
        const sleep = t => new Promise(resolve => setTimeout((resolve), t));
        const LONGER_WAIT = 100;
        const testProps = {
            ...props,
            getExamCourseById: jest.fn(() => sleep(LONGER_WAIT).then(() => true)),
            isExam: true,
        };

        const testComponent = shallow(<CourseInformation {...testProps} />);
        const instance = testComponent.instance();

        const now = Date.now();
        await instance.getExamData();
        const then = Date.now();

        // Expect it not to return until both promises already finished
        expect(then - now).toBeGreaterThanOrEqual(LONGER_WAIT);
    });

    it('.getData() should wait for getExamCourseById() before finishing if isExam true', async () => {
        const sleep = t => new Promise(resolve => setTimeout((resolve), t));
        const LONGER_WAIT = 100;
        const testProps = {
            ...props,
            getExamCourseById: jest.fn(() => sleep(LONGER_WAIT).then(() => true)),
            isExam: true,
        };

        const testComponent = shallow(<CourseInformation {...testProps} />);
        const instance = testComponent.instance();

        const now = Date.now();
        await instance.getData();
        const then = Date.now();

        // Expect it not to return until promise already finished
        expect(then - now).toBeGreaterThanOrEqual(LONGER_WAIT);
    });

    it('should successfully render the calculated price in the course information ', () => {
        const priceElementMeta1 = component.find('.price').at(0);
        const priceElementMeta2 = component.find('.price').at(1);
        const TokenCostComponents = component.find(TokensCount);
        expect(priceElementMeta1.props().children[0]).toBe('$');
        expect(priceElementMeta1.props().children[1]).toBe('105.00');
        expect(TokenCostComponents.at(0).dive().props().title).toBe('1 token = 5$');
        expect(priceElementMeta2.props().children[0]).toBe('$');
        expect(priceElementMeta2.props().children[1]).toBe('105.00');
        expect(TokenCostComponents.at(1).dive().props().title).toBe('1 token = 5$');
    });

    it('handles the case when `props.course` is empty before the API result returns if isExam false', () => {
        const testProps = { ...props };
        testProps.course = {};

        const testComponent = shallow(<CourseInformation {...testProps} />);

        // We should see the loading spinner
        const loadingComponent = testComponent.find(Loading);
        expect(loadingComponent).toHaveLength(1);
    });

    it('handles the case when `props.course` is empty before the API result returns if isExam true', () => {
        const testProps = { ...props, isExam: true };
        testProps.course = {};

        const testComponent = shallow(<CourseInformation {...testProps} />);

        // We should see the loading spinner
        const loadingComponent = testComponent.find(Loading);
        expect(loadingComponent).toHaveLength(1);
    });

    it('should check of the course button were displayed \'Go to course\' if has hasActiveCourse', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            hasActiveCourse: true,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Go to course');
    });

    it('should check of the course button were displayed \'Proceed to course\' if has isAdmin', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            isAdmin: true,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Proceed to course');
    });

    it('should check of the course button were displayed \'Free Access\' if has isFree', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            isFree: true,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Free Access');
    });

    it('should check of the course button were displayed \'Coming Soon\' if has publicly_visible and no active and no isAdmin', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            publicly_visible: true,
            active: false,
            isAdmin: false,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Coming Soon');
    });

    it('should check of the course button were displayed \'Already requested\' if no request and requested is true', () => {
        expect(component.instance().setState({ onUpdate: false, requested: true }));
        const data = {
            payCourse: false,
            request: null,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Already requested');
    });

    it('should check of the course button were displayed \'Request Access\' if no request and course.access_request is true', () => {
        expect(component.instance().setState({ onUpdate: false }));
        component.setProps({ course: { access_request: true } });
        const data = {
            payCourse: false,
            request: null,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Request Access');
    });

    it('should check of the course button were displayed \'Request Access\' if no request', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            payCourse: false,
            request: null,
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props).toHaveProperty(
            'calculatedPrice',
            'totalPriceWithVAT',
            'payCourse',
            'createPaymentIntents',
            'checkCustomer',
            'loading',
            'buyOneGetOneFreeCampaign',
        );
    });

    it('should check of the course button were displayed \'Already requested\' if request is true and request status is no accepted', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            payCourse: false,
            request: { status: 'status' },
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props.children).toEqual('Already requested');
    });

    it('should check of the course button were displayed \'Already requested\' if request is true and request status is accepted', () => {
        expect(component.instance().setState({ onUpdate: false }));
        const data = {
            payCourse: false,
            request: { status: 'accepted' },
        };
        const btn = component.instance().getGoToCourseButton(data);
        expect(btn.props).toHaveProperty(
            'calculatedPrice',
            'totalPriceWithVAT',
            'payCourse',
            'createPaymentIntents',
            'checkCustomer',
            'verifyCoupon',
            'loading',
            'buyOneGetOneFreeCampaign',
        );
    });
});

describe('subscriptionInformBar element', () => {
    let testComponent;

    const testProps = {
        course,
        ...props,

        user: {
            roles: [],
            userSubscription: {},
        },

        tokenBalance: 0,
    };

    beforeEach(() => {
        testComponent = shallow(<CourseInformation {...testProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should call `getCurrentTokenBalance` and `getUserSubscriptionsInformation` in componentDidMount', () => {
        const wrapper = shallow(<CourseInformation {...testProps} />, { disableLifecycleMethods: true });
        const instance = wrapper.instance();
        const compDidMountSpy = jest.spyOn(instance, 'componentDidMount');

        instance.componentDidMount();

        expect(compDidMountSpy).toHaveBeenCalled();
        expect(testProps.getCurrentTokenBalance).toHaveBeenCalled();
        expect(testProps.getUserSubscriptionsInformation).toHaveBeenCalled();
    });

    it('Should not render `subscription-inform-bar` when user has spare token balance', () => {
        const testPropsBalance = {
            ...testProps,
            tokenBalance: 25,
        };
        const testComponent1 = shallow(<CourseInformation {...testPropsBalance} />);

        testComponent1.instance().setState({ onUpdate: false });
        const data = {
            publicly_visible: true,
            active: true,
        };
        testComponent1.instance().getGoToCourseButton(data);

        const subscriptionInformBar = testComponent1.find('.subscription-inform-bar').at(0);
        expect(subscriptionInformBar).toHaveLength(0);
    });

    it('Should not render `subscription-inform-bar` when user has a subscription', () => {
        const testPropsBalance = {
            ...testProps,
            user: {
                roles: [],
                userSubscription: {
                    test: 'test',
                },
            },

        };
        const testComponent2 = shallow(<CourseInformation {...testPropsBalance} />);

        testComponent2.instance().setState({ onUpdate: false });
        const data = {
            publicly_visible: true,
            active: true,
        };
        testComponent2.instance().getGoToCourseButton(data);

        const subscriptionInformBar = testComponent2.find('.subscription-inform-bar').at(0);
        expect(subscriptionInformBar).toHaveLength(0);
    });

    it('Should render `subscription-inform-bar` when user does not have a spare token balance or an active subscription', () => {
        testComponent.instance().setState({ onUpdate: false });
        // expect(testComponent.instance().setState({ onUpdate: false }));
        const data = {
            publicly_visible: true,
            active: true,
        };
        testComponent.instance().getGoToCourseButton(data);
        const subscriptionInformBar = testComponent.find('.subscription-inform-bar').at(0);
        expect(subscriptionInformBar).toHaveLength(1);
        const informBarContent1 = subscriptionInformBar.find('span').at(0);
        expect(informBarContent1.text()).toContain('Before you can purchase a course, you need to have a token balance or an active <Button />');
        const subscriptionsBtn = subscriptionInformBar.find('.subscription-inform-buttons').at(0);
        expect(subscriptionsBtn.props().children).toBe('Subscription.');

        const informBarContent2 = subscriptionInformBar.find('span').at(1);
        expect(informBarContent2.text()).toContain('You can also check');
        const freeIntroCoursesBtn = subscriptionInformBar.find('.subscription-inform-buttons').at(1);
        expect(freeIntroCoursesBtn.props().children).toBe('free introduction courses');
    });
    it('Should call `.navigateToSubscriptions()` method when `subscriptions` button is clicked', () => {
        const instance = testComponent.instance();
        const navigateToSubscriptionsSpy = jest.spyOn(instance, 'navigateToSubscriptions');

        testComponent.instance().setState({ onUpdate: false });
        const data = {
            publicly_visible: true,
            active: true,
        };
        testComponent.instance().getGoToCourseButton(data);

        const subscriptionInformBar = testComponent.find('.subscription-inform-bar').at(0);
        const subscriptionsBtn = subscriptionInformBar.find('.subscription-inform-buttons').at(0);

        subscriptionsBtn.simulate('click');

        expect(navigateToSubscriptionsSpy).toHaveBeenCalled();
        expect(testProps.history.push).toHaveBeenCalledWith('/platform/choose-subscription');
    });
    it('Should call `.navigateToIntroductionCourses()` method when `free introduction courses` button is clicked', () => {
        const instance = testComponent.instance();
        const navigateToIntroductionCoursesSpy = jest.spyOn(instance, 'navigateToIntroductionCourses');

        testComponent.instance().setState({ onUpdate: false });
        const data = {
            publicly_visible: true,
            active: true,
        };
        testComponent.instance().getGoToCourseButton(data);
        const subscriptionInformBar = testComponent.find('.subscription-inform-bar').at(0);
        const freeIntroCoursesBtn = subscriptionInformBar.find('.subscription-inform-buttons').at(1);

        freeIntroCoursesBtn.simulate('click');
        expect(navigateToIntroductionCoursesSpy).toHaveBeenCalled();
        expect(testProps.history.push).toHaveBeenCalledWith('/platform/academy-tour');
    });
});

describe('course-information ReactGA', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseInformation {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls ReactGA on videoStart', () => {
        const videoPlayer = component.find('.video-player');

        videoPlayer.simulate('play');

        expect(mockedGA.event).toHaveBeenCalledTimes(1);
    });
});

describe('Request access from team', () => {
    let component;
    const testProps = {
        ...props,
        user: {
            ...props.user,
            teams: [
                {
                    id: 1,
                    name: 'test-team',
                },
            ],
        },
    };

    beforeEach(() => {
        component = shallow(<CourseInformation {...testProps} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getRequestFromTeamButton() renders a button if a user is part of a team', () => {
        const instance = component.instance();

        const result = instance.getRequestFromTeamButton();

        expect(result.props.children).toBe('Request from team');
        expect(result.props.className).toBe('request-team-button false');
    });

    it('getRequestFromTeamButton() returns null if user is not a team member', () => {
        const testComponent = shallow(<CourseInformation {...props} />);

        const instance = testComponent.instance();
        const result = instance.getRequestFromTeamButton();

        expect(result).toBe(null);
    });

    it('getRequestFromTeamButton() calls requestCourseFromTeam() with courseId and teamId', async () => {
        const instance = component.instance();
        const handleRequestFromTeamSpy = jest.spyOn(instance, 'handleRequestFromTeam');

        const result = instance.getRequestFromTeamButton();
        // Button should be enabled at first
        expect(result.props.disabled).toBe(false);

        await result.props.onClick();

        expect(props.requestCourseFromTeam).toHaveBeenCalledTimes(1);
        expect(handleRequestFromTeamSpy).toHaveBeenCalledTimes(1);
        expect(props.requestCourseFromTeam).toHaveBeenCalledWith(testProps.course.id, testProps.user.teams[0].id);

        // Click button again to make sure API request fires only once
        await result.props.onClick();
        expect(props.requestCourseFromTeam).toHaveBeenCalledTimes(1);
        expect(handleRequestFromTeamSpy).toHaveBeenCalledTimes(2);

        // Refresh instance check if button has disabled class
        const resultTwo = instance.getRequestFromTeamButton();
        expect(resultTwo.props.className).toBe('request-team-button request-team-button-disabled');
        expect(resultTwo.props.disabled).toBe(true);
    });
});
