import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import FellowArea from './fellow-area';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        loading: jest.fn().mockReturnValue(() => {}),
        success: jest.fn(),
        warning: jest.fn(),
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

let component;

afterEach(() => {
    jest.clearAllMocks();
});

describe('<FellowArea />', () => {
    const props = {
        fellowArea: {
            fellow_course: [],
            user: [{
                id: 1,
                is_fellow: 1,
                firstname: 'Dominik',
                lastname: 'de Smit',
            }],
        },
        fellowName: 'Dominik de Smit',
        fetchFellowCourses: jest.fn(() => Promise.resolve(true)),
        fetchFellowCoursesAdmin: jest.fn(() => Promise.resolve(true)),
        getFellowGuideLines: jest.fn(() => Promise.resolve(true)),
        getCourseScenarios: jest.fn(() => Promise.resolve(true)),
        getFellowNews: jest.fn(() => Promise.resolve(true)),
        getDesiredCourses: jest.fn(() => Promise.resolve(true)),
        createCourseProposal: jest.fn(() => Promise.resolve(true)),
        getProposals: jest.fn(() => Promise.resolve(true)),
        match: {
            params: {
                id: 1,
            },
        },
        location: {
            pathname: '',
        },
    };

    beforeEach(() => {
        component = shallow(<FellowArea {...props} />);
    });

    it('Should render successfully', async () => {
        expect(component).toHaveLength(1);
    });

    it('Should render all tabs successfully', async () => {
        expect(component.props().children[1].props.children[0].props.tab).toBe('Fellow Courses');
        expect(component.props().children[1].props.children[1].props.tab).toBe('Desired Courses');
        expect(component.props().children[1].props.children[2].props.tab).toBe('My Proposals');
        expect(component.props().children[1].props.children[3].props.tab).toBe('Draft Course');
        expect(component.props().children[1].props.children[4].props.tab).toBe('Guideline');
        expect(component.props().children[1].props.children[5].props.tab).toBe('Fellow News');
    });

    it('checkUrlForAdmin contains \'/admin/\'', async () => {
        const instance = component.instance();
        const { checkUrlForAdmin } = instance;

        expect(checkUrlForAdmin('some-string')).toEqual(false);
        expect(checkUrlForAdmin('admin')).toEqual(false);
        expect(checkUrlForAdmin('/admin-something/')).toEqual(false);

        expect(checkUrlForAdmin('/admin/')).toEqual(true);
    });

    it('should call fetchFellowCourses()', async () => {
        expect(props.fetchFellowCourses).toHaveBeenCalledTimes(1);
    });

    it('should not call fetchFellowCoursesAdmin()', async () => {
        expect(props.fetchFellowCoursesAdmin).not.toHaveBeenCalled();
    });

    it('calls createCourseProposal()', async () => {
        const data = {
            courseId: 1,
        };
        const response = await props.createCourseProposal(data);

        expect(message.loading).toBeCalledWith('Loading..', 0);
        expect(response).toEqual(true);
    });
    it('should provide fellow props to <DraftCourseTable />', async () => {
        const DraftCourseTableProps = component.find('DraftCourseTable').props();

        expect(DraftCourseTableProps).toHaveProperty(
            'draft',
            'saveDrafts',
            'submitDrafts',
            'clearDrafts',
            'categories',
            'scenario',
            'category',
            'object',
            'ref',
        );

        expect(DraftCourseTableProps).not.toHaveProperty(
            'fellowName',
            'user_id',
            'getCourseRequiredFiels',
            'createCourse',
            'searchByCourseTags',
            'activeKey',
        );
    });
});

describe('<FellowArea /> on Mount ', () => {
    const props = {
        fellowArea: {
            fellow_course: [],
            user: [{
                id: 1,
                is_fellow: 1,
                firstname: 'Dominik',
                lastname: 'de Smit',
            }],
        },
        fellowName: 'Dominik de Smit',
        fetchFellowCourses: jest.fn(() => Promise.resolve(true)),
        fetchFellowCoursesAdmin: jest.fn(() => Promise.resolve(true)),
        getFellowGuideLines: jest.fn(() => Promise.resolve(true)),
        getCourseScenarios: jest.fn(() => Promise.resolve(true)),
        getFellowNews: jest.fn(() => Promise.resolve(true)),
        getDesiredCourses: jest.fn(() => Promise.resolve(true)),
        createCourseProposal: jest.fn(() => Promise.resolve(true)),
        getProposals: jest.fn(() => Promise.resolve(true)),
        match: {
            params: {
                id: 1,
            },
        },
        location: {
            pathname: '',
        },
    };

    beforeEach(() => {
        component = shallow(<FellowArea {...props} />, { disableLifecycleMethods: true });
    });

    it('Should call getDesiredCourses() on mount', async () => {
        const getDesiredCourses = jest.spyOn(props, 'getDesiredCourses');

        const instance = component.instance();
        await instance.componentDidMount();

        expect(message.loading).toBeCalledWith('Loading..', 0);
        expect(getDesiredCourses).toHaveBeenCalledTimes(1);
    });

    it('Should call getFellowNews() on mount', async () => {
        const getFellowNews = jest.spyOn(props, 'getFellowNews');

        const instance = component.instance();
        await instance.componentDidMount();

        expect(message.loading).toBeCalledWith('Loading..', 0);
        expect(getFellowNews).toHaveBeenCalledTimes(1);
    });

    it('Should call getFellowGuideLines() on mount', async () => {
        const getFellowGuideLines = jest.spyOn(props, 'getFellowGuideLines');

        const instance = component.instance();
        await instance.componentDidMount();

        expect(message.loading).toBeCalledWith('Loading..', 0);
        expect(getFellowGuideLines).toHaveBeenCalledTimes(1);
    });

    it('Should change tab', async () => {
        const key = 'Guideline';
        const instance = component.instance();
        await instance.changeTab(key);

        expect(component.state('activeKey')).toEqual(key);
    });

    it('Should setScenario() successfully worked', async () => {
        const title = 'test title';
        const category = 'test category';
        const object = {};

        const instance = component.instance();
        await instance.setScenario(title, category, object);

        expect(component.state('scenario')).toEqual(title);
        expect(component.state('category')).toEqual(category);
        expect(component.state('object')).toEqual(object);
    });
});

describe('<FellowArea /> as Admin', () => {
    const props = {
        fellowArea: {
            fellow_course: [],
            user: [{
                id: 1,
                is_fellow: 1,
                firstname: 'Dominik',
                lastname: 'de Smit',
            }],
        },
        fellowName: 'Dominik de Smit',
        fetchFellowCourses: jest.fn(() => Promise.resolve(true)),
        fetchFellowCoursesAdmin: jest.fn(() => Promise.resolve(true)),
        getFellowGuideLines: jest.fn(() => Promise.resolve(true)),
        getCourseScenarios: jest.fn(() => Promise.resolve(true)),
        getFellowNews: jest.fn(() => Promise.resolve(true)),
        getDesiredCourses: jest.fn(() => Promise.resolve(true)),
        createCourseProposal: jest.fn(() => Promise.resolve(true)),
        getProposals: jest.fn(() => Promise.resolve(true)),
        match: {
            params: {
                id: 1,
            },
        },
        location: {
            pathname: 'testurl/admin/fellow-area-test',
        },
    };

    beforeEach(() => {
        component = shallow(<FellowArea {...props} />, { disableLifecycleMethods: true });
    });

    it('should call fetchFellowCoursesAdmin()', async () => {
        const instance = component.instance();
        await instance.componentDidMount();

        expect(props.fetchFellowCoursesAdmin).toHaveBeenCalledTimes(1);
    });
    it('should not call fetchFellowCourses()', async () => {
        const instance = component.instance();
        await instance.componentDidMount();

        expect(props.fetchFellowCourses).not.toHaveBeenCalled();
    });

    it('should provide admin props to <DraftCourseTable />', async () => {
        const DraftCourseTableProps = component.find('DraftCourseTable').props();

        expect(DraftCourseTableProps).toHaveProperty(
            'fellowName',
            'user_id',
            'getCourseRequiredFiels',
            'createCourse',
            'searchByCourseTags',
            'activeKey',
        );
    });
});
