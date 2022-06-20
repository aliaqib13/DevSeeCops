import React from 'react';
import { shallow } from 'enzyme';
import { AddCourse } from './AddCourse';
import { COURSE_TYPE } from '../../../../constants';

const testForm = {
    getFieldDecorator: jest.fn(opts => c => c),
};

const props = {
    categories: [
        {
            id: 1,
        },
        {
            id: 2,

        },

    ],
    isAdmin: true,
    is_template: false,
    exportCourseData: jest.fn(() => Promise.resolve({ course })),
    courseTemplates: [
        {
            id: 16,
            title: 'Golden Standard Course',
        },
    ],
    form: testForm,
    courseTypes: Object.values(COURSE_TYPE),
    createCourse: jest.fn(() => Promise.resolve(true)),
    selectCategory: jest.fn(),
    addNewCategory: jest.fn(() => Promise.resolve(true)),
    uploadVideo: jest.fn(() => Promise.resolve(true)),
};

const createCourseKeys = ['title',
    'content',
    'image',
    'category',
    'description',
    'theory_duration',
    'token_cost',
    'slug',
    'preview_video',
    'author',
    'version',
    'difficulty',
    'cert_badge',
    'will_learn',
    'course_is_for',
    'required_exp',
    'version_date',
    'value_rating',
    'number_of_ratings',
    'enrolled_students',
    'certificate_of_completion',
    'lab_steps_in_personal_archive',
    'is_template',
    'author_bio',
    'linkedIn_url',
    'publicly_visible',
    'tools_used',
    'updatedTags',
    'template_id',
    'access_request',
    'second_author_bio',
    'second_author',
    'second_linkedIn_url',
    'type'];

describe('AddCourse', () => {
    let descriptionGroupDiv; let component;

    beforeEach(() => {
        component = shallow(<AddCourse {...props} />);
        descriptionGroupDiv = component.find('.courseDescriptionContainerGroup');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render add-course container successfully', () => {
        const addCourseContainer = component.find('.addCourse');
        expect(addCourseContainer).toHaveLength(1);
    });

    it('should render `select Category` label successfully ', () => {
        const selectCategoryDiv = component.find('.categorySelect');
        expect(selectCategoryDiv.props().children[0].type).toBe('span');
        expect(selectCategoryDiv.props().children[0].props.children).toBe('Select Category');
    });

    it('should render `select Category` group options successfully ', () => {
        const selectCategoryDiv = component.find('.categorySelect');
        expect(selectCategoryDiv.props().children[1].props.value).toBe('Category');
        const categoryOptions = selectCategoryDiv.find('Option');
        expect(categoryOptions).toHaveLength(props.categories.length);
    });

    it('should render and change state value when change value of `select Category` options ', () => {
        const selectCategory = component.find('Select');
        expect(component.state().category).toEqual('Category');
        selectCategory.at(0).simulate('change', 'Secrets Management');
        expect(component.state().category).toEqual('Secrets Management');
    });
    it('should render `Add Category` click choice successfully', () => {
        const selectCategoryDiv = component.find('[data-testid="categorySelect"]');
        const imageAddCategory = selectCategoryDiv.find('img');
        expect(imageAddCategory.props().src).toBe('/img/add.svg');
        expect(selectCategoryDiv.text()).toBe('Add Category');
    });

    it('should render `Add Category` Input field when click on `Add category` choice', () => {
        const selectCategoryDiv = component.find('.categorySelect');

        expect(component.state().showAddCategory).toBe(false);
        expect(component.find('.addCategoryNameForm')).toHaveLength(0);
        selectCategoryDiv.props().children[2].props.children[0].props.children.props.children[1].props.onClick();

        expect(component.state().showAddCategory).toBe(true);
        expect(component.find('.addCategoryNameForm')).toHaveLength(1);

        const inputField = component.find('.addCategoryNameForm').find('Input');
        expect(inputField.props().name).toBe('new_category');
        expect(inputField.props().type).toBe('text');

        const addCancelButtons = component.find('.addCategoryNameForm').find('Button');
        expect(addCancelButtons.at(0).props().children).toBe('Cancel');
        expect(addCancelButtons.at(1).props().children).toBe('Create');
    });

    it('should call `addCategory` Method when adding a new category names ', () => {
        const selectCategoryDiv = component.find('[data-testid="addCategorySelect"]');
        selectCategoryDiv.props().onClick();

        const createButton = component.find('.addCategoryNameForm').find('Button').at(1);
        expect(component.state().createCategoryLoading).toBe(false);
        createButton.props().onClick();
        expect(component.state().createCategoryLoading).toBe(true);
        expect(props.addNewCategory).toHaveBeenCalledTimes(1);
    });

    it('should render lab steps in personal archive toggle successfully', () => {
        const lab_steps_in_personal_archive = component.find('.lab_steps_in_personal_archive');
        expect(lab_steps_in_personal_archive.exists()).toBeTruthy();
    });

    it('should render select category section', () => {
        const categorySelect = component.find('.categorySelect');
        expect(categorySelect.exists()).toBeTruthy();
    });

    it('should render select course template section successfully', () => {
        const addTemplateCourse = component.find('.addTemplateCourse');
        expect(addTemplateCourse).toHaveLength(1);
    });
    it('should render  select course template label successfully', () => {
        const addTemplateCourse = component.find('.addTemplateCourse');
        expect(addTemplateCourse.props().children[0].type).toBe('span');
        expect(addTemplateCourse.props().children[0].props.children).toBe('Select Course Template');
    });

    it('should render  select-course-template SelectTag and options successfully', () => {
        const addTemplateCourse = component.find('.addTemplateCourse');
        const selectTag = addTemplateCourse.find('Select');
        expect(selectTag.props().value).toBe('Select Golden Standard Templates');
        const options = selectTag.find('Option');
        expect(options.props().value).toBe(props.courseTemplates[0].id);
        expect(options.props().children.props.children).toBe(props.courseTemplates[0].title);
    });

    it('should render select-course-type section', () => {
        const selectCourseType = component.find('.selectCourseType');
        expect(selectCourseType).toHaveLength(1);
    });

    it('should render select-course-type label successfully', () => {
        const selectCourseType = component.find('.selectCourseType');
        expect(selectCourseType.props().children[0].type).toBe('span');
        expect(selectCourseType.props().children[0].props.children).toBe('Select Course Types');
    });

    it('should render select-course-type Select Options successfully', () => {
        const selectCourseType = component.find('.selectCourseType');
        const selectTag = selectCourseType.find('Select');
        expect(selectTag.props().value).toBe('');
        const options = selectTag.find('Option');
        expect(options).toHaveLength(props.courseTypes.length);
    });

    it('should render course-name section', () => {
        const courseNameDiv = component.find('[data-testid="courseName"]');
        expect(courseNameDiv).toHaveLength(1);
    });
    it('should render course-name Label and Input field successfully', () => {
        const courseNameDiv = component.find('[data-testid="courseName"]');
        expect(courseNameDiv.props().children[0].type).toBe('span');
        expect(courseNameDiv.props().children[0].props.children).toBe('Course name');
        const inputField = courseNameDiv.find('Input');
        expect(inputField.props().name).toBe('title');
        expect(inputField.props().placeholder).toBe('Course name');
    });
    it('should change the `title` state when change input of `course-title` successfully', () => {
        const inputField = component.find('[data-testid="courseName"]').find('Input');
        expect(component.state().title).toBe('');
        inputField.at(0).simulate('change', { target: { name: 'title', value: 'testTitle' } });
        expect(component.state().title).toBe('testTitle');
    });

    it('should render course-slug section', () => {
        const courseSlugDiv = component.find('[data-testid="courseSlug"]');
        expect(courseSlugDiv).toHaveLength(1);
    });
    it('should render course-slug Label and Input field successfully', () => {
        const courseSlugDiv = component.find('[data-testid="courseSlug"]');
        expect(courseSlugDiv.props().children[0].type).toBe('span');
        expect(courseSlugDiv.props().children[0].props.children).toBe('Course slug');
        const inputField = courseSlugDiv.find('Input');
        expect(inputField.props().name).toBe('slug');
        expect(inputField.props().placeholder).toBe('Course slug');
    });
    it('should change the `slug` state when change input of `course-slug` successfully', () => {
        const inputField = component.find('[data-testid="courseSlug"]').find('Input');
        expect(component.state().slug).toBe('');
        inputField.at(0).simulate('change', { target: { name: 'slug', value: 'slugName' } });
        expect(component.state().slug).toBe('slugName');
    });
    it('should render `theory-duration` section', () => {
        const theoryDurationDiv = component.find('[data-testid="theoryDuration"]');
        expect(theoryDurationDiv).toHaveLength(1);
    });
    it('should render theory-duration Label and Input field successfully', () => {
        const theoryDurationDiv = component.find('[data-testid="theoryDuration"]');
        expect(theoryDurationDiv.props().children[0].type).toBe('span');
        expect(theoryDurationDiv.props().children[0].props.children).toBe('Theory duration /min');
        const inputField = theoryDurationDiv.find('Input');
        expect(inputField.props().name).toBe('theory_duration');
        expect(inputField.props().placeholder).toBe('Theory duration');
    });
    it('should change the `theory_duration` state when change input of `theory-duration` successfully', () => {
        const inputField = component.find('[data-testid="theoryDuration"]').find('Input');
        expect(component.state().theory_duration).toBe('');
        inputField.at(0).simulate('change', { target: { name: 'theory_duration', value: 'theoryDurationTest' } });
        expect(component.state().theory_duration).toBe('theoryDurationTest');
    });

    it("should render course content's Label", () => {
        const subtitleDiv = component.find('.courseDescriptionContainer').at(0);
        expect(subtitleDiv.props().children[0].type).toBe('span');
        expect(subtitleDiv.props().children[0].props.children).toBe('Subtitle description');
    });
    it('should render course content', () => {
        const subtitleInput = component.find('TextArea[name="content"]');
        expect(subtitleInput).toHaveLength(1);
        expect(subtitleInput.props().name).toBe('content');
        expect(component.state().content).toBe('');
        subtitleInput.at(0).simulate('change', { target: { name: 'content', value: 'SubtitleTest' } });
        expect(component.state().content).toBe('SubtitleTest');
    });

    it("should render course Course description's Label", () => {
        const descriptionDiv = component.find('.courseDescriptionContainer').at(1);
        expect(descriptionDiv.props().children[0].type).toBe('span');
        expect(descriptionDiv.props().children[0].props.children).toBe('Course description');
    });
    it('should render course Course description', () => {
        const descriptionInput = component.find('TextArea[name="description"]');
        expect(descriptionInput).toHaveLength(1);
        expect(descriptionInput.props().name).toBe('description');
        expect(component.state().description).toBe('');
        descriptionInput.at(0).simulate('change', { target: { name: 'description', value: 'Description Content Test' } });
        expect(component.state().description).toBe('Description Content Test');
    });

    it('should render course-preview-url with Label and Input field successfully', () => {
        const coursePreviewUrlDiv = component.find('[data-testid="coursePreviewUrl"]');
        expect(coursePreviewUrlDiv).toHaveLength(1);
        expect(coursePreviewUrlDiv.props().children[0].type).toBe('span');
        expect(coursePreviewUrlDiv.props().children[0].props.children).toBe('Course Preview url');
        const inputField = coursePreviewUrlDiv.find('Input');
        expect(inputField.props().name).toBe('preview_video');
        expect(inputField.props().placeholder).toBe('Course Preview url');
    });
    it('should change the `preview_video` state when change input of `course-preview-url` successfully', () => {
        const inputField = component.find('[data-testid="coursePreviewUrl"]').find('Input');
        expect(component.state().preview_video).toBe('');
        inputField.at(0).simulate('change', { target: { name: 'preview_video', value: 'test course preview url ' } });
        expect(component.state().preview_video).toBe('test course preview url ');
    });
    it('should render `courseDescriptionContainerGroup` with all labels successfully', () => {
        expect(descriptionGroupDiv).toHaveLength(1);
        const descriptionItemsLabels = descriptionGroupDiv.find('DescriptionsItem');
        expect(descriptionItemsLabels.at(0).props().label).toBe('Token Cost');
        expect(descriptionItemsLabels.at(1).props().label).toBe('Author');
        expect(descriptionItemsLabels.at(2).props().label).toBe('Author Bio');
        expect(descriptionItemsLabels.at(3).props().label).toBe('Second Author');
        expect(descriptionItemsLabels.at(4).props().label).toBe('Second Author Bio');
        expect(descriptionItemsLabels.at(5).props().label).toBe('Version');
        expect(descriptionItemsLabels.at(6).props().label).toBe('Difficulty');
        expect(descriptionItemsLabels.at(7).props().label).toBe('Version Date');
        expect(descriptionItemsLabels.at(8).props().label).toBe('Value Rating');
        expect(descriptionItemsLabels.at(9).props().label).toBe('Number of ratings');
        expect(descriptionItemsLabels.at(10).props().label).toBe('Enrolled students');
        expect(descriptionItemsLabels.at(11).props().label).toBe('LinkedIn URL');
        expect(descriptionItemsLabels.at(12).props().label).toBe('Second LinkedIn URL');
        expect(descriptionItemsLabels.at(13).props().label).toBe('Course Video');
        expect(descriptionItemsLabels.at(14).props().label).toBe('Badge of certification');
        expect(descriptionItemsLabels.at(15).props().label).toBe('Certificate of completion');
        expect(descriptionItemsLabels.at(16).props().label).toBe('Lab steps in personal archive');
        expect(descriptionItemsLabels.at(17).props().label).toBe('Access Request');
        expect(descriptionItemsLabels.at(18).props().label).toBe('Publicly visible');
    });

    it('Should render `Token-Cost`input successfully', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Token Cost"]').at(0);
        expect(inputField.props().children.props.name).toBe('token_cost');
        expect(inputField.props().children.props.placeholder).toBe('Token Cost');
        expect(component.state().author).toBe('');
    });

    it('Should render `Author`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Author"]').at(0);
        expect(inputField.props().children.props.name).toBe('author');
        expect(inputField.props().children.props.placeholder).toBe('Author');
        expect(component.state().author).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'author', value: 'AuthorTest' } });
        expect(component.state().author).toBe('AuthorTest');
    });
    it('Should render `Author-Bio`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Author Bio"]').at(0);
        expect(inputField.props().children.props.name).toBe('author_bio');
        expect(inputField.props().children.props.placeholder).toBe('Author Bio');
        expect(component.state().author_bio).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'author_bio', value: 'AuthorBioTest' } });
        expect(component.state().author_bio).toBe('AuthorBioTest');
    });

    it('Should render `Second-Author`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Second Author"]').at(0);
        expect(inputField.props().children.props.name).toBe('second_author');
        expect(inputField.props().children.props.placeholder).toBe('Second Author');
        expect(component.state().second_author).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'second_author', value: 'Second AuthorTest' } });
        expect(component.state().second_author).toBe('Second AuthorTest');
    });
    it('Should render `Second-Author-Bio`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Second Author Bio"]').at(0);
        expect(inputField.props().children.props.name).toBe('second_author_bio');
        expect(inputField.props().children.props.placeholder).toBe('Second Author Bio');
        expect(component.state().second_author_bio).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'second_author_bio', value: 'Second AuthorBioTest' } });
        expect(component.state().second_author_bio).toBe('Second AuthorBioTest');
    });

    it('Should render `Version`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Version"]').at(0);
        expect(inputField.props().children.props.name).toBe('version');
        expect(inputField.props().children.props.placeholder).toBe('Version');
        expect(inputField.props().children.props.value).toBe(component.state().version);
        expect(component.state().version).toBe('1.0.0');
        inputField.props().children.props.onChange({ target: { name: 'version', value: '2.0.0' } });
        expect(component.state().version).toBe('2.0.0');
    });

    it('Should render `Difficulty` Rate and change status ', () => {
        const rateField = descriptionGroupDiv.find('DescriptionsItem[label="Difficulty"]').at(0);
        expect(rateField.props().children.props.children.props.defaultValue).toBe(2.5);
        expect(rateField.props().children.props.children.props.value).toBe(0);
        expect(component.state().difficulty).toBe(0);
        rateField.props().children.props.children.props.onChange(5);
        expect(component.state().difficulty).toBe(5);
    });
    it('Should render `Version Date` and change status ', () => {
        const datePicker = descriptionGroupDiv.find('DescriptionsItem[label="Version Date"]').at(0);
        expect(datePicker.props().children.props.name).toBe('version_date');
    });
    it('Should render `Value Rating` Rate and change status ', () => {
        const rateField = descriptionGroupDiv.find('DescriptionsItem[label="Value Rating"]').at(0);
        expect(rateField.props().children.props.children.props.name).toBe('value_rating');
        expect(rateField.props().children.props.children.props.value).toBe(0);
        expect(component.state().value_rating).toBe(0);
        rateField.props().children.props.children.props.onChange(5);
        expect(component.state().value_rating).toBe(5);
    });
    it('Should render `Number-of-ratings`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Number of ratings"]').at(0);
        expect(inputField.props().children.props.name).toBe('number_of_ratings');
        expect(inputField.props().children.props.placeholder).toBe('Number of ratings');
        expect(component.state().number_of_ratings).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'number_of_ratings', value: '5' } });
        expect(component.state().number_of_ratings).toBe('5');
    });
    it('Should render `Enrolled-students`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Enrolled students"]').at(0);
        expect(inputField.props().children.props.name).toBe('enrolled_students');
        expect(inputField.props().children.props.placeholder).toBe('Enrolled students');
        expect(component.state().enrolled_students).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'enrolled_students', value: '5' } });
        expect(component.state().enrolled_students).toBe('5');
    });
    it('Should render `LinkedIn-URL`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="LinkedIn URL"]').at(0);
        expect(inputField.props().children.props.name).toBe('linkedIn_url');
        expect(inputField.props().children.props.placeholder).toBe('LinkedIn URL');
        expect(component.state().linkedIn_url).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'linkedIn_url', value: 'test LinkedIn URL' } });
        expect(component.state().linkedIn_url).toBe('test LinkedIn URL');
    });
    it('Should render `Second-LinkedIn-URL`input and change status when enter data', () => {
        const inputField = descriptionGroupDiv.find('DescriptionsItem[label="Second LinkedIn URL"]').at(0);
        expect(inputField.props().children.props.name).toBe('second_linkedIn_url');
        expect(inputField.props().children.props.placeholder).toBe('LinkedIn URL');
        expect(component.state().second_linkedIn_url).toBe('');
        inputField.props().children.props.onChange({ target: { name: 'second_linkedIn_url', value: 'test Second LinkedIn URL' } });
        expect(component.state().second_linkedIn_url).toBe('test Second LinkedIn URL');
    });
    it('Should render `Course-video` and call `upload function` ', () => {
        const upload = descriptionGroupDiv.find('DescriptionsItem[label="Course Video"]').at(0);

        upload.props().children.props.beforeUpload({ size: 2000 });
        expect(props.uploadVideo).toHaveBeenCalledTimes(1);
    });
    it('Should render `Badge-of-certification` and switch between false and true  ', () => {
        const switchButton = descriptionGroupDiv.find('DescriptionsItem[label="Badge of certification"]').at(0);

        expect(switchButton.props().children.props.checked).toBe(false);
        expect(component.state().cert_badge).toBe(false);
        switchButton.props().children.props.onChange();
        expect(component.state().cert_badge).toBe(true);
    });
    it('Should render `Certificate-of-completion` and switch between false and true  ', () => {
        const switchButton = descriptionGroupDiv.find('DescriptionsItem[label="Certificate of completion"]').at(0);

        expect(switchButton.props().children.props.checked).toBe(true);
        expect(component.state().certificate_of_completion).toBe(true);
        switchButton.props().children.props.onChange();
        expect(component.state().certificate_of_completion).toBe(false);
    });
    it('Should render `Lab-steps-in-personal-archive` and switch between false and true  ', () => {
        const switchButton = descriptionGroupDiv.find('DescriptionsItem[label="Lab steps in personal archive"]').at(0);

        expect(switchButton.props().children.props.checked).toBe(true);
        expect(component.state().lab_steps_in_personal_archive).toBe(true);
        switchButton.props().children.props.onChange();
        expect(component.state().lab_steps_in_personal_archive).toBe(false);
    });
    it('Should render `Access-Request` and switch between false and true  ', () => {
        const switchButton = descriptionGroupDiv.find('DescriptionsItem[label="Access Request"]').at(0);

        expect(switchButton.props().children.props.checked).toBe(false);
        expect(component.state().access_request).toBe(false);
        switchButton.props().children.props.onChange();
        expect(component.state().access_request).toBe(true);
    });
    it('Should render `Publicly-visible` and switch between false and true  ', () => {
        const switchButton = descriptionGroupDiv.find('DescriptionsItem[label="Publicly visible"]').at(0);

        expect(switchButton.props().children.props.checked).toBe(false);
        expect(component.state().publicly_visible).toBe(false);
        switchButton.props().children.props.onChange();
        expect(component.state().publicly_visible).toBe(true);
    });

    it('should render course used tools section with ability to add and remove tools ', () => {
        const usedToolsDiv = component.find('.courseDescriptionSection').at(0);
        expect(usedToolsDiv).toHaveLength(1);
        expect(usedToolsDiv.props().title).toBe('Tools you will use in the hands-on lab');

        const inputTools = usedToolsDiv.find('Input');
        expect(inputTools.props().placeholder).toBe('Tools you will use in the hands-on lab');
        expect(inputTools.props().name).toBe('tools_used_field');
        expect(inputTools.props().value).toBe('');
        expect(component.state().tools_used).toHaveLength(0);
        expect(component.state().tools_used_field).toBe('');

        // Add tools to input field and press enter
        inputTools.props().onChange({ target: { name: 'tools_used_field', value: 'test tool 1' } });
        expect(component.state().tools_used_field).toBe('test tool 1');
        inputTools.props().onPressEnter();
        expect(component.state().tools_used).toEqual(['test tool 1']);
        expect(component.state().tools_used_field).toBe('');
        inputTools.props().onChange({ target: { name: 'tools_used_field', value: 'test tool 2' } });
        expect(component.state().tools_used_field).toBe('test tool 2');
        inputTools.props().onPressEnter();
        expect(component.state().tools_used).toEqual(['test tool 1', 'test tool 2']);
        expect(component.state().tools_used_field).toBe('');

        // Render the added tools in a list and remove them
        const listToolsContainer = component.find('.whoThisCourseIsFor').at(0);
        const listOfItems = listToolsContainer.find('li');
        expect(listOfItems).toHaveLength(2); // 2 is length of the added item of tools previously in this test
        listOfItems.at(0).props().children[1].props.onClick();
        expect(component.state().tools_used).toEqual(['test tool 2']);
    });

    it('should render `Assign tags for this course` section', () => {
        const assignTagDiv = component.find('.courseTagsSection').at(0);
        expect(assignTagDiv).toHaveLength(1);
        expect(assignTagDiv.props().title).toBe('Assign tags for this course');
        expect(assignTagDiv.props().extra.props.htmlType).toBe('button');
        expect(assignTagDiv.props().extra.props.children).toBe('Add Tag');
        expect(component.state().tagsModal).toBe(false);
        assignTagDiv.props().extra.props.onClick();
        expect(component.state().tagsModal).toBe(true);

        const selectTag = assignTagDiv.find('Select');
        expect(selectTag.props().placeholder).toBe('Tags Mode');
    });

    it('should render `What you will learn` section with ability to add and remove items ', () => {
        const learnObjectiveDiv = component.find('.courseDescriptionSection').at(1);
        expect(learnObjectiveDiv).toHaveLength(1);
        expect(learnObjectiveDiv.props().title).toBe('What you will learn');

        const inputLearnObj = learnObjectiveDiv.find('Input');
        expect(inputLearnObj.props().placeholder).toBe('What you will learn');
        expect(inputLearnObj.props().name).toBe('will_learn_field');
        expect(inputLearnObj.props().value).toBe('');
        expect(component.state().will_learn).toHaveLength(0);
        expect(component.state().will_learn_field).toBe('');

        // Add items to input field and press enter
        inputLearnObj.props().onChange({ target: { name: 'will_learn_field', value: 'test learn 1' } });
        expect(component.state().will_learn_field).toBe('test learn 1');
        inputLearnObj.props().onPressEnter();
        expect(component.state().will_learn).toEqual(['test learn 1']);
        expect(component.state().will_learn_field).toBe('');
        inputLearnObj.props().onChange({ target: { name: 'will_learn_field', value: 'test learn 2' } });
        expect(component.state().will_learn_field).toBe('test learn 2');
        inputLearnObj.props().onPressEnter();
        expect(component.state().will_learn).toEqual(['test learn 1', 'test learn 2']);
        expect(component.state().will_learn_field).toBe('');

        // Render the added items in a list and remove them
        const listContainer = component.find('.whoThisCourseIsFor').at(2);
        const listOfItems = listContainer.find('li');
        expect(listOfItems).toHaveLength(2); // 2 is length of the added item  previously in this test
        listOfItems.at(0).props().children[1].props.onClick();
        expect(component.state().will_learn).toEqual(['test learn 2']);
    });
    it('should render `Who this course is for` section with ability to add and remove items ', () => {
        const whoCourseForDiv = component.find('.courseDescriptionSection').at(2);
        expect(whoCourseForDiv).toHaveLength(1);
        expect(whoCourseForDiv.props().title).toBe('Who this course is for');

        const inputCourseFor = whoCourseForDiv.find('Input');
        expect(inputCourseFor.props().placeholder).toBe('Who this course is for');
        expect(inputCourseFor.props().name).toBe('course_is_for_field');
        expect(inputCourseFor.props().value).toBe('');
        expect(component.state().course_is_for).toHaveLength(0);
        expect(component.state().course_is_for_field).toBe('');

        // Add items to input field and press enter
        inputCourseFor.props().onChange({ target: { name: 'course_is_for_field', value: 'test course for 1' } });
        expect(component.state().course_is_for_field).toBe('test course for 1');
        inputCourseFor.props().onPressEnter();
        expect(component.state().course_is_for).toEqual(['test course for 1']);
        expect(component.state().course_is_for_field).toBe('');
        inputCourseFor.props().onChange({ target: { name: 'course_is_for_field', value: 'test course for 2' } });
        expect(component.state().course_is_for_field).toBe('test course for 2');
        inputCourseFor.props().onPressEnter();
        expect(component.state().course_is_for).toEqual(['test course for 1', 'test course for 2']);
        expect(component.state().course_is_for_field).toBe('');

        // Render the added items in a list and remove them
        const listContainer = component.find('.whoThisCourseIsFor').at(3);
        const listOfItems = listContainer.find('li');
        expect(listOfItems).toHaveLength(2); // 2 is length of the added item  previously in this test
        listOfItems.at(0).props().children[1].props.onClick();
        expect(component.state().course_is_for).toEqual(['test course for 2']);
    });

    it('should render `Required Experience` section', () => {
        const requiredExperienceDiv = component.find('.courseDescriptionContainer').at(2);
        expect(requiredExperienceDiv).toHaveLength(1);
        const requiredExpTitle = requiredExperienceDiv.find('.inputSpan').at(0);
        expect(requiredExpTitle.text()).toBe('Required Experience');
        const descriptionText = requiredExperienceDiv.find('.descriptionText');
        expect(descriptionText.props().children.props.name).toBe('required_exp');
    });

    it('should call createCourse with token_cost', async () => {
        const spy = jest.spyOn(component.instance().props, 'createCourse');
        component.find('.createCourse').simulate('click');

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                token_cost: 0,
            }),
        );
    });

    it('should call createCourse with an object containing all keys', async () => {
        const spy = jest.spyOn(component.instance().props, 'createCourse');
        component.find('.createCourse').simulate('click');

        const calls = spy.mock.calls[0];
        const keys = Object.keys(calls[0]);
        expect(keys).toEqual(createCourseKeys);
    });
});
