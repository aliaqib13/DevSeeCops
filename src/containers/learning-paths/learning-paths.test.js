import React from 'react';
import { shallow } from 'enzyme';
import { LearningPaths } from './learning-paths';

const props = {
    getLearningPaths: jest.fn(),
    auth: { user: {} },
};

describe('LearningPath Container', () => {
    let component;
    beforeEach(() => {
        component = shallow(<LearningPaths {...props} />);
    });
    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
