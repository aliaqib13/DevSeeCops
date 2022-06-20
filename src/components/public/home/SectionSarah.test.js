import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import SectionSarah, { goToSarah } from './SectionSarah';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    history: { push: jest.fn(() => Promise.resolve(true)) },
};

describe('SectionSarah', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SectionSarah {...props} />);
    });

    it('should render SectionSarah component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});

describe('goToSarah()', () => {
    it('should work successfully', () => {
        window.scrollTo = jest.fn();
        goToSarah(props);
        expect(props.history.push).toHaveBeenCalledWith('/sarah');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Sarah page',
            label: 'Clicked on "how DSOA helped me"',
        });
    });
});
