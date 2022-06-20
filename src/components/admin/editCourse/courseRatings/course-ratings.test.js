import React from 'react';
import { shallow } from 'enzyme';
import CourseRatings from './course-ratings';

describe('CourseRatings', () => {
    let component; const
        props = {
            courseId: 1,
            courseRatings: [
                {
                    id: 1,
                    author_name: 'Elon Musk',
                    image: 'image_url',
                    rate: 2.5,
                    text: 'test',
                },
            ],
            fetchRatings: jest.fn(() => Promise.resolve(true)),
        };

    beforeEach(() => {
        component = shallow(<CourseRatings {...props} />);
    });

    it('should render courses-ratings component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render add rating button successfully', () => {
        const addRatingButton = component.find('Button').at(0);
        expect(addRatingButton.props().children).toBe('Add Rating');
    });

    it('should render add modal successfully', () => {
        const addRatingModal = component.find('Modal').at(0);

        expect(addRatingModal.props().title).toBe('Add Rating');
        expect(addRatingModal.props().destroyOnClose).toBeTruthy();
    });

    it('should render ratings list successfully', () => {
        const RatingsList = component.find('List').at(0);

        expect(RatingsList.props().dataSource.length).toBe(1);
    });

    it('should render autocomplete component', () => {
        const autoComplete = component.find('AutoComplete[size="large"]');
        expect(autoComplete).toBeTruthy();
    });
});
