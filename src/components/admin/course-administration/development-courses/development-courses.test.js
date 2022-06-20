import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { DevelopmentCourses } from './index';

const props = {
    developmentCourses: {
        total: 12,
        perPage: 10,
        page: 1,
        lastPage: 2,
        data: [
            {
                id: 1,
                status: 'Development',
                title: 'test 1',
                updated_at: '2021-10-21 09:39:31',
            },
            {
                id: 3,
                status: 'Development',
                title: 'test 2',
                updated_at: '2020-10-21 09:39:31',
            },
            {
                id: 5,
                status: 'Development',
                title: 'test 3',
                updated_at: '2019-10-21 09:39:31',
            },
        ],
    },
    getDevelopmentCourses: jest.fn(() => Promise.resolve(true)),
};

describe('DevelopmentCourses tab', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><DevelopmentCourses {...props} /></MemoryRouter>);
    });

    it('Should render DevelopmentCourses tab container successfully', () => {
        expect(component).toHaveLength(1);
    });

    it("Should render DevelopmentCourses's title successfully", () => {
        const devCoursesTitle = component.find('Title');
        expect(devCoursesTitle.text()).toEqual('Courses In Development');
    });

    it("Should render DevelopmentCourses table with columns's names successfully", () => {
        const devCoursesTable = component.find('table');
        expect(devCoursesTable).toHaveLength(1);

        expect(devCoursesTable.find('.ant-table-column-title').at(0).props().children.props.type).toBe('text');
        expect(devCoursesTable.find('.ant-table-column-title').at(0).props().children.props.placeholder).toBe('Search by Course Title');
        expect(devCoursesTable.find('.ant-table-column-title').at(1).text()).toBe('Updated On');
    });

    it("Should render DevelopmentCourses's rows and dataSource successfully", () => {
        const devCoursesTab = component.props().children.props;
        expect(devCoursesTab.developmentCourses).toEqual(props.developmentCourses);
    });

    it('Should change `search` state and call `changeSearch()` method when user search in the input field', () => {
        const wrapper = shallow(<DevelopmentCourses {...props} />);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'changeSearch');

        expect(wrapper.instance().state.search).toEqual('');
        wrapper.props().children[1].props.children[0].props.title().props.onChange({ target: { value: 'test 1' } });
        expect(wrapper.instance().state.search).toEqual('test 1');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should call `paginate()` method when user paginate through the table', () => {
        const page = 2;
        const wrapper = shallow(<DevelopmentCourses {...props} />);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'paginate');

        expect(wrapper.instance().state.currentPage).toEqual(1);
        instance.paginate(page);
        expect(wrapper.instance().state.currentPage).toEqual(2);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
