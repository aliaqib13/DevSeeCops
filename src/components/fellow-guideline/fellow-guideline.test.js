import React from 'react';
import { shallow } from 'enzyme';
import FellowGuideline from './fellow-guideline';

describe('FellowGuideline', () => {
    let component; const
        props = {
            chapters: [
                {
                    title: 'test',
                    contentBlocks: [],
                },
            ],
        };

    beforeEach(() => {
        component = shallow(<FellowGuideline {...props} />);
    });

    it('should render FellowGuideline component successfully', () => {
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

    it('step-item should have chapters title from props', () => {
        const stepItem = component.find('.step-item');
        expect(stepItem.props().children[0]).toBe(props.chapters[0].title);
    });

    it('should render stepsCount successfully', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.exists()).toBeTruthy();
    });

    it('stepsCount should show the correct page', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.text()).toBe(`${component.state().currentStep + 1}/${props.chapters.length}`);
    });
});
