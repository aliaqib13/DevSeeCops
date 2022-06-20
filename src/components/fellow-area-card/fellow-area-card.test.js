import React from 'react';
import { shallow } from 'enzyme';
import FellowAreaCard from './fellow-area-card';

describe('FellowAreaCard', () => {
    let component;
    const props = {
        img: 'test-image',
        name: 'fellow-card-test',
        description: 'fellow-card description',
    };

    beforeEach(() => {
        component = shallow(<FellowAreaCard {...props} />);
    });

    it('should render Comment component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render props in the right places', () => {
        expect(component.find('.description').text()).toEqual(props.description);
        expect(component.find('.name').text()).toEqual(props.name);
        expect(component.find('.img-container').children(0).prop('src')).toBe(props.img);
    });
});
