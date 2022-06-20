import React from 'react';
import { shallow } from 'enzyme';
import FellowCard from './fellow-card';

describe('FellowCard', () => {
    let component;
    const props = {
        img: 'test-image',
        name: 'fellow-card-test',
        description: 'fellow-card description',
        link: 'www.linkto.fellow',
    };

    beforeEach(() => {
        component = shallow(<FellowCard {...props} />);
    });

    it('should render Comment component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render props in the right places', () => {
        expect(component.find('.description').text()).toEqual(props.description);
        expect(component.find('.name').text()).toEqual(props.name);
        expect(component.find('.img-container').children(0).prop('href')).toBe(props.link);
        expect(component.find('.img-container').children(0).children(0).prop('src')).toBe(props.img);
    });
});
