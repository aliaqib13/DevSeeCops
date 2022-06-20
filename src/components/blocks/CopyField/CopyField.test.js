import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CopyField from './CopyField';

describe('CopyField', () => {
    let component;
    const props = {
        content: {
            text: 'test',
        },
    };

    beforeEach(() => {
        component = shallow(<CopyField {...props} />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.copy-field');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should contain text which passed down by props', () => {
        const wrapper = component.find('.command-wrapper');
        expect(wrapper.text()).toBe(props.content.text);
    });

    it('Should has tooltip title "Copy to clipboard" on ClipboardButton', () => {
        const tooltip = component.find('Tooltip');
        expect(tooltip.props().title).toBe('Copy to clipboard');
    });
});
