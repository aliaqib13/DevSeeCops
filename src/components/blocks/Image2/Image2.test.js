import React from 'react';
import { shallow } from 'enzyme';
import Image2 from './Image2';

describe('Image2', () => {
    let component;
    const props = {
        content: {
            image: 'test',
        },
    };

    beforeEach(() => {
        component = shallow(<Image2 {...props} />);
    });

    it('should render Image component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
