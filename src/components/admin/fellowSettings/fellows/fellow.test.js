import React from 'react';
import { shallow } from 'enzyme';
import Fellows from './index';

const fellows = [
    {
        id: 1,
        name: 'Fellow',
        description: 'This may sound a little confusing, given that we don’t know which format Jest uses to represent this layout',
        link: 'https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest',
        image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/fellows/aqPnGmcAla32ziPaFSWens7nOyA98uaN.png',
    },
    {
        id: 2,
        name: 'test name',
        description: 'test desc',
        link: 'https://adonisjs.com/docs/4.1/api-tests',
        image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/fellows/UBAUACux3jI76k2BGpFQQIjqvZsYPHIg.png',
    },
];

describe('Fellow', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Fellows fellows={fellows} />));

    it('should render the Fellows Component successfully', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('.add-fellow-button').length).toEqual(1);
    });

    it('should have one table for fellows there', () => {
        expect(wrapper.find('.fellows-table').length).toEqual(1);
    });

    it('table should have 5 columns', () => {
        expect(wrapper.find('.fellows-table-row').length).toEqual(5);
    });

    it('should open add fellow modal on click add Add Fellow Button', () => {
        expect(wrapper.state().fellowModal).toEqual(false);
        wrapper.find('.add-fellow-button').simulate('click');
        expect(wrapper.state().fellowModal).toEqual(true);
    });

    it('should checking that fellows cont of props equals to table rows count', () => {
        const fellowTable = wrapper.find('.fellows-table').props().dataSource;
        expect(fellowTable.length).toEqual(fellows.length);
    });

    it('should checking the name of fellows in table match the name which comes from props', () => {
        expect(wrapper.find('withStore(Table)').props().children[0].props.render('text', fellows[0]).props.children).toEqual(fellows[0].name);
        expect(wrapper.find('withStore(Table)').props().children[0].props.render('text', fellows[1]).props.children).toEqual(fellows[1].name);
    });

    it('should checking the description of fellows in the table match the description which comes from props', () => {
        expect(wrapper.find('withStore(Table)').props().children[1].props.render('text', fellows[0]).props.children).toEqual(fellows[0].description);
        expect(wrapper.find('withStore(Table)').props().children[1].props.render('text', fellows[1]).props.children).toEqual(fellows[1].description);
    });

    it('should checking the link of the fellows in the table match the link which comes from props', () => {
        expect(wrapper.find('withStore(Table)').props().children[2].props.render('text', fellows[0]).props.children).toEqual(fellows[0].link);
        expect(wrapper.find('withStore(Table)').props().children[2].props.render('text', fellows[1]).props.children).toEqual(fellows[1].link);
    });

    it('should checking the image of the fellows in the table match the image URL which comes from props', () => {
        expect(wrapper.find('withStore(Table)').props().children[3].props.render('text', fellows[0]).props.children.props.src).toEqual(fellows[0].image);
        expect(wrapper.find('withStore(Table)').props().children[3].props.render('text', fellows[1]).props.children.props.src).toEqual(fellows[1].image);
    });

    it('should change state fellowModal option when pressing in the edit button', () => {
        expect(wrapper.state().fellowModal).toEqual(false);
        wrapper.find('withStore(Table)').props().children[4].props.render('fellow', fellows[0], 0).props.children.props.overlay.props.children[0].props.onClick();
        expect(wrapper.state().fellowModal).toEqual(true);
    });

    it('should open the confirm delete alert when clicks', () => {
        const spy = jest.spyOn(wrapper.instance(), 'destroy');
        wrapper.find('withStore(Table)').props().children[4].props.render('fellow', fellows[0], 0).props.children.props.overlay.props.children[1].props.onClick();
        expect(spy).toHaveBeenCalled();
    });

    it('when press edit button of some fellows should, update state to editFellow object', () => {
        expect(wrapper.state().editFellow.name).toEqual('');
        expect(wrapper.state().editFellow.description).toEqual('');
        expect(wrapper.state().editFellow.link).toEqual('');
        expect(wrapper.state().editFellow.image).toEqual(null);
        wrapper.find('withStore(Table)').props().children[4].props.render('fellow', fellows[0], 0).props.children.props.overlay.props.children[0].props.onClick();
        expect(wrapper.state().editFellow.name).toEqual(fellows[0].name);
        expect(wrapper.state().editFellow.description).toEqual(fellows[0].description);
        expect(wrapper.state().editFellow.link).toEqual(fellows[0].link);
        expect(wrapper.state().editFellow.image).toEqual(fellows[0].image);
        wrapper.find('withStore(Table)').props().children[4].props.render('fellow', fellows[1], 1).props.children.props.overlay.props.children[0].props.onClick();
        expect(wrapper.state().editFellow.name).toEqual(fellows[1].name);
        expect(wrapper.state().editFellow.description).toEqual(fellows[1].description);
        expect(wrapper.state().editFellow.link).toEqual(fellows[1].link);
        expect(wrapper.state().editFellow.image).toEqual(fellows[1].image);
    });

    it('should be called close modal function when clicked on the cancel button', () => {
        const spy = jest.spyOn(wrapper.instance(), 'closeModal');
        wrapper.find('.add-fellow-button').simulate('click');
        const fellowsModal = wrapper.find('.settings-fellow-modal');
        fellowsModal.props().footer[0].props.onClick();
        expect(spy).toHaveBeenCalled();
    });

    it('should return initial state when calls the closeModal function ', () => {
        wrapper.find('withStore(Table)').props().children[4].props.render('fellow', fellows[0], 0).props.children.props.overlay.props.children[0].props.onClick();
        expect(wrapper.state().editFellow.name).toEqual(fellows[0].name);
        expect(wrapper.state().editFellow.description).toEqual(fellows[0].description);
        expect(wrapper.state().editFellow.link).toEqual(fellows[0].link);
        expect(wrapper.state().editFellow.image).toEqual(fellows[0].image);
        wrapper.find('.settings-fellow-modal').props().footer[0].props.onClick();
        expect(wrapper.state().fellowModal).toEqual(false);
        expect(wrapper.state().uploadLoading).toEqual(false);
        expect(wrapper.state().loading).toEqual(false);
        expect(wrapper.state().editFellow.name).toEqual('');
        expect(wrapper.state().editFellow.description).toEqual('');
        expect(wrapper.state().editFellow.link).toEqual('');
        expect(wrapper.state().editFellow.image).toEqual(null);
    });
});
