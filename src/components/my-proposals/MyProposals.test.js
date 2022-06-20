import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import MyProposals from './MyProposals';

const courseProposals = [
    {
        id: 1,
        user_id: 8,
        status: 'DRAFT',
        category_id: 1,
        course: {
            title: 'testTitle',
        },
    },
    {
        id: 2,
        user_id: 8,
        status: 'SUBMITTED',
        category_id: 1,
        course: {
            title: 'testTitle',
        },
    },
    {
        id: 3,
        user_id: 8,
        status: 'REJECTED',
        category_id: 1,
        course: {
            title: 'testTitle',
        },
    },
    {
        id: 4,
        user_id: 8,
        status: 'APPROVED',
        category_id: 1,
        course: {
            title: 'testTitle',
        },
    },
];

const props = {
    categories: [
        { id: 1, name: 'test category name' },
    ],
    editProposal: jest.fn(),
};

let component;
beforeEach(() => {
    component = shallow(<MyProposals {...props} />);
});

afterEach(() => {
    jest.clearAllMocks();
});

const STATUS_COLOR_MAP = {
    DRAFT: 'grey',
    APPROVED: 'green',
    SUBMITTED: 'green',
    REJECTED: 'red',
};

describe('<MyProposals />', () => {
    it('should render successfully', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should have a proposals table', () => {
        expect(component.find('.proposals-table').length).toEqual(1);
    });

    it('table should have 3 columns', () => {
        expect(component.find('.proposals-row').length).toEqual(3);
        expect(component.find('withStore(Table)').props().children[0].props.title).toEqual('Course Title');
        expect(component.find('withStore(Table)').props().children[1].props.title).toEqual('Category');
        expect(component.find('withStore(Table)').props().children[2].props.title).toEqual('Status');
    });

    it('clicking on the proposal row will call history.push with the id of the proposal', async () => {
        const history = {
            push: jest.fn(),
            listen: jest.fn(),
            location: {},
        };

        const testCompoent = mount(
            <Router history={history}>
                <MyProposals {...props} />
            </Router>,
        );
        const row = testCompoent.find('.proposals-table');
        row.at(0).props().onRow(courseProposals[0]).onClick();

        expect(history.push).toHaveBeenCalledWith(`/platform/fellow-area/edit-proposal/${courseProposals[0].id}`);
    });

    it('should set correct keys', () => {
        const row = component.find('.proposals-table');
        const key = courseProposals[0].id + courseProposals[0].course.title;
        expect(row.at(0).props().rowKey(courseProposals[0])).toBe(key);
    });

    it('should proposals-row last column render statuses div', () => {
        const row = component.find('.proposals-row');
        expect(row.at(2).props().render(courseProposals[0]).props.className).toBe('statuses');
        expect(row.at(2).props().render(courseProposals[0]).type).toBe('div');
        const status = row.at(2).props().render(courseProposals[0]).props.children.props.children;
        expect(status).toBe(courseProposals[0].status);
        expect(row.at(2).props().render(courseProposals[0]).props.children.props.color).toBe(STATUS_COLOR_MAP[status]);
    });

    it('should render course proposal title', () => {
        const row = component.find('.proposals-row');
        expect(row.at(0).props().render(courseProposals[0]).type).toBe('p');
        expect(row.at(0).props().render(courseProposals[0]).props.className).toBe('course-title');
        expect(row.at(0).props().render(courseProposals[0]).props.children).toBe(courseProposals[0].course.title);
    });

    it('should render course proposal category', () => {
        const row = component.find('.proposals-row');
        expect(row.at(1).props().render(courseProposals[0]).type).toBe('p');
        expect(row.at(1).props().render(courseProposals[0]).props.children).toBe(props.categories[0].name);
    });
});
