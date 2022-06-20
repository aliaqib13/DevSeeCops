import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import { Footer } from './LandingFooter';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    auth: { user: { firstname: 'Test', lastname: 'Test' } },
};

describe('Footer', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Footer {...props} />);
        component.instance().setState({ loaded: true });
    });

    it('should render Footer component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should call GA event on submit of subscribe form successfully', () => {
        const form = component.find('.subscribe-button');
        form.props().onSubmit();
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'newsletter',
            action: 'User subscribed',
            label: 'Clicked on "Subscribe" button in footer',
        });
    });
});

describe('handleGAEvent()', () => {
    it('should work successfully', () => {
        const component = shallow(<Footer {...props} />);

        component.instance().handleGAEvent('fellowship');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed fellowship page',
            label: 'Clicked on "fellowship" in footer',
        });

        component.instance().handleGAEvent('for-business');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed business page',
            label: 'Clicked on "for business" in footer',
        });

        component.instance().handleGAEvent('subscribe');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'newsletter',
            action: 'User subscribed',
            label: 'Clicked on "Subscribe" button in footer',
        });
    });
});
