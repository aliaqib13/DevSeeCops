import React from 'react';
import { shallow } from 'enzyme';
import Labs from './Labs';

describe('Labs', () => {
    let component;
    const props = {};

    beforeEach(() => {
        component = shallow(<Labs {...props} />);
    });

    it('should render Labs component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
