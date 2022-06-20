import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { ProposalReview } from './ProposalReview';

const props = {
    courseProposalById: {
        id: 2,
        user_id: 2,
        course_id: 2,
        status: 'DRAFT',
        suitability_explanation: 'Testing Explanation',
        course: {
            id: 2,
            title: 'test title',
        },
        user: {
            firstname: 'firstNameTest',
            lastname: 'lastNameTest',
        },

        terms_accepted_on: null,
    },
    courseProposalByIdFiles: ['videoFile', 'zipFile'],
    match: { params: { id: 2 } },
    getCourseProposalById: jest.fn(() => Promise.resolve(true)),
    listCourseProposalFiles: jest.fn(() => Promise.resolve(true)),
    downloadCourseProposalFile: jest.fn(() => Promise.resolve(true)),
    courseProposalAcceptance: jest.fn(() => Promise.resolve(true)),
    proposalAcceptance: jest.fn(() => Promise.resolve(true)),
};

describe('ProposalReview Page', () => {
    let component;

    beforeEach(() => {
        component = mount(<MemoryRouter><ProposalReview {...props} /></MemoryRouter>);
    });

    it('Should render proposal-review container successfully', () => {
        expect(component).toHaveLength(1);
        expect(component.html()).toContain('Course Proposal');
    });
    it('Should call `getCourseProposalById` and `listCourseProposalFiles` in componentDidMount', () => {
        const wrapper = shallow(<ProposalReview {...props} />, { disableLifecycleMethods: true });
        const instance = wrapper.instance();
        const compDidMountSpy = jest.spyOn(instance, 'componentDidMount');

        instance.componentDidMount();
        expect(compDidMountSpy).toHaveBeenCalled();
        expect(props.getCourseProposalById).toHaveBeenCalled();
        expect(props.listCourseProposalFiles).toHaveBeenCalled();
    });

    it('Should render `Loading` component if the courseProposal data is empty ', () => {
        const props = {
            courseProposalById: {},
            match: { params: { id: 2 } },
            getCourseProposalById: jest.fn(() => Promise.resolve(true)),
            listCourseProposalFiles: jest.fn(() => Promise.resolve(true)),

        };
        const component = mount(<MemoryRouter><ProposalReview {...props} /></MemoryRouter>);

        expect(component).toHaveLength(1);
        expect(component.text()).toEqual('Loading...');
    });

    it("Should render proposal-review's title successfully", () => {
        const proposalReviewTitle = component.find('Title');
        expect(proposalReviewTitle.text()).toEqual(`Course Proposal Review No.${props.courseProposalById.id}`);
    });

    it("Should render proposal-review's dividers with its titles and contents successfully", () => {
        const proposalReviewDivider = component.find('Divider');
        expect(proposalReviewDivider.at(0)).toHaveLength(1);
        expect(proposalReviewDivider.at(0).text()).toEqual('Course Title :');
        expect(proposalReviewDivider.at(1)).toHaveLength(1);
        expect(proposalReviewDivider.at(1).text()).toEqual('Fellow Name :');
        expect(proposalReviewDivider.at(2)).toHaveLength(1);
        expect(proposalReviewDivider.at(2).text()).toEqual('Suitability Explanation :');
        expect(proposalReviewDivider.at(3)).toHaveLength(1);
        expect(proposalReviewDivider.at(3).text()).toEqual('Proof of Concept files :');
        expect(proposalReviewDivider.at(4)).toHaveLength(1);
        expect(proposalReviewDivider.at(4).text()).toEqual('');
        expect(proposalReviewDivider.at(5)).toHaveLength(1);
        expect(proposalReviewDivider.at(5).find('button')).toHaveLength(2);
        expect(proposalReviewDivider.at(5).find('button').at(0).text()).toEqual('Approve');
        expect(proposalReviewDivider.at(5).find('button').at(1).text()).toEqual('Reject');
        expect(proposalReviewDivider.at(6)).toHaveLength(1);
        expect(proposalReviewDivider.at(6).text()).toEqual('');
    });

    it('Should render `toggleEmailModal()` when click on reject button successfully ', () => {
        const wrapper = shallow(<ProposalReview {...props} />);
        const rejectButton = wrapper.find('.reject-btn');

        expect(wrapper.instance().state.rejectReasonModal).toBe(false);
        expect(wrapper.instance().state.reasonRejectCourseProposal).toBe('');

        rejectButton.props().onClick();
        expect(wrapper.instance().state.rejectReasonModal).toBe(true);
        expect(wrapper.instance().state.reasonRejectCourseProposal).toBe('The rejection reason is that ...');

        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'toggleEmailModal');
        instance.toggleEmailModal();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should call `confirmRejectCourseProposal()` successfully', () => {
        const wrapper = shallow(<ProposalReview {...props} />);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'confirmRejectCourseProposal');
        instance.confirmRejectCourseProposal();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should render details of course proposal successfully', () => {
        const proposalReview = component.props().children.props;
        expect(proposalReview.courseProposalById).toEqual(props.courseProposalById);
    });

    it('Should render all details of course proposal successfully', () => {
        const proposalContents = component.find('Col');
        expect(proposalContents.at(0).props().children.props.to).toEqual(`/course-information/${props.courseProposalById.course_id}`);
        expect(proposalContents.at(0).props().children.props.children).toEqual('test title');
        expect(proposalContents.at(1).props().children.props.to).toEqual(`/platform/admin/user-statistics/${props.courseProposalById.user_id}`);
        expect(proposalContents.at(1).props().children.props.children[0]).toEqual(props.courseProposalById.user.firstname);
        expect(proposalContents.at(1).props().children.props.children[1]).toEqual(props.courseProposalById.user.lastname);
        expect(proposalContents.at(2).props().children).toEqual(props.courseProposalById.suitability_explanation);

        const proofOfConceptAnchor = proposalContents.find('Anchor');
        expect(proofOfConceptAnchor.props().children[0].props.title).toBe('videoFile');
        expect(proofOfConceptAnchor.props().children[1].props.title).toBe('zipFile');
    });

    it('Should call `downloadCourseProposalFile` when `Proof of concept` files are clicked', () => {
        // Arrange
        const wrapper = shallow(<ProposalReview {...props} />);
        const proofOfConceptAnchor = wrapper.find('Col').find('Anchor').props();

        const preventDefault = jest.fn();

        // Act
        proofOfConceptAnchor.onClick({ preventDefault }, props.courseProposalByIdFiles[0]);

        // Assert
        expect(props.downloadCourseProposalFile).toHaveBeenCalled();
        expect(props.downloadCourseProposalFile).toHaveBeenCalledTimes(1);
    });

    it('Should courseProposalAcceptance() work successfully', async () => {
        const data = {
            ...props.courseProposalById,
            status: 'APPROVED',
        };
        const testId = 1;
        const testProps = {
            ...props,
            courseProposalById: data,
            match: { params: { id: testId } },
            proposalAcceptance: jest.fn(() => Promise.resolve({ data: { courseProposal: data } })),
        };
        const wrapper = shallow(<ProposalReview {...testProps} />);

        const instance = wrapper.instance();
        await instance.courseProposalAcceptance();

        expect(testProps.proposalAcceptance).toBeCalledWith({ id: testId });
        expect(wrapper.state('isApproved')).toBeTruthy();
    });
});
