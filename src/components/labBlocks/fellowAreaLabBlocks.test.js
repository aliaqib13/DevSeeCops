import React from 'react';
import { shallow } from 'enzyme';
import LabBlocks from './labBlocks';

describe('Fellow Area Lab Blocks', () => {
    let component;
    beforeEach(() => component = shallow(<LabBlocks />));

    it('should render lab blocks component', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should render AutoComplete Component', () => {
        expect(component.find('AutoComplete').exists()).toEqual(true);
    });

    it('should render Lab Blocks Title  in Fellow Area Lab Component', () => {
        const titleBlock = component.find('.fellow-lab-blocks-title').find('Title');
        expect(titleBlock.props().children).toEqual('Find and select your course');
    });
});
