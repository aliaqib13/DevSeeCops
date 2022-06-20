import React from 'react';
import { shallow } from 'enzyme';
import AddStep from './addStep';

describe('addStep', () => {
    let component; const
        props = {
            fetchFavoriteSteps: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<AddStep {...props} />);
    });

    it('should render addStep component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render addSavedSteps button successfully', () => {
        const addSavedSteps = component.find('.addSavedSteps');
        expect(addSavedSteps.exists()).toBeTruthy();
    });

    it('should render addSavedSteps button with text " Add Saved Steps"', () => {
        const addSavedSteps = component.find('.addSavedSteps');
        expect(addSavedSteps.props().children[1]).toBe('Add Saved Steps');
    });

    it('should render savedSteps modal successfully', () => {
        const addedSteps = component.find('.savedSteps');
        expect(addedSteps.exists()).toBeTruthy();
    });

    it('should toggle savedSteps modal with title "Saved Steps"', () => {
        const addedSteps = component.find('.savedSteps');
        expect(addedSteps.props().title).toBe('Saved Steps');
    });

    it('should toggle savedSteps modal successfully', () => {
        expect(component.find('.savedSteps').props().visible).toBeFalsy();
        component.find('.addSavedSteps').props().onClick();
        expect(component.find('.savedSteps').props().visible).toBeTruthy();
    });
});
