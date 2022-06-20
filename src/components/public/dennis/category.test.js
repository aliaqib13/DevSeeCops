import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import Category from './category';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('Category', () => {
    let component;
    const props = {
        auth: { user: { id: 3 } },
        history: { push: jest.fn(link => Promise.resolve(link)) },
    };

    beforeEach(() => {
        component = shallow(<Category {...props} />);
    });

    it('should render Course successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should call GA event and go to `/platform/academy-tour`', async () => {
        const result = await component.instance().handleLinkTo();
        expect(result).toBe('/platform/academy-tour');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed introduction tour page',
            label: 'Dennis page',
        });
    });
});
