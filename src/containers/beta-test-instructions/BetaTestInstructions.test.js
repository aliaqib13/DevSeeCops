import React from 'react';
import { shallow } from 'enzyme';
import { BetaTestInstructions } from './BetaTestInstructions';

describe('BetaTestInstructions', () => {
    let component; const
        props = {
            betaTest: {
                data: [
                    {
                        title: 'test',
                        contentBlocks: [],
                    },
                ],

            },
            fetchBetaTestInstructions: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<BetaTestInstructions {...props} />);
    });

    it('should render BetaTestInstructions component successfully', () => {
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
        expect(stepItem.props().children[0]).toBe(props.betaTest.data[0].title);
    });

    it('should render stepsCount successfully', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.exists()).toBeTruthy();
    });

    it('stepsCount should show the correct page', () => {
        const stepsCount = component.find('.stepsCount');
        expect(stepsCount.text()).toBe(`${component.state().currentStep + 1}/${props.betaTest.data.length}`);
    });
});
