import React from 'react';
import { shallow } from 'enzyme';
import BulletText from './BulletText';

describe('Posts', () => {
    let component;
    const props = {
        content: {
            text: [
                'text',
                'text2',
            ],
        },
    };

    beforeEach(() => {
        component = shallow(<BulletText {...props} />);
    });

    it('should render BulletText component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
