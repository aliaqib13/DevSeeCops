import React from 'react';
import { shallow } from 'enzyme';
import SideBar from './sideBar';

describe('SideBar', () => {
    let component;
    const props = {
        sideBarContent: {
            sidebar_header: 'test',
            sidebar_content: [
                'test1',
                'test2',
                'test3',
            ],
            id: 1,
        },
    };

    beforeEach(() => {
        component = shallow(<SideBar {...props} />);
    });

    it('should render SideBar component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
});
