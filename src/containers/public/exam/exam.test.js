import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip } from 'antd';
import { Exam } from './exam';
import Loading from '../../../components/Loading/Loading';
import TokensCount from '../../../components/course-information/TokensCount/TokensCount';

const course = {
    __meta__: {
        activeCourses_count: 3,
    },
    theory_duration: '15m',
    access_request: false,
    lab_steps_in_personal_archive: true,
    id: 2,
    ratings: [],
    courseTags: [

    ],
    information: {
        quizzes: 2,
        steps: 21,
        videos: 0,
    },
    faq: [],
    token_cost: 5,
};

const props = {
    course,
    user: {
        roles: [
            'administrator',
        ],
    },
    match: {
        params: {
            id: 1,
        },
    },
    getPublicCourseById: jest.fn(() => Promise.resolve(true)),

};

describe('exam-information', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Exam {...props} />);
    });

    it('renders component successfully', () => {
        expect(component).toHaveLength(1);
    });
    it('renders only a Loader when state.loading is true', () => {
        component.setState({ loading: true });

        // We should see the loading spinner
        const loadingComponent = component.find(Loading);
        expect(loadingComponent).toHaveLength(1);
    });

    it('should successfully render the calculated price in the course information ', async () => {
        const priceElementMeta1 = component.find('.price').at(0);
        const priceElementMeta2 = component.find('.price').at(1);
        const TokenCostComponents = component.find(TokensCount);
        expect(priceElementMeta1.props().children[0]).toBe('$');
        expect(priceElementMeta1.props().children[1]).toBe('25.00');
        expect(TokenCostComponents.at(0).dive().props().title).toBe('1 token = 5$');
        expect(priceElementMeta2.props().children[0]).toBe('$');
        expect(priceElementMeta2.props().children[1]).toBe('25.00');
        expect(TokenCostComponents.at(1).dive().props().title).toBe('1 token = 5$');
    });
});
