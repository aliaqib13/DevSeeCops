import React from 'react';
import { shallow } from 'enzyme';
import { SectionNews } from './SectionNews';

describe('SectionNews', () => {
    const props = {
        history: { push: jest.fn(() => Promise.resolve(true)) },
        news: {
            academyNews: [{
                title: 'test title',
                slug: 'test slug',
                image: 'test image',
            }],
            communityNews: [{
                title: 'test title',
                slug: 'test slug',
                image: 'test image',
            }],
        },
    };
    let component;
    beforeEach(() => {
        component = shallow(
            <SectionNews {...props} />,
        );
    });

    it('should render SectionNews component successfully', () => {
        expect(component.exists()).toBeTruthy();
        expect(component).toHaveLength(1);
    });

    it('should render section with classname `news container` and id `news` successfully', () => {
        const news = component.find('#news');
        expect(news.length).toEqual(1);
        const newsProps = news.props();
        expect(newsProps.className).toBe('news container');
        expect(newsProps.id).toBe('news');
    });

    it('should render `Academy news` successfully', () => {
        const news = component.find('#news');
        const academyNews = news.props().children[0].props.children[0].props.children[0].props.children;
        expect(academyNews).toBe('Academy news');
    });

    it('should render academy news carousel title successfully', () => {
        const titleBlock = component.find('.overlay').at(0);
        const title = titleBlock.props().children.props.children;
        expect(title).toBe(props.news.academyNews[0].title);
    });

    it("academyNewsImage click should call history.push() with '/news/post/encodeURIComponent(slug)'", () => {
        const newsImgBlock = component.find('.news-img-block').at(0);
        const { slug } = props.news.academyNews[0];
        newsImgBlock.simulate('click');
        expect(props.history.push).toHaveBeenCalledWith(`/news/post/${encodeURIComponent(slug)}`);
    });

    it('should render `Community News` successfully', () => {
        const news = component.find('#news');
        const communityNews = news.props().children[0].props.children[1].props.children[0].props.children;
        expect(communityNews).toBe('Community News');
    });

    it('should render community news carousel title successfully', () => {
        const titleBlock = component.find('.overlay').at(1);
        const title = titleBlock.props().children.props.children;
        expect(title).toBe(props.news.communityNews[0].title);
    });

    it("communityNewsImage click should call history.push() with '/news/post/encodeURIComponent(slug)'", () => {
        const newsImgBlock = component.find('.news-img-block').at(1);
        const { slug } = props.news.communityNews[0];
        newsImgBlock.simulate('click');
        expect(props.history.push).toHaveBeenCalledWith(`/news/post/${encodeURIComponent(slug)}`);
    });
});
