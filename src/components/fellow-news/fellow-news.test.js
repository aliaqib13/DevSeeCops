import React from 'react';
import { shallow } from 'enzyme';
import { Timeline } from 'antd';
import FellowNews from './fellow-news';

describe('FellowNews', () => {
    let component;
    const props = {
        news: [
            {
                title: 'test',
                contentBlocks: [],
            },
        ],
    };

    beforeEach(() => {
        component = shallow(<FellowNews {...props} />);
    });

    it('should render FellowNews component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render stepPageContent-wrapper successfully', () => {
        const stepPageContentWrapper = component.find('.stepPageContent-wrapper');
        expect(stepPageContentWrapper.exists()).toBeTruthy();
    });

    it('should render step-item successfully', () => {
        const stepItem = component.find('.step-item');
        expect(stepItem.exists()).toBeTruthy();
    });

    it('step-item should have news title from props', () => {
        const stepItem = component.find('.step-item');
        expect(stepItem.props().children[0]).toBe(props.news[0].title);
    });

    it('should render stepsCount successfully', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.exists()).toBeTruthy();
    });

    it('stepsCount should show the correct page', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.text()).toBe(`${component.state().currentStep + 1}/${props.news.length}`);
    });

    it('Has a "Timeline" component with as many "Items" as props.news', () => {
        // Find the timeline component
        expect(component.find(Timeline).length).toBe(1);
        const timelineComponent = component.find(Timeline).first();

        // Check it's got as many "Items" as there are "news"
        expect(timelineComponent.find(Timeline.Item).length).toBe(props.news.length);
    });

    it('renders timeline items in the appropriate colour', () => {
        const testProps = {
            ...props,
            news: [
                { title: '0 index', contentBlocks: [] },
                { title: '1 index', contentBlocks: [] },
                { title: '2 index', contentBlocks: [] },
            ],
        };

        const testComponent = shallow(<FellowNews {...testProps} />);

        // Set the currentStep to be 2:
        testComponent.setState({ currentStep: 1 });

        // Find the timeline component
        expect(testComponent.find(Timeline).length).toBe(1);
        const timelineComponent = testComponent.find(Timeline).first();

        // Check it's got as many "Items" as there are "news"
        expect(timelineComponent.find(Timeline.Item).length).toBe(testProps.news.length);

        const items = timelineComponent.find(Timeline.Item);

        // 0 should be 'green'
        expect(items.at(0).props().color).toBe('green');

        // 1 should not have a colour defined (which then defaults to blue)
        expect(items.at(1).props().color).toBe('blue');

        // 2 should be 'gray'
        expect(items.at(2).props().color).toBe('gray');
    });
});
