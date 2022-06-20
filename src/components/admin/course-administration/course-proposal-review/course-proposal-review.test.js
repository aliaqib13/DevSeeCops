import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import CourseProposalsReview from './index';

const props = {
    courseProposalsForReview: [
        {
            id: 1,
            user_id: 2,
            course_id: 2,
            status: 'DRAFT',
            suitability_explanation: 'testing',
            course: [],
            user: [],
            terms_accepted_on: null,

        },

    ],
};

describe('CourseProposalsReview tab', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><CourseProposalsReview {...props} /></MemoryRouter>);
    });

    it('Should render course-proposals-review tab container successfully', () => {
        expect(component).toHaveLength(1);
    });

    it("Should render course-proposals-review tab's title successfully", () => {
        const courseProposalsReviewTitle = component.find('Title');
        expect(courseProposalsReviewTitle.text()).toEqual('Course Proposal Review');
    });

    it("Should render course-proposals-review table with columns's names successfully", () => {
        const courseProposalsReviewTable = component.find('table');
        expect(courseProposalsReviewTable).toHaveLength(1);

        // Check columns titles
        expect(courseProposalsReviewTable.find('.ant-table-column-title').at(0).text()).toBe('Fellow name');
        expect(courseProposalsReviewTable.find('.ant-table-column-title').at(1).text()).toBe('Title of Course');
        expect(courseProposalsReviewTable.find('.ant-table-column-title').at(2).text()).toBe('Actions');
    });

    it("Should render course-proposals-review's rows and dataSource successfully", () => {
        const courseProposalsReviewTab = component.props().children.props;
        expect(courseProposalsReviewTab.courseProposalsForReview).toEqual(props.courseProposalsForReview);
    });

    it('Should render course-proposals-review  `view` button successfully', () => {
        const viewButton = component.find('button');
        expect(viewButton.text()).toBe('View');
    });
});
