import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import FellowDesiredCourses from './FellowDesiredCourses';

const desiredCourses = [
    {
        id: 1,
        title: 'Secrets Management for your applications',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 1,
        status: 'Desired',
    },
    {
        id: 2,
        title: 'Secrets Management in CI/CD',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 1,
        status: 'Desired',
    },
    {
        id: 3,
        title: 'Introduction Module For Application Security Intro...',
        description: 'Storing & managing your application secrets in a safe way by using HashiCorp Vault',
        category_id: 1,
        status: 'Desired',
        will_learn: ['test 1', 'test 2'],
        tools_used: ['test tool 1', 'test tool 2'],
    },
];

const categories = [
    { id: 1, name: 'test' },
    { id: 2, name: 'test two' },
];

const response = {
    id: 1,
};

const props = {
    desiredCourses,
    categories,
    createCourseProposal: jest.fn().mockResolvedValue(response),
    sendQuestionsToSupportTeam: jest.fn(() => Promise.resolve(true)),
    onChangeHandle: jest.fn(() => Promise.resolve(true)),

};

let component;
beforeEach(() => {
    component = shallow(<FellowDesiredCourses {...props} />);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('<FellowDesiredCourses />', () => {
    it('should render successfully', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should have a desired courses table', () => {
        expect(component.find('.desired-courses-table').length).toEqual(1);
    });
    it('should render button allowing user to send in email to courses team', () => {
        const queryButton = component.find('.fellow-message');
        expect(queryButton).toHaveLength(1);
        expect(queryButton.props().type).toBe('text');
        expect(queryButton.props().htmlType).toBe('button');
        expect(queryButton.props().children[0]).toEqual('Any questions, click here to drop us a message here, or via fellows@devsecops-academy.com');
    });

    it('Should return modal visible when click on `fellow-message` button ', () => {
        const wrapper = mount(<FellowDesiredCourses {...props} />);
        const queryButton = wrapper.find('.fellow-message').at(0);
        expect(wrapper.find('[data-testid="queryModal"]').at(0).props().visible).toBe(false);
        queryButton.simulate('click');
        expect(wrapper.find('[data-testid="queryModal"]').at(0).props().visible).toBe(true);
    });

    it('Should return modal visible when click on `fellow-message` button ', () => {
        const wrapper = mount(<FellowDesiredCourses {...props} />);
        const queryButton = wrapper.find('.fellow-message').at(0);
        expect(wrapper.find('[data-testid="queryModal"]').at(0).props().visible).toBe(false);
        queryButton.simulate('click');
        expect(wrapper.find('[data-testid="queryModal"]').at(0).props().visible).toBe(true);
    });

    it('Should call `sendQuestionsToSupportTeam` when click on `fellow-message` button ', () => {
        const wrapper = mount(<FellowDesiredCourses {...props} />);
        const queryButton = wrapper.find('.fellow-message').at(0);
        queryButton.simulate('click');

        const queryModal = wrapper.find('[data-testid="queryModal"]').at(0);
        const buttonSend = queryModal.find('button').at(1);

        const spy = jest.spyOn(wrapper.props(), 'sendQuestionsToSupportTeam');
        wrapper.update();
        expect(spy).toHaveBeenCalledTimes(0);

        buttonSend.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('table should have 3 columns', () => {
        expect(component.find('.desired-courses-row').length).toEqual(3);
        expect(component.find('withStore(Table)').props().children[0].props.title).toEqual('Course Title');
        expect(component.find('withStore(Table)').props().children[1].props.title).toEqual('Category');
        expect(component.find('withStore(Table)').props().children[2].props.title).toEqual('Action');
    });

    it('action column should have a button to create a new proposal', () => {
        const createProposalButton = component.find('withStore(Table)').props().children[2].props.render();
        expect(createProposalButton.type.__ANT_BUTTON).toEqual(true);
        expect(createProposalButton.props.children).toEqual('Create Proposal');
    });

    it('clicking on the "Create proposal" button will call history.push with the id of the new proposal', async () => {
        const history = {
            push: jest.fn(),
            listen: jest.fn(),
            location: {},
        };
        const testCompoent = mount(
            <Router history={history}>
                <FellowDesiredCourses {...props} />
            </Router>,
        );
        const createButton = testCompoent.find('.create-course-proposal-button');

        const firstButton = createButton.first();

        firstButton.simulate('click');

        await new Promise(resolve => setTimeout(resolve, 100)); // Wait to make sure promise has resolved

        expect(history.push).toHaveBeenCalledWith(`/platform/fellow-area/edit-proposal/${response.id}`);
    });

    it('clicking a course title opens a modal with more information', async () => {
        const history = {
            push: jest.fn(),
            listen: jest.fn(),
            location: {},
        };
        const testComponent = mount(
            <Router history={history}>
                <FellowDesiredCourses {...props} />
            </Router>,
        );
        const button = testComponent.find('.course-title').first();

        button.simulate('click');

        const modal = testComponent.find('.course-details-modal');
        expect(modal.find('.course-details-title').first().props().children).toEqual(props.desiredCourses[0].title);
        expect(modal.find('.course-details-category').first().props().children).toEqual('Category:');
        expect(modal.find('.course-details-description').first().props().children).toEqual('Description:');
        expect(modal.find('.course-details-additional-info').first().props().children).toEqual('Additional Information:');
    });

    it('clicking a course title opens a modal with tools_used and will_learn if there has', async () => {
        const history = {
            push: jest.fn(),
            listen: jest.fn(),
            location: {},
        };
        const testComponent = mount(
            <Router history={history}>
                <FellowDesiredCourses {...props} />
            </Router>,
        );
        const button = testComponent.find('.course-title').last();

        button.simulate('click');

        const modal = testComponent.find('.course-details-modal');
        expect(modal.find('.course-details-tools').first().props().children).toEqual('Tools:');
        expect(modal.find('.course-details-learning-objectives').first().props().children).toEqual('Learning Objectives:');

        expect(modal.find('.tool-item').first().text()).toEqual(desiredCourses[2].tools_used[0]);
        expect(modal.find('.tool-item').last().text()).toEqual(desiredCourses[2].tools_used[1]);

        expect(modal.find('.learning-objective-item').first().text()).toEqual(desiredCourses[2].will_learn[0]);
        expect(modal.find('.learning-objective-item').last().text()).toEqual(desiredCourses[2].will_learn[1]);
    });

    it('if no tools_used and will_learn on modal', async () => {
        const history = {
            push: jest.fn(),
            listen: jest.fn(),
            location: {},
        };
        const testComponent = mount(
            <Router history={history}>
                <FellowDesiredCourses {...props} />
            </Router>,
        );
        const button = testComponent.find('.course-title').first();

        button.simulate('click');

        const modal = testComponent.find('.course-details-modal');

        expect(modal.find('.course-details-tools')).toHaveLength(0);
        expect(modal.find('.course-details-learning-objectives')).toHaveLength(0);
    });

    it('Should onChangeHandle() successfully work', async () => {
        const event = {
            target: {
                value: 'test value',
            },
        };
        await component.find('.message-input').simulate('change', event);
        expect(component.find('.message-input').props().value).toEqual(event.target.value);
    });
});
