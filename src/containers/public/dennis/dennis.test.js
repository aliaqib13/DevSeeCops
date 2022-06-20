import React from 'react';
import { shallow } from 'enzyme';
import { Dennis } from './dennis';

describe('Dennis', () => {
    let component;
    const props = {
        auth: { user: { id: 3 } },
        history: { push: jest.fn(link => Promise.resolve(link)) },
    };

    beforeEach(() => {
        component = shallow(<Dennis {...props} />);
    });

    it('should render Dennis component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
