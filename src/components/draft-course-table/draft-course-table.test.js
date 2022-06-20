import React from 'react';
import { shallow } from 'enzyme';
import DraftCourseTable from './DraftCourseTable';

describe('Courses Grid', () => {
    let component;
    const props = {
        categories: [],
        draft: [],
        saveDrafts: jest.fn(() => Promise.resolve(true)),
        getCourseRequiredFields: jest.fn(() => Promise.resolve(true)),
        createCourse: jest.fn(() => Promise.resolve(true)),
        user_id: 5,
        fellowName: 'Sarah Polan',
        submitDrafts: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<DraftCourseTable {...props} />);
        component.instance().setState({
            GD: [
                {
                    id: 2,
                    name: '<p>Choose the DevSecOps Category</p>',
                    type: 'dropdown',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: 'category',
                    draftCourse: { field_id: 2, value: 'Infra as Code' },
                },
                {
                    id: 3,
                    name: '<p>What is the course name?</p>',
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: 'title',
                    draftCourse: { field_id: 3, value: 'Test' },
                },
                {
                    id: 4,
                    name: '<p>What is the name of the course-owner?</p>',
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 0,
                    course_column: null,
                    draftCourse: null,
                },
                {
                    id: 5,
                    name: '<p>What is the LinkedIn profile of the course-owner?<p/>',
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: 'linkedIn_url',
                    draftCourse: { field_id: 5, value: 'test' },
                },
                {
                    id: 6,
                    name: '<p>Describe in order the steps and exercises that the user will complete in the hands-on lab </p>',
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: null,
                    draftCourse: { field_id: 6, value: 'test' },
                },
                {
                    id: 7,
                    name: `<p>What are the hands-on lab resources that you will need?<br />
                            For instance: an AWS account, Cloud Custodian  </p>`,
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: null,
                    draftCourse: { field_id: 7, value: 'Test' },
                },
                {
                    id: 8,
                    name: `<p>If you want to spin up Gitlab, what will be in it?  <br />
                            For instance : A Terraformscript for generating an EC2 VM </p>`,
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: null,
                    draftCourse: { field_id: 8, value: 'test' },
                },
                {
                    id: 9,
                    name: `<p>What are the learning objectives?  <br />
                            For instance   <br />
                            The user will learn how to integrate Cloud Custodian into a CI/CD pipeline   <br />
                            The user will learn about common serious EC2 misconfigurations, solve and monitor them</p>`,
                    type: 'text',
                    category: 'Generic Description',
                    is_required: 1,
                    course_column: 'will_learn',
                    draftCourse: { field_id: 9, value: ['test'] },
                },
            ],
            CC: [
                {
                    category: 'Course Categorisation',
                    draftCourse: { field_id: 10, value: 'test' },
                    id: 10,
                    name: 'Course name',
                    type: 'text',
                },
            ],
            UseCase: [
                {
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 11,
                        value: 'test',
                    },
                    id: 11,
                    name: `<p>Give a short general description of the content that you will be teaching in the course  <br />
                        Example: “This course shows checking on misconfigurations in creating an EC2 VM can be effectively automated" </p>`,
                    type: 'text',
                    course_column: 'description',
                },
                {
                    name: `<p>What are all the DevSecOps benefits of this course? Why is this worth teaching the user?  <br />
                    Example:  By adding efficient assurance this helps to build trust and is enhancing the case for deployment automation </p>`,
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 12,
                        value: 'test',
                    },
                    id: 12,
                },
                {
                    name: '<p>Why do you like to collaborate to build specifically THIS course ?</p>',
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 13,
                        value: 'test',
                    },
                    id: 13,
                },
                {
                    name: `<p>In your course, which object in the DevOps chain will you be focusing on that can have a problem
                        (that you will teach the user how to avoid / solve)?  <br />
                        Example: an AWS EC2 MV </p>`,
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 14,
                        value: 'test',
                    },
                    id: 14,
                },
                {
                    name: `<p>What at type of vulnerabilities will the user be fixing ? <br />
                        Example : misconfigurations </p>`,
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 15,
                        value: 'test',
                    },
                    id: 15,
                },
                {
                    name: `<p>What tool is used to detect the problem? <br />
                        Example : Cloud Custodian </p>`,
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 16,
                        value: 'test',
                    },
                    id: 16,
                },
                {
                    name: `<p>How will the user verify the solution to this problem?  <br />
                        Example : By re-running the pipeline </p>`,
                    type: 'text',
                    category: 'Use Case',
                    draftCourse: {
                        field_id: 16,
                        value: 'test',
                    },
                    id: 16,
                },
            ],
            requiredFields: [2, 3, 5, 9, 11],
            saveCourseLoader: false,
        });
    });

    it('should render draft course table component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render buttons successfully', () => {
        expect(component.find('Button')).toHaveLength(4);
    });

    it('should render draft-save-button with proper text successfully', () => {
        const saveBtn = component.find('.draft-button').at(0);
        expect(saveBtn.exists()).toBeTruthy();
        expect(saveBtn.props().children).toBe('Save Drafts');
    });

    it('should render submit-button with proper text successfully', () => {
        const submitBtn = component.find('.draft-button').at(1);
        expect(submitBtn.exists()).toBeTruthy();
        expect(submitBtn.props().children).toBe('Submit');
    });

    it('should call saveDrafts method when drafts saved', () => {
        const saveBtn = component.find('.draft-button').at(0);
        saveBtn.props().onClick();
        expect(props.saveDrafts).toBeCalledTimes(1);
    });

    it('should render Status draft course with proper Title successfully', () => {
        const descriptionText = component.find('.descriptionText');
        const title = descriptionText.find('Title');
        expect(descriptionText.exists()).toBeTruthy();
        expect(title.exists()).toBeTruthy();
        expect(title.props().children).toBe('Free input field for notes.');
    });

    it('should render use case container with proper title successfully', () => {
        const useCaseContainer = component.find('.use-case-container');
        const tableTitle = useCaseContainer.find('.table-title');
        const title = tableTitle.find('Title');
        expect(useCaseContainer.exists()).toBeTruthy();
        expect(title.exists()).toBeTruthy();
        expect(title.props().children).toBe('Describe the Use Case to explain "Why this course"?');
    });

    it('should render Table for useCase with proper dataSource', () => {
        const useCaseContainer = component.find('.use-case-container');
        const table = useCaseContainer.find('withStore(Table)');
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource).toEqual(component.instance().state.UseCase);
    });

    it('should render UseCase title column with proper name successfully', () => {
        const useCaseContainer = component.find('.use-case-container');
        const table = useCaseContainer.find('withStore(Table)');
        const column = table.find('Column').at(0);
        expect(column.exists()).toBeTruthy();
    });

    it('should render generic description container with proper title successfully', () => {
        const GDContainer = component.find('.generic-description-container');
        const tableTitle = GDContainer.find('.table-title');
        const title = tableTitle.find('Title');
        expect(GDContainer.exists()).toBeTruthy();
        expect(title.exists()).toBeTruthy();
        expect(title.props().children).toBe('Generic Description');
    });

    it('should render Table for Generic Description with proper dataSource', () => {
        const GDContainer = component.find('.generic-description-container');
        const table = GDContainer.find('withStore(Table)');
        expect(table.exists()).toBeTruthy();
        expect(table.props().dataSource).toEqual(component.instance().state.GD);
    });

    it('should render Generic description title column with proper name successfully', () => {
        const GDContainer = component.find('.generic-description-container');
        const table = GDContainer.find('withStore(Table)');
        const column = table.find('Column').at(0);
        expect(column.exists()).toBeTruthy();
    });

    it('should render clear button with proper text successfully', () => {
        const clearBtn = component.find('.draft-button').at(2);
        expect(clearBtn.exists()).toBeTruthy();
        expect(clearBtn.props().children).toBe('Clear');
    });

    it('should render create course button with proper text successfully', () => {
        const createCourseBtn = component.find('.draft-button').at(3);
        expect(createCourseBtn.exists()).toBeTruthy();
        expect(createCourseBtn.props().children).toBe('Create Course');
    });
});
