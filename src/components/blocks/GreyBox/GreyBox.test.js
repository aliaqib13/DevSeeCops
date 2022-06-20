import React from 'react';
import { shallow } from 'enzyme';
import GreyBox from './GreyBox';

describe('GreyBox', () => {
    let component;
    const props = {
        content: {
            titles: [
                'test1',
                'test2',
                'test3',
            ],
            text: [
                'test1',
                'test2',
                'test3',
            ],
        },
    };

    beforeEach(() => {
        component = shallow(<GreyBox {...props} />);
    });

    it('should render GreyBox component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
