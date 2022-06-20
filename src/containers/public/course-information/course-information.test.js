import React from 'react';
import { shallow } from 'enzyme';
import { CourseInformation } from './course-information';
import Loading from '../../../components/Loading/Loading';
import TokensCount from '../../../components/course-information/TokensCount/TokensCount';

const course = {
    id: 2,
    ratings: [],
    token_cost: 21,
};

const props = {
    course,
    match: {
        params: {
            id: 1,
        },
    },
    getCourseById: jest.fn(() => Promise.resolve(true)),
};

describe('public course-information', () => {
    let component;
    beforeEach(() => {
        component = shallow(<CourseInformation {...props} />);
    });

    it('should render course overview in the side bar successfully', () => {
        const courseOverviewSideBar = component.find('.course-overview-container');
        expect(courseOverviewSideBar.children().length).not.toBe(0);
        const overViewTitle = courseOverviewSideBar.find('.title');
        expect(overViewTitle.text()).toEqual('Course Overview');
        expect(courseOverviewSideBar.contains([<div>Course price</div>])).toEqual(true);
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

    it('handles the case when `props.course` is empty before the API result returns ', () => {
        const testProps = { ...props };
        testProps.course = {};

        const testComponent = shallow(<CourseInformation {...testProps} />);

        // We should see the loading spinner
        const loadingComponent = testComponent.find(Loading);
        expect(loadingComponent.exists()).toBeTruthy();
    });
});
