import React from 'react';
import { shallow } from 'enzyme';
import CourseInformationModal from './CourseInformationModal';
import calculatePriceFromTokens from '../../../util/calculatePriceFromTokens';
import { TOKEN_EXCHANGE } from '../../../util/constants';

const course = {
    author: 'author test',
    category: 15,
    content: 'test Content',
    exportCourseLoader: false,
    fetching: true,
    image: 'Image test',
    loading: false,
    showImagesModal: false,
    theory_duration: '15m',
    title: 'Automated DAST in CI/CD',
    type: 'standard',
    visible: true,
};
const courseData = {
    access_request: 0,

    category: {
        id: 15, name: 'Dynamic Application Security Testing', description: 'Automate blackbox testing of your deployed application.', created_at: null, updated_at: null,
    },
    category_id: 15,
    certificate_of_completion: 1,
    content: 'Content test',

    description: 'Description testing',

    id: 8,
    image: 'Image test',

    labs: [],

    old_status: 'Configuration',

    publicly_visible: 0,

    slug: 'dast-cicd',
    status: 'Desired',
    theory_duration: '15m',
    title: 'Automated DAST in CI/CD',
    token_cost: 10,
    type: 'standard',
    version: '1.0.0',

};

const props = {
    course,
    courseData,
    authorPicUrl: 'authorPic test',
    secondAuthorPicUrl: 'second author Pic test',
};

describe('CourseInformationModal', () => {
    let component;

    beforeEach(() => {
        component = shallow(<CourseInformationModal {...props} />);
    });

    it('renders component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('renders course title and content successfully', () => {
        const title = component.find('.course-information-header').find('.title');
        const content = component.find('.course-information-header').find('.content');
        expect(title.text()).toBe(course.title);
        expect(content.text()).toBe(course.content);
    });
    it('renders course overview container successfully', () => {
        const overviewDiv = component.find('.course-overview-container');
        expect(overviewDiv.find('.title').text()).toBe('Course Overview');
    });
    it('renders course price line successfully', () => {
        const overviewDiv = component.find('.course-overview-container');
        const coursePriceContainer = overviewDiv.find('.line').at(0);

        const courseCalculatedPrice = calculatePriceFromTokens(courseData.token_cost, TOKEN_EXCHANGE.USD);

        expect(coursePriceContainer.props().children[0].props.children).toBe('Course price');
        expect(coursePriceContainer.props().children[1].props.children[0]).toBe('$');
        expect(coursePriceContainer.props().children[1].props.children[1]).toBe(courseCalculatedPrice);
        expect(coursePriceContainer.props().children[1].props.children[2].props.tokenCost).toBe(courseData.token_cost);
    });
});
