import React from 'react';
import { shallow } from 'enzyme';
import StateMachineConfig from './StateMachineConfig';

const props = {
    saveStateMachineConfig: jest.fn(() => Promise.resolve(true)),
    id: 102,
    config: {
        CICD_Platform: 'gitlab',
        CICD_ProjectName: 'Test',
        resources: { Test: { creds: ['123'], machineData: ['Test'] } },
        checks: {
            1: {
                file: 'some',
                event: 'VALID_HADOLINT',
                platform: 'gitlab',
                contentExists: [['content1', 0], ['content2', 5]],
                contentMissing: [],
            },
            2: {
                event: 'VALID_DOCKERFILE',
                platform: 'gitlab-api',
                resource: 'Test',
                resourceName: 'Test resource name',
            },
            3: {
                logs: ['log1', 'log2'],
                event: 'VALID_CLAIR_CONFIG',
                platform: 'kubernetes',
                resources: ['Test'],
                resourceNames: ['Test'],
            },
            4: {
                event: 'VALID_PIPELINE_BREAK',
                platform: 'vault',
                endpoint: 'Test',
                response: 'Test',
            },
            5: {
                event: 'VALID_TESTING',
                platform: 'gitlab-package-versions',
                file: 'Test',
                contentExists: [
                    [
                        [1, 2],
                        'Test',
                    ],
                ],
            },
            6: {
                event: 'VALID_TEST',
                platform: 'health-check',
                endpoint: 'Test',
            },
            7: {
                event: 'VALID_PIPELINE_TEST',
                platform: 'api-check',
                endpoint: 'Test',
                resource: 'Test',
                authorization: 'Test',
                responseContains: ['count:1', 'product_id: 1'],

            },
            8: {
                event: 'VALID_GITLAB_PIPELINE',
                platform: 'gitlab-job-logs',
                contentExists: [
                    'Message\\s*:\\s*Test\\s*has\\s*been\\s*started\\s*successfully\\.',
                ],
                contentMissing: [],
            },
            9: {
                platform: 'gitlab-dynamic-configs',
                file: 'java/src/main/resources/bootstrap.yml',
                contentExists: [
                    [
                        'spring.cloud.vault',
                        'uri',
                        'token',
                        'kv',
                        'enabled',
                    ],
                    [
                        'spring.cloud.vault',
                        'token',
                        'host',
                        'port',
                    ],
                ],
                event: 'VALID_BOOTSTRAP_STATIC',
            },
            10: {
                platform: 'gitlab-dynamic-configs',
                file: 'java/src/main/resources/bootstrap2.yml',
                contentExists: [
                    [
                        'spring.cloud.vault',
                        'uri',
                        'token',
                        'kv',
                        'enabled',
                    ],
                    [
                        'spring.cloud.vault',
                        'token',
                        'host',
                        'port',
                    ],
                ],
                event: 'VALID_BOOTSTRAP_STATIC_2',
            },
            11: {
                platform: 'azure_devops_files',
                file: 'java/src/main/resources/bootstrap2.yml',
                contentExists: [
                    [
                        'spring.cloud.vault',
                    ],
                    [
                        'port',
                    ],
                ],
                contentMissing: [],
                event: 'VALID_BOOTSTRAP_STATIC_3',
            },
            12: {
                platform: 'azure_devops_pipeline_logs',
                contentExists: [
                    [
                        'spring.cloud.vault',
                    ],
                    [
                        'port',
                    ],
                ],
                contentMissing: [],
                event: 'VALID_BOOTSTRAP_STATIC_4',
            },
            13: {
                event: 'VALID_BOOTSTRAP_STATIC_3',
                platform: 'aws-accounts',
                checkType: 'aws-user-iam-policy',
                userName: 'test UserName',
                policyName: 'test policyName',
                contentMissing: ['testContentMissing'],
                contentExists: ['testContentExists'],
                valueMissing: '',
                valuePresent: '',
                securityGroupName: 'test securityGroupName',
                configCheck: 'test configCheck',
                bucketPrefixRegex: 'test bucketPrefixRegex',
                functionName: 'test functionName',
                resourcePath: 'test resourcePath',
                stage: 'test stage',
                method: 'test method',
                groupName: 'test groupName',
            },
        },
    },
    events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
        'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
        'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2', 'VALID_BOOTSTRAP_STATIC_3', 'VALID_BOOTSTRAP_STATIC_4'],
};

describe('StateMachineConfig', () => {
    let component;
    beforeEach(() => {
        component = shallow(<StateMachineConfig {...props} />);
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render correct number of checks', () => {
        const globalCheckContainer = component.find('.globalCheckContainer');
        expect(globalCheckContainer.props().children.length).toBe(Object.keys(props.config.checks).length);
    });

    it('Should render inputs', () => {
        const labName = component.find('.small-input').at(0);
        const CICDPlatform = component.find('.small-input').at(1);
        const CICDProjectName = component.find('.small-input').at(2);
        const resourceName = component.find('.small-input').at(3);
        const machineData = component.find('.small-input').at(4);
        const creds = component.find('.small-input').at(5);

        const addResourceButton = component.find('Button').at(0);
        addResourceButton.props().onClick();
        expect(component.instance().state.resources.length).toBe(2);
        expect(addResourceButton.props().children[0]).toBe('Add Resource');

        expect(labName.props().children[1].props.value).toBe(props.id);
        expect(labName.props().children[1].props.name).toBe('lab_id');
        expect(labName.props().children[1].props.disabled).toBe(true);

        expect(CICDPlatform.props().children[1].props.value).toBe(props.config.CICD_Platform);

        expect(CICDProjectName.props().children[1].props.value).toBe(props.config.CICD_ProjectName);
        expect(CICDProjectName.props().children[1].props.name).toBe('CICDProjectName');

        expect(resourceName.props().children[1].props.value).toBe(Object.keys(props.config.resources)[0]);
        expect(resourceName.props().children[1].props.name).toBe('name');

        expect(machineData.props().children[1].props.value).toBe(props.config.resources.Test.machineData[0]);
        expect(machineData.props().children[1].props.name).toBe('machineData');

        expect(creds.props().children[1].props.value).toBe(props.config.resources.Test.creds[0]);
        expect(creds.props().children[1].props.name).toBe('creds');
    });

    it('Should render checks dropdown', () => {
        let checksList = component.find('.filterSelect').at(1);
        const defaultValue = checksList.props().value;
        expect(defaultValue).toBe(component.instance().state.platform);

        component.setState({ CICDPlatform: 'gitab' });
        checksList = component.find('.filterSelect').at(1);
        const azureNotVisible = checksList.props().children.filter(item => item).every(el => !el.props.children.includes('Azure'));
        expect(azureNotVisible).toBe(true);

        component.setState({ CICDPlatform: 'azure_devops' });
        checksList = component.find('.filterSelect').at(1);
        const gitlabNotVisible = checksList.props().children.filter(item => item).every(el => !el.props.children.includes('GitLab'));
        expect(gitlabNotVisible).toBe(true);

        component.setState({ CICDPlatform: 'none' });
        checksList = component.find('.filterSelect').at(1);
        const azureAndGitlabNotVisible = checksList.props().children.filter(item => item)
            .every(el => !el.props.children.includes('Azure') && !el.props.children.includes('GitLab'));
        expect(azureAndGitlabNotVisible).toBe(true);
    });

    it('Should render add check button and add check on click', () => {
        const addCheckButton = component.find('Button').at(1);
        component.setState({ platform: 'GitLab' });
        expect(addCheckButton.props().children[0]).toBe('Add Check');
        addCheckButton.props().onClick();
        const globalCheckContainer = component.find('.globalCheckContainer');
        expect(globalCheckContainer.props().children.length).toBe(Object.keys(props.config.checks).length + 1);
    });

    it('Should add different checks on click', () => {
        const addCheckButton = component.find('Button').at(1);
        expect(addCheckButton.props().children[0]).toBe('Add Check');
        const platforms = ['GitLabApi', 'Vault', 'Kubernetes', 'GitlabPackageVersions', 'HealthCheck', 'ApiCheck',
            'GitlabPipelineLogs', 'GitlabDynamicConfigs', 'AWSS3', 'GCPBucket', 'AzureDevOpsFiles', 'AzureDevOpsPipelineLogs', 'AWSAccounts'];

        platforms.map((platform, i) => {
            component.setState({ platform });
            addCheckButton.props().onClick();
            const globalCheckContainer = component.find('.globalCheckContainer');
            expect(globalCheckContainer.props().children.length).toBe(Object.keys(props.config.checks).length + i + 1);
            return true;
        });
    });

    it('Should render save all button', () => {
        const button = component.find('Button').at(2);
        expect(button.props().children[0]).toBe('Save All');
        expect(button.props().type).toBe('primary');
    });

    it('Should render view event if checks and resources are null', () => {
        const props1 = {
            saveStateMachineConfig: jest.fn(() => Promise.resolve(true)),
            id: 102,
            config: {
                gitLabProjectName: 'Test',
                resources: null,
                checks: null,
            },
            events: ['VALID_HADOLINT', 'VALID_DOCKERFILE', 'VALID_CLAIR_CONFIG', 'VALID_PIPELINE_BREAK',
                'VALID_TEST', 'VALID_PIPELINE_TEST', 'VALID_TESTING', 'VALID_GITLAB_PIPELINE',
                'VALID_BOOTSTRAP_STATIC', 'VALID_BOOTSTRAP_STATIC_2'],
        };
        const component1 = shallow(<StateMachineConfig {...props1} />);
        expect(component1.exists()).toBeTruthy();
    });

    it('Should get the data from child component and assign', () => {
        const button = component.find('Button').at(2);
        expect(button.props().children[0]).toBe('Save All');
        expect(button.props().type).toBe('primary');
    });

    it('Should set CICD platform when selecting from dropdown', () => {
        const CICDPlatform = component.find('.small-input').at(1);
        const childrenCICDPlatform = CICDPlatform.props().children[1].props.children;
        expect(childrenCICDPlatform[0].props.value).toBe('none');
        expect(childrenCICDPlatform[1].props.value).toBe('gitlab');
        expect(childrenCICDPlatform[2].props.value).toBe('azure_devops');
        expect(component.instance().state.CICDPlatform).toBe(props.config.CICD_Platform);
        CICDPlatform.props().children[1].props.onChange('azure_devops');
        expect(component.instance().state.CICDPlatform).toBe('azure_devops');
        CICDPlatform.props().children[1].props.onChange('gitlab');
        expect(component.instance().state.CICDPlatform).toBe('gitlab');
    });

    it('Should reset CICD_ProjectName when CICD_Platform is set to none', () => {
        const CICDPlatform = component.find('.small-input').at(1);
        expect(component.instance().state.CICDProjectName).toBe(props.config.CICD_ProjectName);
        CICDPlatform.props().children[1].props.onChange('none');
        expect(component.instance().state.CICDPlatform).toBe('none');
        expect(component.instance().state.CICDProjectName).toBe('');
    });

    it('Should call `.handlePlatformChange()` and change `CICDPlatform` state', () => {
        const filterSelect = component.find('.filterSelect').at(0);

        expect(component.state().CICDPlatform).toBe('gitlab'); // initial state
        filterSelect.props().onChange('test');
        expect(component.state().CICDPlatform).toBe('test');
    });

    it('Should call `.deleteResource()` and delete first resources', () => {
        const instance = component.instance();
        const handleSpy = jest.spyOn(instance, 'deleteResource');

        expect(component.state().resources).toHaveLength(1);
        component.instance().deleteResource(0);
        expect(component.state().resources).toHaveLength(0);
        expect(handleSpy).toHaveBeenCalledTimes(1);
    });

    it('Should call `.handleResChange()` and delete first resources', () => {
        const instance = component.instance();
        const handleSpy = jest.spyOn(instance, 'handleResChange');
        const resourceInput = component.find('.resource-name');

        expect(component.state().resources[0].name).toBe('Test'); // initial state
        resourceInput.props().onChange({ target: { value: 'test2', name: 'name' } }, 0);
        expect(component.state().resources[0].name).toBe('test2');

        expect(handleSpy).toHaveBeenCalledTimes(1);
    });
});
