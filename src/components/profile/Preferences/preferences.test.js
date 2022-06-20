import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Preferences } from './Preferences';

const props = {
    form: {
        getFieldDecorator: jest.fn(opts => c => c),
        validateFields: jest.fn(cb => cb()),
    },
    getPreferences: jest.fn(() => Promise.resolve(true)),
    preferences: {
        content: {},
        userCourseTags: [],
    },
    updatePreferences: jest.fn(() => Promise.resolve(true)),
};
const event = { preventDefault: () => {} };

const formLabels = {
    experience: 'How experienced are you in DevSecOps ?',
    expertise: 'What best describes your work / expertise ?',
    interestedCategories: 'What specific DevSecOps categories are you interested in for training ?',
    relevantCloudPlatform: 'Which Cloud platform is most relevant to your work, either now or in the near future ?',
    appDevPlatforms: 'If you would have to choose from this list, which application development platforms are relevant for your work, right now and in the near future ?',
    interestToShare: 'Is there anything of particular interest you like to share or you would like to ask us ?',
    addCourseTag: 'Add Course Tags',
};
const targetNames = {
    experience: 'experience',
    workDescription: 'work_description',
    category: 'category',
    cloudPlatform: 'cloud_platform',
    developmentPlatform: 'development_platform',
    interest: 'interest',

};

describe('Preferences', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Preferences {...props} />);
        props.form.validateFields.mockClear();
    });

    it('Should render `Preferences` container successfully', () => {
        const wrapper = component.find('.preferences-container');
        expect(wrapper).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should render `experience` container successfully  ', () => {
        const experienceDiv = component.find(`FormItem[label="${formLabels.experience}"]`);
        expect(experienceDiv).toHaveLength(1);
    });

    it('Should render `experience` question plus radioButtons successfully  ', () => {
        const experienceDiv = component.find(`FormItem[label="${formLabels.experience}"]`);
        const radioButton = experienceDiv.find('RadioButton');

        expect(experienceDiv.props().label).toBe(formLabels.experience);
        expect(radioButton.at(0).props().value).toBe(0);
        expect(radioButton.at(1).props().value).toBe(1);
        expect(radioButton.at(2).props().value).toBe(2);
        expect(radioButton.at(3).props().value).toBe(3);
        expect(radioButton.at(4).props().value).toBe(4);
        expect(radioButton.at(5).props().value).toBe(5);
        expect(radioButton.at(6).props().value).toBe(6);
        expect(radioButton.at(7).props().value).toBe(7);
        expect(radioButton.at(8).props().value).toBe(8);
        expect(radioButton.at(9).props().value).toBe(9);
    });
    it('Should change `experience` state when change between radioButtons successfully  ', () => {
        const experienceDiv = component.find(`FormItem[label="${formLabels.experience}"]`);
        const radioGroup = experienceDiv.find('RadioGroup');

        expect(component.state().survey.experience).toBe('');
        radioGroup.props().onChange({ target: { name: targetNames.experience, value: 5 } });
        expect(component.state().survey.experience).toBe(5);
    });

    it('Should render `work/expertise` container successfully  ', () => {
        const expertiseDiv = component.find(`FormItem[label="${formLabels.expertise}"]`);
        expect(expertiseDiv).toHaveLength(1);
    });

    it('Should render `work/expertise` question plus radioButtons successfully  ', () => {
        const expertiseDiv = component.find(`FormItem[label="${formLabels.expertise}"]`);
        const radioButton = expertiseDiv.find('Radio');

        expect(expertiseDiv.props().label).toBe(formLabels.expertise);
        expect(radioButton.at(0).props().value).toBe('Development');
        expect(radioButton.at(1).props().value).toBe('Operations');
        expect(radioButton.at(2).props().value).toBe('Security');
        expect(radioButton.at(3).props().value).toBe('It is all even in my work : DevSecOps');
        expect(radioButton.at(4).props().value).toBe('Other');
    });

    it('Should change `work/expertise` state when change between radioButtons successfully  ', () => {
        const expertiseDiv = component.find(`FormItem[label="${formLabels.expertise}"]`);
        const radioGroup = expertiseDiv.find('RadioGroup');

        expect(component.state().survey.work_description).toBe('');
        radioGroup.props().onChange({ target: { name: targetNames.workDescription, value: 'Operations' } });
        expect(component.state().survey.work_description).toBe('Operations');
    });

    it('Should render `work/expertise` input field when when `Other` is chosen and change states  ', () => {
        const expertiseDiv = component.find(`FormItem[label="${formLabels.expertise}"]`);
        const radioGroup = expertiseDiv.find('RadioGroup');

        expect(component.state().survey.work_description).toBe('');
        expect(component.state().others.work_description).toBe(false);
        expect(expertiseDiv.find('TextArea')).toHaveLength(0);

        radioGroup.props().onChange({ target: { name: targetNames.workDescription, value: 'Other' } });

        const textArea = component.find(`FormItem[label="${formLabels.expertise}"]`).find('TextArea');
        expect(textArea).toHaveLength(1);
        expect(component.state().survey.work_description).toBe('Other');
        expect(component.state().others.work_description).toBe(true);

        expect(component.state().survey.work_description_other).toBe('');
        textArea.props().onChange({ target: { name: targetNames.workDescription, value: 'Testing Others field' } });
        expect(component.state().survey.work_description_other).toBe('Testing Others field');
    });

    it('Should render `DevSecOps categories` container successfully  ', () => {
        const interestedCategories = component.find(`FormItem[label="${formLabels.interestedCategories}"]`);
        expect(interestedCategories).toHaveLength(1);
    });

    it('Should render `DevSecOps categories` question plus checkbox successfully  ', () => {
        const categoriesDiv = component.find(`FormItem[label="${formLabels.interestedCategories}"]`);
        const checkBoxGroup = categoriesDiv.find('Checkbox');

        expect(categoriesDiv.props().label).toBe(formLabels.interestedCategories);
        expect(checkBoxGroup.at(0).props().value).toBe('Threat Modeling');
        expect(checkBoxGroup.at(1).props().value).toBe('Secure Coding');
        expect(checkBoxGroup.at(2).props().value).toBe('SAST');
        expect(checkBoxGroup.at(3).props().value).toBe('DAST');
        expect(checkBoxGroup.at(4).props().value).toBe('ExamplePost Management');
        expect(checkBoxGroup.at(5).props().value).toBe('Container Security');
        expect(checkBoxGroup.at(6).props().value).toBe('Cloud Security');
        expect(checkBoxGroup.at(7).props().value).toBe('Compliance as Code');
        expect(checkBoxGroup.at(8).props().value).toBe('Secrets Management');
        expect(checkBoxGroup.at(9).props().value).toBe('Mobile Security');
        expect(checkBoxGroup.at(10).props().value).toBe('Other');
    });

    it('Should change `DevSecOps categories` state when select checkbox successfully  ', () => {
        const categoriesDiv = component.find(`FormItem[label="${formLabels.interestedCategories}"]`);
        const checkboxGroup = categoriesDiv.find('CheckboxGroup');

        expect(component.state().survey.category).toEqual([]);
        checkboxGroup.props().onChange(['SAST', 'DAST'], targetNames.category);
        expect(component.state().survey.category).toEqual(['SAST', 'DAST']);
    });

    it('Should render `DevSecOps categories` input field when when `Other` is chosen and change states  ', () => {
        const categoriesDiv = component.find(`FormItem[label="${formLabels.interestedCategories}"]`);
        const checkboxGroup = categoriesDiv.find('CheckboxGroup');

        expect(component.state().survey.category).toEqual([]);
        expect(component.state().others.category).toBe(false);
        expect(categoriesDiv.find('TextArea')).toHaveLength(0);

        checkboxGroup.props().onChange(['Threat Modeling', 'Secure Coding', 'Other'], targetNames.category);

        const textArea = component.find(`FormItem[label="${formLabels.interestedCategories}"]`).find('TextArea');
        expect(textArea).toHaveLength(1);
        expect(component.state().survey.category).toEqual(['Threat Modeling', 'Secure Coding', 'Other']);
        expect(component.state().others.category).toBe(true);

        expect(component.state().survey.category_other).toBe('');
        textArea.props().onChange({ target: { value: 'Testing Others field' } });
        expect(component.state().survey.category_other).toBe('Testing Others field');
    });

    it('Should render `relevant Cloud platform` container successfully  ', () => {
        const relevantCloudPlatform = component.find(`FormItem[label="${formLabels.relevantCloudPlatform}"]`);
        expect(relevantCloudPlatform).toHaveLength(1);
    });

    it('Should render `relevant Cloud platform` question plus checkbox successfully  ', () => {
        const relevantCloudPlatformDiv = component.find(`FormItem[label="${formLabels.relevantCloudPlatform}"]`);
        const radioGroup = relevantCloudPlatformDiv.find('Radio');

        expect(relevantCloudPlatformDiv.props().label).toBe(formLabels.relevantCloudPlatform);
        expect(radioGroup.at(0).props().value).toBe('AWS');
        expect(radioGroup.at(1).props().value).toBe('Azure');
        expect(radioGroup.at(2).props().value).toBe('GCP');
        expect(radioGroup.at(3).props().value).toBe("The cloud platform isn't particularly relevant to my training needs");
        expect(radioGroup.at(4).props().value).toBe('Other');
    });

    it('Should change `relevant Cloud platform` state when change between radioButtons successfully  ', () => {
        const relevantCloudPlatformDiv = component.find(`FormItem[label="${formLabels.relevantCloudPlatform}"]`);
        const radioGroup = relevantCloudPlatformDiv.find('RadioGroup');

        expect(component.state().survey.cloud_platform).toBe('');
        radioGroup.props().onChange({ target: { name: targetNames.cloudPlatform, value: 'AWS' } });
        expect(component.state().survey.cloud_platform).toBe('AWS');
    });

    it('Should render `relevant Cloud platform` input field when when `Other` is chosen and change states  ', () => {
        const relevantCloudPlatformDiv = component.find(`FormItem[label="${formLabels.relevantCloudPlatform}"]`);
        const radioGroup = relevantCloudPlatformDiv.find('RadioGroup');

        expect(component.state().survey.cloud_platform).toBe('');
        expect(component.state().others.cloud_platform).toBe(false);
        expect(relevantCloudPlatformDiv.find('TextArea')).toHaveLength(0);

        radioGroup.props().onChange({ target: { name: targetNames.cloudPlatform, value: 'Other' } });

        const textArea = component.find(`FormItem[label="${formLabels.relevantCloudPlatform}"]`).find('TextArea');
        expect(textArea).toHaveLength(1);
        expect(component.state().survey.cloud_platform).toBe('Other');
        expect(component.state().others.cloud_platform).toBe(true);

        expect(component.state().survey.cloud_platform_other).toBe('');
        textArea.props().onChange({ target: { name: targetNames.cloudPlatform, value: 'Testing Others field' } });
        expect(component.state().survey.cloud_platform_other).toBe('Testing Others field');
    });
    it('Should render `relevant application development platforms` container successfully  ', () => {
        const appDevPlatformDiv = component.find(`FormItem[label="${formLabels.appDevPlatforms}"]`);
        expect(appDevPlatformDiv).toHaveLength(1);
    });

    it('Should render `relevant application development platforms` question plus checkbox successfully  ', () => {
        const appDevPlatformDiv = component.find(`FormItem[label="${formLabels.appDevPlatforms}"]`);
        const checkBoxGroup = appDevPlatformDiv.find('Checkbox');

        expect(appDevPlatformDiv.props().label).toBe(formLabels.appDevPlatforms);
        expect(checkBoxGroup.at(0).props().value).toBe('Java');
        expect(checkBoxGroup.at(1).props().value).toBe('.Net');
        expect(checkBoxGroup.at(2).props().value).toBe('Javascript (NodeJS)');
        expect(checkBoxGroup.at(3).props().value).toBe('GO');
        expect(checkBoxGroup.at(4).props().value).toBe('Python');
        expect(checkBoxGroup.at(5).props().value).toBe('The application development platform is not particularly of interest for my training needs');
        expect(checkBoxGroup.at(6).props().value).toBe('Other');
    });

    it('Should change `relevant application development platforms` state when select checkbox successfully  ', () => {
        const appDevPlatformDiv = component.find(`FormItem[label="${formLabels.appDevPlatforms}"]`);
        const checkboxGroup = appDevPlatformDiv.find('CheckboxGroup');

        expect(component.state().survey.development_platform).toEqual([]);
        checkboxGroup.props().onChange(['Java', '.Net'], targetNames.developmentPlatform);
        expect(component.state().survey.development_platform).toEqual(['Java', '.Net']);
    });

    it('Should render `relevant application development platforms` input field when when `Other` is chosen and change states  ', () => {
        const appDevPlatformDiv = component.find(`FormItem[label="${formLabels.appDevPlatforms}"]`);
        const checkboxGroup = appDevPlatformDiv.find('CheckboxGroup');

        expect(component.state().survey.development_platform).toEqual([]);
        expect(component.state().others.development_platform).toBe(false);
        expect(appDevPlatformDiv.find('TextArea')).toHaveLength(0);

        checkboxGroup.props().onChange(['Java', '.Net', 'Other'], targetNames.developmentPlatform);

        const textArea = component.find(`FormItem[label="${formLabels.appDevPlatforms}"]`).find('TextArea');
        expect(textArea).toHaveLength(1);
        expect(component.state().survey.development_platform).toEqual(['Java', '.Net', 'Other']);
        expect(component.state().others.development_platform).toBe(true);

        expect(component.state().survey.development_platform_other).toBe('');
        textArea.props().onChange({ target: { value: 'Testing Others field' } });
        expect(component.state().survey.development_platform_other).toBe('Testing Others field');
    });

    it('Should render `share user interest` container successfully  ', () => {
        const shareInterestDiv = component.find(`FormItem[label="${formLabels.interestToShare}"]`);
        expect(shareInterestDiv).toHaveLength(1);
    });

    it('Should change `relevant application development platforms` state when select checkbox successfully  ', () => {
        const shareInterestDiv = component.find(`FormItem[label="${formLabels.interestToShare}"]`);
        const textArea = shareInterestDiv.find('TextArea');

        expect(component.state().survey.interest).toEqual('');
        textArea.props().onChange({ target: { name: targetNames.interest, value: 'Testing Others field' } });
        expect(component.state().survey.interest).toEqual('Testing Others field');
    });

    it('Should render `add course tags` container successfully  ', () => {
        const addCourseTagDiv = component.find(`FormItem[label="${formLabels.addCourseTag}"]`);

        expect(addCourseTagDiv).toHaveLength(1);
        expect(addCourseTagDiv.props().label).toBe(formLabels.addCourseTag);

        const selectOptions = addCourseTagDiv.find('Select');
        expect(selectOptions.props().placeholder).toBe('Add User Tags');
    });

    it('Should has onSubmit attribute on the form', () => {
        const form = component.find('Form');
        expect(form.props().onSubmit).toBeDefined();
    });

    it('Should call validateFields when form is submitted', () => {
        component.find('Form').props().onSubmit(event);
        expect(props.form.validateFields).toHaveBeenCalledTimes(1);
    });
});
