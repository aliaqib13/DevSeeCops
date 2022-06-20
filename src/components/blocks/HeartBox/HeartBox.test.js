import React from 'react';
import { shallow } from 'enzyme';
import HeartBox from './HeartBox';

describe('HeartBox', () => {
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
        component = shallow(<HeartBox {...props} />);
    });

    it('should render HeartBox component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
