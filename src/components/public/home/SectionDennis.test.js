import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import SectionDennis, { goToDennis } from './SectionDennis';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

const props = {
    history: { push: jest.fn(() => Promise.resolve(true)) },
};

describe('SectionDennis', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SectionDennis {...props} />);
    });

    it('should render SectionDennis component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});

describe('goToDennis()', () => {
    it('should work successfully', () => {
        window.scrollTo = jest.fn();
        goToDennis(props);
        expect(props.history.push).toHaveBeenCalledWith('/dennis');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed Dennis page',
            label: 'Clicked on "how DSOA works"',
        });
    });
});
