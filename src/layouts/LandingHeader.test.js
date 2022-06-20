import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import { Header } from './LandingHeader';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    auth: { user: { firstname: 'Test', lastname: 'Test' } },
};

describe('Header', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Header {...props} />);
    });

    it('should render Header component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});

describe('handleGAEvent()', () => {
    it('should work successfully', () => {
        const component = shallow(<Header {...props} />);
        component.instance().handleGAEvent('fellowship');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed fellowship page',
            label: 'Clicked on "fellowship" in header',
        });
        component.instance().handleGAEvent('for-business');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed business page',
            label: 'Clicked on "for business" in header',
        });
        component.instance().handleGAEvent('academy-tour');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed introduction tour page',
            label: 'Clicked on "Introduction Tour" in header',
        });
    });
});
