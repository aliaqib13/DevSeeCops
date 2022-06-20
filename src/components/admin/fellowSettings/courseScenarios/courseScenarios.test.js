import React from 'react';
import { shallow } from 'enzyme';
import CourseScenarios from './courseScenarios';

const props = {
    categories: [{
        id: 1,
        name: 'Secrets Management',
        created_at: null,
        updated_at: null,
    }],
    createCourseScenarios: jest.fn(() => Promise.resolve(true)),
    updateCourseScenarios: jest.fn(() => Promise.resolve(true)),
    deleteCourseScenarios: jest.fn(() => Promise.resolve(true)),
    labBlocks: [
        {
            id: 1,
            title: 'Jenkins',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/labBlocks/KXh1Sa0JV4LW4049mBQF4KJPm0ETGAZS.png',
        },
        {
            id: 2,
            title: 'AWS',
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/labBlocks/mfmD6FNlqdm2ruF7XK7TSbrB7D0xD0Kp.png',
        },
    ],
    courseScenarios: [{
        title: 'Test',
        category: { id: 1, name: 'Test' },
        category_id: 1,
        object: 'Test',
        lab_blocks: [1, 2],
    }],
};

describe('CourseScenarios', () => {
    let component;
    beforeEach(() => {
        component = shallow(<CourseScenarios {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render create button successfully', () => {
        const createButton = component.find('Button').at(0);
        expect(createButton.props().children).toBe('Create');
        expect(createButton.props().type).toBe('primary');
    });

    it('Should render table successfully', () => {
        const table = component.props().children[1];
        expect(table.props.dataSource).toBe(props.courseScenarios);
    });

    it('Should render create modal successfully', () => {
        const modal = component.props().children[2];
        expect(modal.props.labBlocks).toBe(props.labBlocks);
        expect(modal.props.categories).toBe(props.categories);
    });

    it('Should render update modal successfully', () => {
        const modal = component.props().children[3];
        expect(modal.props.labBlocks).toBe(props.labBlocks);
        expect(modal.props.categories).toBe(props.categories);
    });
});
