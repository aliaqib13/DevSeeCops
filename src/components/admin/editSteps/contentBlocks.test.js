import React from 'react';
import { shallow } from 'enzyme';
import ContentBlocks from './contentBlocks';

const props = {
    onChangeState: jest.fn(),
    blocks: [
        {
            id: 1,
            type: 'SingleText',
            content: {
                text: '<p>test single text</p>',
            },
        },
        {
            id: 2,
            type: 'InformationBox',
            content: {
                titles: [
                    'test information title',
                ],
                text: [
                    '<p>test information</p>',
                ],
            },
        },
    ],
    favorites: [
        {
            user_id: 4,
            title: 'grey box',
            component: {
                type: 'GreyBox',
                content: {
                    titles: [
                        'grey box',
                    ],
                    text: [
                        '<p>test test</p>',
                    ],
                },
            },
            id: 20,
        },
        {
            user_id: 4,
            title: 'single text',
            component: {
                type: 'SingleText',
                content: {
                    text: '<p>test</p>',
                },
            },
            id: 19,
        },
    ],
    fetchFavoriteComponents: jest.fn(),
    learningPaths: [
        {
            id: 1,
            title: 'Test title',
        },
    ],
};

describe('ContentBlocks', () => {
    let component;

    beforeEach(() => {
        component = shallow(<ContentBlocks {...props} />);
    });

    it('Should render buttons for opening saved components modal', () => {
        const topBtn = component.find('.add-saved-component-btn-top');
        const bottomBtn = component.find('.add-saved-component-btn-bottom');
        expect(topBtn.exists()).toBeTruthy();
        expect(bottomBtn.exists()).toBeTruthy();
    });

    it('Should open saved components modal when clicked on add saved component button', () => {
        const button = component.find('.add-saved-component-btn-top');
        button.simulate('click');
        const modal = component.find('Modal.stored-components-modal');
        expect(modal.props().visible).toBeTruthy();
    });

    it('Should render table within modal for saved components', () => {
        const modal = component.find('Modal.stored-components-modal');
        const table = modal.find('withStore(Table)');
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource).toBe(props.favorites);
    });

    it('Should change content blocks successfully', () => {
        const instance = component.instance();
        instance.onChangeBlock({
            type: 'SingleText',
            id: 1,
            content: {
                text: '<p>changed single text</p>',
            },
        }, 0);

        // called onChangeState and
        expect(props.onChangeState).toBeCalled();
    });
});
