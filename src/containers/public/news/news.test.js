import React from 'react';
import { shallow } from 'enzyme';
import { News } from './news';
import NewsFromDevSecOps from '../../../components/public/news/newsFromDevSecOps';

describe('News Page', () => {
    let component;
    const news = {
        loaded: false,
        academyNews: ' ',
        communityNews: ' ',
    };
    const props = {
        fetchNews: async () => news,
        news,
    };
    beforeEach(() => {
        component = shallow(<News {...props} />);
    });

    it('renders the `NewsFromDevSecOps` component when loading is finished', () => {
        component.setState({ loaded: true });
        expect(component.find(NewsFromDevSecOps).length).toBe(1);
    });
    it('does not render any elements before loading has completed', () => {
        component.setState({ loaded: false });
        expect(component.find(NewsFromDevSecOps).length).toBe(0);
    });
});
