import React from 'react';
import { shallow } from 'enzyme';
import Posts from './index';

describe('Posts', () => {
    let component;
    const props = {
        searchUserByEmail: jest.fn(() => Promise.resolve(true)),
        searchCourse: jest.fn(() => Promise.resolve(true)),
        uploadImage: jest.fn(() => Promise.resolve(true)),
        createPost: jest.fn(() => Promise.resolve(true)),
        updatePost: jest.fn(() => Promise.resolve(true)),
        fetchPostTags: jest.fn(() => Promise.resolve(true)),
        updateTags: jest.fn(() => Promise.resolve(true)),
        searchPostTag: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<Posts {...props} />);
    });

    it('should render Posts component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
