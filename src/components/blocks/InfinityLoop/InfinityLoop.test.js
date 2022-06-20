import React from 'react';
import { shallow } from 'enzyme';
import InfinityLoop from './InfinityLoop';

describe('InfinityLoop', () => {
    let component;
    const props = {
        content: {
            stages: [
                'test',
                'test2',
                'test3',
                'test4',
            ],
            text: [
                'test',
                'test2',
                'test3',
                'test4',
            ],
        },
    };

    beforeEach(() => {
        component = shallow(<InfinityLoop {...props} />);
    });

    it('should render CertificateCard component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
