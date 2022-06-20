import React from 'react';
import { shallow } from 'enzyme';
import CodeSnippet from './CodeSnippet';

describe('CodeSnippet', () => {
    let component;
    const props = {
        content: {
            language: 'test',
            code: 'test',
        },
    };

    beforeEach(() => {
        component = shallow(<CodeSnippet {...props} />);
    });

    it('should render CodeSnippet component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
