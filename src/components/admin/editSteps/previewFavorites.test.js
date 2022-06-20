import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PreviewFavorites from './previewFavorites';

describe('previewFavorites', () => {
    let component; const
        props = {
            content: {
                type: 'GreyBox',
                content: {
                    text: [
                        '<p>test test</p>',
                    ],
                    titles: [
                        'grey box',
                    ],
                },
            },
            visible: true,
        };

    beforeEach(() => {
        component = shallow(<PreviewFavorites {...props} />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.preview-favorites-modal');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should render component which passed down by props', () => {
        const componentType = props.content.type;
        const savedComponent = component.find(componentType);
        expect(savedComponent.exists()).toBeTruthy();
    });

    it('Should render savedComponent with proper content', () => {
        const componentType = props.content.type;
        const savedComponent = component.find(componentType);
        expect(savedComponent.props().block).toBe(props.content);
    });
});
