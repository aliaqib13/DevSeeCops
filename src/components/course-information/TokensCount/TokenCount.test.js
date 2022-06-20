import React from 'react';
import { shallow } from 'enzyme';
import TokensCount from './TokensCount';

const props = {
    tokenCost: 20,
};

describe('TokenCount()', () => {
    let component;

    beforeEach(() => {
        component = shallow(<TokensCount {...props} />);
    });

    it('render the component successfully', () => {
        expect(component).toHaveLength(1);
    });
    it('render span element with number of tokens', () => {
        expect(component.props().children.type).toBe('span');
        expect(component.props().title).toBe('1 token = 5$');
        expect(component.props().children.props.children).toBe('(= 20 Tokens)');
    });
});
