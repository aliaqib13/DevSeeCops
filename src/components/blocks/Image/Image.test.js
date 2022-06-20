import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('Image', () => {
    let component;
    const props = {
        content: {
            height: '10',
            width: '10',
            image: [
                {
                    src: 'test1',
                },
                {
                    src: 'test2',
                },
                {
                    src: 'test3',
                },
            ],

        },
    };

    beforeEach(() => {
        component = shallow(<Image {...props} />);
    });

    it('should render Image component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
    it('Returns null if image content is invalid', () => {
        const testComponent = shallow(<Image content={{ image: { something: 'that is not an array' } }} />);
        expect(testComponent.isEmptyRender()).toBeTruthy();
    });
});
