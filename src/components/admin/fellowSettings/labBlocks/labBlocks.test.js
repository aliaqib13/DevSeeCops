import React from 'react';
import { shallow } from 'enzyme';
import LabBlocks from './labBlocks';

const labBlocks = [
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
];

describe('labBlocks', () => {
    let component;
    beforeEach(() => component = shallow(<LabBlocks labBlocks={labBlocks} />));

    it('should render labBlocks  component', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should render add lab block button', () => {
        expect(component.find('.add-lab-block-button').length).toEqual(1);
    });

    it('should render lab blocks table', () => {
        expect(component.find('.lab-blocks-table').length).toEqual(1);
    });

    it('should lab blocks table should have 3 columns', () => {
        expect(component.find('.lab-blocks-table-col').length).toEqual(3);
    });

    it('should open add lab block modal when clicks add lab blocks button', () => {
        expect(component.state().showAddModal).toEqual(false);
        component.find('.add-lab-block-button').simulate('click');
        expect(component.state().showAddModal).toEqual(true);
    });

    it('lab blocks data length should  be equal lab blocks length which comes form props', () => {
        const labBlocksData = component.find('.lab-blocks-table').props().dataSource;
        expect(labBlocksData.length).toEqual(labBlocks.length);
    });

    it('should checking the name of lab blocks in table match the name which comes from props ', () => {
        expect(component.find('withStore(Table)').props().children[0].props.render('text', labBlocks[0]).props.children).toEqual(labBlocks[0].title);
        expect(component.find('withStore(Table)').props().children[0].props.render('text', labBlocks[1]).props.children).toEqual(labBlocks[1].title);
    });

    it('should change state showAddModal option when pressing in the edit button', () => {
        expect(component.state().showAddModal).toEqual(false);
        component.find('withStore(Table)').props().children[2].props.render('labBlock', labBlocks[0], 0).props.children.props.overlay.props.children[0].props.onClick();
        expect(component.state().showAddModal).toEqual(true);
    });

    it('should open the confirm delete alert when clicks on delete button', () => {
        const spy = jest.spyOn(component.instance(), 'destroyLabBlock');
        component.find('withStore(Table)').props().children[2].props.render('fellow', labBlocks[0], 0).props.children.props.overlay.props.children[1].props.onClick();
        expect(spy).toHaveBeenCalled();
    });
});
