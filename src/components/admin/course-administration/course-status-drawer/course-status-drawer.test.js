import React from 'react';
import { shallow } from 'enzyme';
import { CourseStatusDrawer } from './index';

const props = {
    getCoursesByStatus: jest.fn(() => Promise.resolve(true)),
    visible: true,
    onClose: jest.fn(() => Promise.resolve(true)),
    coursesByStatus: {
        data: [
            {
                id: 1,
                status: 'Configuration',
                title: 'Secrets Management for your applications',
            },
        ],
        lastPage: 1,
        page: 1,
        perPage: 10,
        total: 8,
    },
};

describe('CourseStatusDrawer', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseStatusDrawer {...props} />);
    });

    it('should render CourseStatusDrawer component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render the status table with statuses successfully', () => {
        const statusTable = component.find('withStore(Table)');
        expect(statusTable.exists()).toBe(true);
        expect(statusTable.props().dataSource).toEqual(props.coursesByStatus.data);
    });

    it('should render name column with proper value successfully', () => {
        const nameColumn = component.find('Column[dataIndex="title"]');
        expect(nameColumn.exists()).toBeTruthy();
    });

    it('should render CMS column buttons column successfully', () => {
        const CMSColumn = component.find('Column[title="CMS"]');
        expect(CMSColumn.exists()).toBeTruthy();
    });
});
