import React from 'react';
import { shallow } from 'enzyme';
import Comment from './Comment';

describe('Comment', () => {
    let component;
    const props = {
    };

    beforeEach(() => {
        component = shallow(<Comment {...props} />);
    });

    it('should render Comment component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
