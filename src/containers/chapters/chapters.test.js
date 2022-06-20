import React from 'react';
import { shallow } from 'enzyme';
import { Typography } from 'antd';
import { Chapters } from './chapters';

const { Paragraph } = Typography;

describe('Chapters', () => {
    const props = {
        match: { params: { id: 1 } },
        auth: { user: { roles: [] } },
        chapters: {
            data: {
                description: 'Fail',
                content: 'Test subtitle',
                chapters: [
                    { title: 'chapter1', contentBlocks: [] },
                    { title: 'chapter2', contentBlocks: [] },
                    { title: 'chapter3', contentBlocks: [] },
                ],
            },
        },
        getChapters: jest.fn(() => Promise.resolve(true)),
        getLearningPaths: jest.fn(() => Promise.resolve(true)),
        fetchStepsImages: jest.fn(() => Promise.resolve(true)),
    };
    it('should render Chapters successfully', () => {
        const component = shallow(<Chapters {...props} />, { disableLifecycleMethods: true });
        expect(component.exists()).toBeTruthy();
    });

    it('should render the course subtitle in the preparation header', () => {
        const component = shallow(<Chapters {...props} />, { disableLifecycleMethods: true });
        const subtitle = component.find(Paragraph);
        expect(subtitle.length).toBe(1);
        expect(subtitle.first().children().text()).toBe(props.chapters.data.content);
    });
});
