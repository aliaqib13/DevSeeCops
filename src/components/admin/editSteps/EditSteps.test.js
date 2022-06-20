import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'antd';
import EditSteps from './EditSteps';
import ContentBlocks from './contentBlocks';

jest.mock('antd');

const props = {
    steps: [
        {
            title: 'Start here',
            states: [{ title: 'idle', help_message: 'test message' }],
            is_compulsory: 1,
            uuid: '155a323a-ab5e-4872-8af9-67b033b3268c',
            contentBlocks: [
                {
                    type: 'SingleText',
                    content: {
                        text: 'We have prepared a Gitlab environment for you that will hold two repositories for container security and container compliance respectively. Also  preconfigured pipelines will be there that will build the docker image and run the tools (will become visible under "CI / CD" => "Pipelines"). We have choosen Gitlab because Gitlab has an online Web IDE, you can access that by going to the Project home and click on Web IDE. It also contains a docker repository. Two tools are being used to apply checks 1) Anchore : Analyse Docker Image for vulnerability and compliance. 2) Hadolint: Build best practice docker images.',
                    },
                },
                {
                    type: 'SingleText',
                    content: {
                        text: 'The Container-security repository is designed to show how a pipeline can be stopped in case of vulnerabilities(CVEs) found with high severity.',
                    },
                },
                {
                    type: 'SingleText',
                    content: {
                        text: 'The Container-compliance repository is designed to show how a pipeline will be stopped in case of issues other than vulnerabilities(CVE) like exposed_ports, no health checks, misconfiguration, etc',
                    },
                },
                {
                    type: 'SingleText',
                    content: {
                        text: 'Gitlab takes a few minutes to prepare, so it could be inaccessible the first time you try to visit it. It takes around 3-4 minutes. In the meantime you can Google and read about Hadolint and Anchore',
                    },
                },
            ],
        },
    ],
    getStateMachine: jest.fn(() => Promise.resolve(true)),
    id: 4,
    isTemplate: 1,
    learningPaths: [
        {
            id: 1,
            resource_url: 'https://atp-resources.s3.eu-central-1.amazonaws.com/course-videos/ml4Oi4Gh9zcITadexGc4VEKKdAVVWLpT.mp4',
            title: 'Test title',
            description: 'Testing',
            courses: [{
                course: {
                    image: 'test',
                    title: 'Test',
                    description: 'Description',
                    labs: [
                        { id: 1 },
                    ],
                    activeCoursesMany: [
                        { user_id: 3, finished: 0 },
                    ],
                },
                course_id: 4,
                created_at: '2021-02-18 13:12:32',
                id: 3,
                learning_path_id: 3,
                updated_at: '2021-02-18 13:12:35',
            }],
            examCourse: {
                title: 'Test Exam Course',
            },
            category: {
                id: 1,
                name: 'Secrets Management',
            },
            introduction: {
                image: 'test',
                title: 'Test',
                description: 'Description',
            },
        },
    ],
    user: {
        id: 3,
    },
};

describe('EditSteps', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<EditSteps {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render EditSteps Component Successfully', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('should add new component to state when press add component button', () => {
        wrapper.setState({ selectedIndex: 0 });
        wrapper.setState({ selectedStep: props.steps[0] });
        const fetchFavoriteComponents = jest.fn();
        const addComponent = wrapper.instance();
        const contBlock = shallow(<ContentBlocks blocks={props.steps[0].contentBlocks} fetchFavoriteComponents={fetchFavoriteComponents} addComponent={() => addComponent.addComponent()} />);
        contBlock.find('.add-component-btn-bottom').props().onClick();
        expect(wrapper.state().steps[0].contentBlocks[4].type).toEqual('SingleText');
        expect(wrapper.state().steps[0].contentBlocks[4].content.text).toEqual('');
    });

    it('should add new component to top of object on state when press add component button', () => {
        wrapper.setState({ selectedIndex: 0 });
        wrapper.setState({ selectedStep: props.steps[0] });
        const { addComponent } = wrapper.instance();
        const fetchFavoriteComponents = jest.fn();
        const contBlock = shallow(<ContentBlocks fetchFavoriteComponents={fetchFavoriteComponents} blocks={props.steps[0].contentBlocks} addComponent={() => addComponent(true)} />);
        contBlock.find('.add-component-btn-top').props().onClick();
        expect(wrapper.state().steps[0].contentBlocks[0].type).toEqual('SingleText');
        expect(wrapper.state().steps[0].contentBlocks[0].content.text).toEqual('');
    });

    it('should render button for redirecting back to course edit menu', () => {
        const courseEditMenuButton = wrapper.find('.course-edit-menu-button');
        expect(courseEditMenuButton.exists()).toBeTruthy();
    });

    it('should render course edit menu button with text "Course edit menu"', () => {
        const courseEditMenuButton = wrapper.find('.course-edit-menu-button');
        expect(courseEditMenuButton.props().children[1]).toBe('Course edit menu');
    });

    it('should render save favorite step modal successfully', () => {
        const saveFavoriteStep = wrapper.find('.save-component-modal');
        expect(saveFavoriteStep.exists()).toBeTruthy();
    });

    it('should render save favorite step modal with title "Save Favorite Step"', () => {
        const saveFavoriteStep = wrapper.find('.save-component-modal');
        expect(saveFavoriteStep.props().title).toBe('Save Favorite Step');
    });

    it('should render actions column successfully', () => {
        const actionColumn = wrapper.find('#actions');
        expect(actionColumn.exists()).toBeTruthy();
        expect(actionColumn.props().title).toBe('Actions');
    });

    it('should render add state button successfully', () => {
        const actionColumn = wrapper.find('#actions');
        const step = actionColumn.props().render('text', props.steps[0], 0);
        const button = step.props.children[2].props.children[3];
        expect(button.props.icon).toBe('plus');
    });

    it('should open add state modal successfully', () => {
        wrapper.setState({ showAddState: true });
        wrapper.setState({ states: props.steps[0].states });
        const addStateModal = wrapper.find('Modal').at(0);
        expect(addStateModal.props().visible).toBe(true);
    });

    it('should render component step switcher', () => {
        const stepsTable = wrapper.find('withStore(Table)');
        const stepActions = stepsTable.find('Column[title="Actions"]');
        const step = stepActions.props().render('text', props.steps[0], 0);
        const compulsoryButtons = step.props.children[2].props.children[4];
        const switcher = compulsoryButtons.props.children[0];
        expect(switcher.props.checkedChildren).toBe('Is Compulsory');
    });

    it('should render component step push all changes button', () => {
        const stepsTable = wrapper.find('withStore(Table)');
        const stepActions = stepsTable.find('Column[title="Actions"]');
        const step = stepActions.props().render('text', props.steps[0], 0);
        const compulsoryButtons = step.props.children[2].props.children[4];
        const pushButton = compulsoryButtons.props.children[1];
        expect(pushButton.props.icon).toBe('issues-close');
    });

    it('should add value to states when call onSelected', () => {
        const instance = wrapper.instance();
        const { states } = wrapper.state();
        const title = 'new state';
        instance.onSelected(title);
        const newState = wrapper.state().states;
        expect(newState.length).toBe(states.length + 1);
        expect(newState[newState.length - 1]).toEqual({ title, help_message: '' });
    });

    it('should change state help message when call handleHelpMessageChange', () => {
        wrapper.setState({
            states: [
                { title: 'testT1', help_message: 'testH1' },
                { title: 'testT2', help_message: 'testH2' },
            ],
        });
        const instance = wrapper.instance();
        instance.handleHelpMessageChange('newText', 0);
        const { states } = wrapper.state();
        expect(states[0].help_message).toBe('newText');
    });

    it('showDeleteConfirm() work successfully', async () => {
        const instance = wrapper.instance();
        const index = 0;
        await instance.showDeleteConfirm(index);
        expect(Modal.confirm).toBeCalled();
    });

    describe('.save()', () => {
        it('does not save if course type is theory and either title or description are missing', async () => {
            const testProps = {
                type: 'theory',
                steps: [],
                theory: {
                    theory_desc: '',
                    theory_title: '',
                },
            };

            const component = shallow(<EditSteps {...testProps} />);
            // Set the state:
            component.setState({
                theory_title: '',
                theory_desc: '',
            });

            const instance = component.instance();

            jest.spyOn(instance, 'setState');
            // Attempt to save:
            const result = await instance.save();

            // Expect it returns false
            expect(result).toBe(false);

            // Expect the loadingSaveSteps to have been set and unset
            expect(instance.setState).toHaveBeenCalledWith({ loadingSaveSteps: true });
            expect(instance.setState).toHaveBeenCalledWith({ loadingSaveSteps: false });

            // TODO: Verify `message` to have been pushed:
            // I couln't get the mocking to work easily.
        });
    });
    describe('.addSavedComponent()', () => {
        it('adds saved component to the step content block', async () => {
            const componentToAdd = {
                type: 'SingleText',
                content: {
                    text: 'The Container-security repository is designed to show how a pipeline can be stopped in case of vulnerabilities(CVEs) found with high severity.',
                },
                id: 16,
                is_compulsory: 0,
                order_number: 1,
                step_id: 5,
            };

            const component = shallow(<EditSteps {...props} />);
            component.setState({ selectedIndex: 0 });
            component.setState({ selectedStep: props.steps[0] });

            const instance = component.instance();

            jest.spyOn(instance, 'addSavedComponent');
            await instance.addSavedComponent(componentToAdd);
            expect(instance.addSavedComponent).toHaveBeenCalledTimes(1);
            expect(instance.addSavedComponent).toHaveBeenCalledWith(componentToAdd);
            await instance.addSavedComponent(componentToAdd, true);
            expect(instance.addSavedComponent).toHaveBeenCalledTimes(2);
        });
    });

    describe('.onChangeContentType()', () => {
        const props = {
            getStateMachine: jest.fn(() => Promise.resolve(true)),
            steps: [
                {
                    title: 'Start here',
                    states: [{ title: 'idle', help_message: 'test message' }],
                    is_compulsory: 1,
                    uuid: '155a323a-ab5e-4872-8af9-67b033b3268c',
                    contentBlocks: [
                        {
                            type: 'image',
                            content: {
                                image: '',
                            },
                        },
                        {
                            type: 'SingleText',
                            content: {
                                text: 'test text',
                            },
                        },
                    ],
                },
            ],
        };
        const component = shallow(<EditSteps {...props} />);
        it('calls changeContentType without warning if current component does not hold text', async () => {
            component.setState({
                selectedIndex: 0,
                selectedStep: {
                    contentBlocks: [
                        {
                            type: 'Image',
                            content: {
                                image: '',
                            },
                        },
                    ],
                },
            });

            const instance = component.instance();
            const changeContentSpy = jest.spyOn(instance, 'changeContentType');
            await instance.onChangeContentType('Image', 0);

            expect(changeContentSpy).toHaveBeenCalledTimes(1);
            expect(changeContentSpy).toHaveBeenCalledWith('Image', 0);
            expect(Modal.confirm).not.toHaveBeenCalled();
        });

        // TODO: https://araido.atlassian.net/browse/ATP-2182
        // TODO: Write test to verify confirmation modal has been called as expected
        // TODO: Write test to verify confirmation modal calls the right fn onOk & onCancel
    });

    describe('.removeStep()', () => {
        const props = {
            getStateMachine: jest.fn(() => Promise.resolve(true)),
            removeAllCompulsorySteps: jest.fn(() => Promise.resolve(true)),
            steps: [
                {
                    title: 'Start here',
                    states: [{ title: 'idle', help_message: 'test message' }],
                    is_compulsory: 1,
                    uuid: '',
                    contentBlocks: [
                        {
                            type: 'image',
                            content: {
                                image: '',
                            },
                        },
                        {
                            type: 'SingleText',
                            content: {
                                text: 'test text',
                            },
                        },
                    ],
                },
                {
                    title: 'Start here 2',
                    states: [{ title: 'idle', help_message: 'test message' }],
                    is_compulsory: 0,
                    uuid: '155a323a-ab5e-4872-8af9-67b033b3268c',
                    contentBlocks: [
                        {
                            type: 'image',
                            content: {
                                image: '',
                            },
                        },
                        {
                            type: 'SingleText',
                            content: {
                                text: 'test text',
                            },
                        },
                    ],
                },
            ],
        };
        const component = shallow(<EditSteps {...props} />);

        it('call removes step on the index', async () => {
            const instance = component.instance();
            const index = 0;

            const expectedSteps = JSON.parse(JSON.stringify(props.steps)); // Take a copy of the steps
            expectedSteps.splice(index, 1); // Remove one item at the appropriate index.

            // Call the function to remove a step at the given index
            await instance.removeStep(index);

            // Check that the state on the component matches the steps we now expect
            expect(component.state('steps')).toEqual(expectedSteps);
        });
    });
});
