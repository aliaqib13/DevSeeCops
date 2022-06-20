import React from 'react';
import { shallow } from 'enzyme';
import { Sarah } from './sarah';

describe('Sarah', () => {
    let component; const
        props = { auth: { user: {} } };

    it('should render Sarah component successfully', () => {
        component = shallow(<Sarah {...props} />);
        expect(component.exists()).toBeTruthy();
    });
    // TODO fix that test, it was written only for coverage
    it('should render after handle scroll successfully', () => {
        component = shallow(<Sarah {...props} />);
        const inst = component.instance();
        inst.handleScroll();
        inst.elementInViewport({});
        expect(component.exists()).toBeTruthy();
    });
});
