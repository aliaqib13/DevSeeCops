import React, { Component } from 'react';
import {
    Input, Button, Icon, Select, message,
} from 'antd';
import Gitlab from './checks/Gitlab';
import GitlabApi from './checks/GitlabApi';
import Vault from './checks/Vault';
import Kubernetes from './checks/Kubernetes';
import GitlabPackageVersions from './checks/GitlabPackageVersions';
import HealthCheck from './checks/HealthCheck';
import ApiCheck from './checks/ApiCheck';
import GitlabPipelineLogs from './checks/GitlabPipelineLogs';
import GitlabDynamicConfigs from './checks/GitlabDynamicConfigs';
import AwsS3 from './checks/AwsS3';
import GcpBucket from './checks/GcpBucket';
import AzureDevOpsFiles from './checks/AzureDevOpsFiles';
import AzureDevOpsPipelineLogs from './checks/AzureDevOpsPipelineLogs';
import { validateRegexpString } from '../../../../util/validators';
import AwsAccounts, { AwsAccountCheckConfig } from './checks/AwsAccounts/AwsAccounts';

const { Option } = Select;

class StateMachineConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: '',
            CICDPlatform: 'none',
            CICDProjectName: '',
            resources: [],
            selectedEvents: [],
            globalCheckContainer: [],

        };
    }

    componentDidMount() {
        const { config } = this.props;
        if (Object.keys(config).length) {
            const CICDPlatform = config.CICD_Platform || 'none';
            const CICDProjectName = config.CICD_ProjectName;
            const { resources, selectedEvents, globalCheckContainer } = this.state;
            if (config.resources) {
                Object.keys(config.resources).forEach(name => {
                    resources.push({
                        name,
                        machineData: config.resources[name].machineData.join(),
                        creds: config.resources[name].creds.join(),
                    });
                });
            }
            if (config.checks) {
                Object.keys(config.checks).forEach(number => {
                    const platformName = config.checks[number].platform;
                    if (platformName === 'gitlab-api') {
                        globalCheckContainer.push({ checkName: 'gitlabApi' });
                    } else if (platformName === 'gitlab-package-versions') {
                        globalCheckContainer.push({ checkName: 'gitlabPackageVersions' });
                    } else if (platformName === 'health-check') {
                        globalCheckContainer.push({ checkName: 'healthCheck' });
                    } else if (platformName === 'api-check') {
                        globalCheckContainer.push({ checkName: 'apiCheck' });
                    } else if (platformName === 'gitlab-job-logs') {
                        globalCheckContainer.push({ checkName: 'gitlabPipelineLogs' });
                    } else if (platformName === 'gitlab-dynamic-configs') {
                        globalCheckContainer.push({ checkName: 'gitlabDynamicConfigs' });
                    } else if (platformName === 'aws-s3') {
                        globalCheckContainer.push({ checkName: 'awsS3' });
                    } else if (platformName === 'aws-accounts') {
                        globalCheckContainer.push({ checkName: 'awsAccounts' });
                    } else if (platformName === 'gcp-bucket') {
                        globalCheckContainer.push({ checkName: 'gcpBucket' });
                    } else if (platformName === 'azure_devops_files') {
                        globalCheckContainer.push({ checkName: 'azureDevOpsFiles' });
                    } else if (platformName === 'azure_devops_pipeline_logs') {
                        globalCheckContainer.push({ checkName: 'azureDevOpsPipelineLogs' });
                    } else {
                        globalCheckContainer.push({ checkName: platformName });
                    }
                    selectedEvents.push(config.checks[number].event);
                    globalCheckContainer[globalCheckContainer.length - 1].data = config.checks[number];
                    const currentCheckData = globalCheckContainer[globalCheckContainer.length - 1].data;
                    delete currentCheckData.platform;
                    if (platformName === 'gitlab' || platformName === 'gitlab-job-logs' || platformName === 'gcp-bucket'
                        || platformName === 'azure_devops_files' || platformName === 'azure_devops_pipeline_logs' || platformName === 'aws-accounts') {
                        currentCheckData.contentExists = config.checks[number].contentExists.map(item => (
                            { value: item }
                        ));
                        currentCheckData.contentMissing = config.checks[number].contentMissing.map(item => (
                            { value: item }
                        ));
                        currentCheckData.valueMissing = '';
                        currentCheckData.valuePresent = '';
                    } else if (platformName === 'kubernetes') {
                        currentCheckData.resourceNames = config.checks[number].resourceNames.join();
                        currentCheckData.logs = config.checks[number].logs.join();
                    } else if (platformName === 'gitlab-package-versions') {
                        currentCheckData.versions = currentCheckData.contentExists[0][0].join();
                        currentCheckData.position = currentCheckData.contentExists[0][1];
                    } else if (platformName === 'api-check') {
                        if (currentCheckData.responseContains) {
                            currentCheckData.responseContains = currentCheckData.responseContains.map(item => (
                                item
                            ));
                        }
                        currentCheckData.responseContains = currentCheckData.responseContains
                            ? currentCheckData.responseContains.join() : '';
                    } else if (platformName === 'gitlab-api') {
                        currentCheckData.resourceName = currentCheckData.value;
                        delete currentCheckData.value;
                    } else if (platformName === 'gitlab-dynamic-configs') {
                        currentCheckData.contentExistBlock = [];
                        config.checks[number].contentExists.forEach((item, index) => {
                            currentCheckData.contentExistBlock[index] = {
                                contentExists: item.map(value => ({ value })),
                            };
                        });
                        currentCheckData.valuePresent = '';
                    } else if (platformName === 'aws-s3') {
                        currentCheckData.responseContains = config.checks[number].response_contains.map(item => (
                            { value: item }
                        ));
                        delete currentCheckData.response_contains;
                    }
                    this.setState({ selectedEvents, globalCheckContainer });
                });
            }
            this.setState({ resources, CICDPlatform, CICDProjectName });
        } else {
            const { resources } = this.state;
            resources.push({
                name: '',
                machineData: '',
                creds: '',
            });
            this.setState({ resources });
        }
    }

    handlePlatformChange = platform => {
        this.setState({ platform });
    };

    addResources = () => {
        const { resources } = this.state;
        resources.push({
            name: '',
            machineData: '',
            creds: '',
        });
        this.setState({ resources });
    };

    deleteBlock = index => {
        const { selectedEvents, globalCheckContainer } = this.state;
        const block = globalCheckContainer[index];
        selectedEvents.splice(selectedEvents.indexOf(block.data.event), 1);
        globalCheckContainer.splice(index, 1);
        this.setState({ globalCheckContainer, selectedEvents });
    };

    deleteResource = index => {
        const { resources } = this.state;
        resources.splice(index, 1);
        this.setState({ resources });
    };

    handleResChange = (e, index) => {
        const { resources } = this.state;
        const resource = resources[index];
        resource[e.target.name] = e.target.value;
        this.setState({ resources });
    };

    addCheck = () => {
        const { platform, globalCheckContainer } = this.state;
        if (!platform) {
            return message.error('Please select platform before adding');
        }
        let data;
        switch (platform) {
        case 'GitLab':
            data = {
                checkName: 'gitlab',
                data: {
                    file: '',
                    contentMissing: [],
                    contentExists: [],
                    valueMissing: '',
                    valuePresent: '',
                    event: '',
                },
            };
            break;
        case 'GitLabApi':
            data = {
                checkName: 'gitlabApi',
                data: {
                    resource: '',
                    resourceName: '',
                    event: '',
                },
            };
            break;
        case 'Vault':
            data = {
                checkName: 'vault',
                data: {
                    endpoint: '',
                    response: '',
                    event: '',
                },
            };
            break;
        case 'Kubernetes':
            data = {
                checkName: 'kubernetes',
                data: {
                    resources: [],
                    resource: '',
                    resourceNames: '',
                    logs: '',
                    event: '',
                },
            };
            break;
        case 'GitlabPackageVersions':
            data = {
                checkName: 'gitlabPackageVersions',
                data: {
                    file: '',
                    versions: '',
                    position: '',
                    event: '',
                },
            };
            break;
        case 'HealthCheck':
            data = {
                checkName: 'healthCheck',
                data: {
                    endpoint: '',
                    event: '',
                },
            };
            break;
        case 'ApiCheck':
            data = {
                checkName: 'apiCheck',
                data: {
                    resource: '',
                    endpoint: '',
                    authorization: '',
                    responseContains: '',
                    event: '',
                },
            };
            break;
        case 'GitlabPipelineLogs':
            data = {
                checkName: 'gitlabPipelineLogs',
                data: {
                    contentMissing: [],
                    contentExists: [],
                    valueMissing: '',
                    valuePresent: '',
                    event: '',
                },
            };
            break;
        case 'GitlabDynamicConfigs':
            data = {
                checkName: 'gitlabDynamicConfigs',
                data: {
                    file: '',
                    contentExistBlock: [{
                        contentExists: [],
                        valuePresent: '',
                    }],
                    event: '',
                },
            };
            break;
        case 'AWSS3':
            data = {
                checkName: 'awsS3',
                data: {
                    checkType: '',
                    responseContains: [],
                    value: '',
                    event: '',
                },
            };
            break;
        case 'GCPBucket':
            data = {
                checkName: 'gcpBucket',
                data: {
                    bucketId: '',
                    checkType: 'files',
                    contentMissing: [],
                    contentExists: [],
                    valueMissing: '',
                    valuePresent: '',
                    event: '',
                },
            };
            break;
        case 'AzureDevOpsFiles':
            data = {
                checkName: 'azureDevOpsFiles',
                data: {
                    file: '',
                    contentMissing: [],
                    contentExists: [],
                    valueMissing: '',
                    valuePresent: '',
                    event: '',
                },
            };
            break;
        case 'AzureDevOpsPipelineLogs':
            data = {
                checkName: 'azureDevOpsPipelineLogs',
                data: {
                    contentMissing: [],
                    contentExists: [],
                    valueMissing: '',
                    valuePresent: '',
                    event: '',
                },
            };
            break;
        case 'AWSAccounts':
            data = {
                checkName: 'awsAccounts',
                data: JSON.parse(JSON.stringify(AwsAccountCheckConfig)), // take deep copy of config object

            };
            break;
        default:
            break;
        }
        globalCheckContainer.push(data);
        this.setState({ globalCheckContainer });
        return true;
    };

    handleCICDProjectNameChange = e => {
        this.setState({ CICDProjectName: e.target.value });
    };

    handleEventChange = (value, index) => {
        const { selectedEvents } = this.state;
        const { globalCheckContainer } = this.state;
        const block = globalCheckContainer[index];
        selectedEvents.splice(selectedEvents.indexOf(block.data.event), 1);
        block.data.event = value;
        if (!selectedEvents.includes(value)) {
            selectedEvents.push(value);
        }
        this.setState({ globalCheckContainer, selectedEvents });
    };

    saveConfig = () => {
        const { id, saveStateMachineConfig } = this.props;
        const {
            CICDPlatform, CICDProjectName, resources, globalCheckContainer,
        } = this.state;
        const gitlabChecks = globalCheckContainer.filter(check => check.checkName === 'gitlab').map(item => item.data);
        const gitlabApiChecks = globalCheckContainer.filter(check => check.checkName === 'gitlabApi').map(item => item.data);
        const vaultChecks = globalCheckContainer.filter(check => check.checkName === 'vault').map(item => item.data);
        const kubernetesChecks = globalCheckContainer.filter(check => check.checkName === 'kubernetes').map(item => item.data);
        const gitlabPackageVersionsChecks = globalCheckContainer.filter(check => check.checkName === 'gitlabPackageVersions').map(item => item.data);
        const healthChecks = globalCheckContainer.filter(check => check.checkName === 'healthCheck').map(item => item.data);
        const apiChecks = globalCheckContainer.filter(check => check.checkName === 'apiCheck').map(item => item.data);
        const gitlabPipelineLogsChecks = globalCheckContainer.filter(check => check.checkName === 'gitlabPipelineLogs').map(item => item.data);
        const gitlabDynamicConfigsChecks = globalCheckContainer.filter(check => check.checkName === 'gitlabDynamicConfigs').map(item => item.data);
        const awsS3Checks = globalCheckContainer.filter(check => check.checkName === 'awsS3').map(item => item.data);
        const awsAccountsChecks = globalCheckContainer.filter(check => check.checkName === 'awsAccounts').map(item => item.data);
        const gcpBucketChecks = globalCheckContainer.filter(check => check.checkName === 'gcpBucket').map(item => item.data);
        const azureDevOpsFilesChecks = globalCheckContainer.filter(check => check.checkName === 'azureDevOpsFiles').map(item => item.data);
        const azureDevOpsPipelineLogsChecks = globalCheckContainer.filter(check => check.checkName === 'azureDevOpsPipelineLogs').map(item => item.data);
        const gitlabFileMissing = gitlabChecks.length ? gitlabChecks.find(item => !item.file) : false;
        const azureDevOpsFilesFileMissing = azureDevOpsFilesChecks.length
            ? azureDevOpsFilesChecks.find(item => !item.file) : false;
        const gitlabDynamicConfigsFileMissing = gitlabDynamicConfigsChecks.length
            ? gitlabDynamicConfigsChecks.find(item => !item.file) : false;
        const gitlabPackageVersionsFileMissing = gitlabPackageVersionsChecks.length
            ? gitlabPackageVersionsChecks.find(item => !item.file) : false;
        const gitlabContentMissing = gitlabChecks.length
            ? gitlabChecks.find(item => !item.contentMissing.length && !item.contentExists.length) : false;
        const gitlabPipelineLogsContentMissing = gitlabPipelineLogsChecks.length
            ? gitlabPipelineLogsChecks.find(item => !item.contentMissing.length && !item.contentExists.length) : false;
        const gitlabPipelineLogsEventMissing = gitlabPipelineLogsChecks.length
            ? gitlabPipelineLogsChecks.find(item => !item.event) : false;
        const gitlabDynamicConfigsEventMissing = gitlabDynamicConfigsChecks.length
            ? gitlabDynamicConfigsChecks.find(item => !item.event) : false;
        const gitlabEventMissing = gitlabChecks.length ? gitlabChecks.find(item => !item.event) : false;
        const gitlabApiEventMissing = gitlabApiChecks.length ? gitlabApiChecks.find(item => !item.event) : false;
        const vaultEventMissing = vaultChecks.length ? vaultChecks.find(item => !item.event) : false;
        const kubernetesEventMissing = kubernetesChecks.length ? kubernetesChecks.find(item => !item.event) : false;
        const gitlabPackageVersionsEventMissing = gitlabPackageVersionsChecks.length
            ? gitlabPackageVersionsChecks.find(item => !item.event) : false;
        const healthCheckEventMissing = healthChecks.length ? healthChecks.find(item => !item.event) : false;
        const apiCheckEventMissing = apiChecks.length ? apiChecks.find(item => !item.event) : false;
        const awsS3EventMissing = awsS3Checks.length ? awsS3Checks.find(item => !item.event) : false;
        const awsAccountsEventMissing = awsAccountsChecks.length ? awsAccountsChecks.find(item => !item.event) : false;
        const awsAccountsUserNameMissing = awsAccountsChecks.length
            ? awsAccountsChecks.find(item => !item.userName) : false;
        const awsAccountsPolicyNameMissing = awsAccountsChecks.length
            ? awsAccountsChecks.find(item => !item.policyName) : false;
        const gcpBucketEventMissing = gcpBucketChecks.length ? gcpBucketChecks.find(item => !item.event) : false;
        const azureDevOpsFilesEventMissing = azureDevOpsFilesChecks.length
            ? azureDevOpsFilesChecks.find(item => !item.event) : false;
        const azureDevOpsPipelineLogsEventMissing = azureDevOpsPipelineLogsChecks.length
            ? azureDevOpsPipelineLogsChecks.find(item => !item.event) : false;
        const gcpBucketIdMissing = gcpBucketChecks.length ? gcpBucketChecks.find(item => !item.bucketId) : false;
        const vaultEndpointMissing = vaultChecks.length ? vaultChecks.find(item => !item.endpoint) : false;
        const apiCheckEndpointMissing = apiChecks.length ? apiChecks.find(item => !item.endpoint) : false;
        const healthCheckEndpointMissing = healthChecks.length ? healthChecks.find(item => !item.endpoint) : false;
        const kubernetesResourcesMissing = kubernetesChecks.length
            ? kubernetesChecks.find(item => !item.resources.length || !item.resourceNames) : false;
        const gitlabApiResourcesMissing = gitlabApiChecks.length
            ? gitlabApiChecks.find(item => !item.resource || !item.resourceName) : false;
        const apiCheckResourcesMissing = apiChecks.length ? apiChecks.find(item => !item.resource) : false;
        const resourcesMissing = !resources.length || resources.find(item => !item.name);
        const gitlabPackageVersionsVersionsMissing = gitlabPackageVersionsChecks.length
            ? gitlabPackageVersionsChecks.find(item => !item.versions) : false;
        const gitlabPackageVersionsPositionMissing = gitlabPackageVersionsChecks.length ? gitlabPackageVersionsChecks.find(item => item.position === '') : false;
        const apiCheckResponseContainsMissing = apiChecks.length
            ? apiChecks.find(item => !item.responseContains) : false;
        const apiCheckAuthorizationMissing = apiChecks.length ? apiChecks.find(item => !item.authorization) : false;
        const gitlabDynamicConfigsContentMissing = gitlabDynamicConfigsChecks.length
            ? gitlabDynamicConfigsChecks.find(item => !item.contentExistBlock.length) : false;

        const gitlabDynamicConfigsContentsMissingArr = gitlabDynamicConfigsChecks.length
            ? gitlabDynamicConfigsChecks.map(item => item.contentExistBlock.map(obj => !obj.contentExists.length))
            : [false];
        let concated = [];
        gitlabDynamicConfigsContentsMissingArr.forEach(item => {
            concated = concated.concat(item);
        });
        const gitlabDynamicConfigsContentsMissing = concated.filter(item => item === true).length;
        const awsS3CheckTypeMissing = awsS3Checks.length ? awsS3Checks.find(item => !item.checkType) : false;
        const awsS3ResponseContainsMissing = awsS3Checks.length
            ? awsS3Checks.find(item => !item.responseContains.length) : false;
        const awsAccountCheckTypeMissing = awsAccountsChecks.length
            ? awsAccountsChecks.find(item => !item.checkType) : false;
        const iamGCPBuckets = gcpBucketChecks.filter(item => item.checkType === 'iam');
        const regexpInValid = iamGCPBuckets.some(item => item.contentMissing.some(el => !validateRegexpString(el.value))
            || item.contentExists.some(el => !validateRegexpString(el.value)));
        const azureDevOpsFilesContentMissing = azureDevOpsFilesChecks.length
            ? azureDevOpsFilesChecks.find(item => !item.contentMissing.length && !item.contentExists.length) : false;
        const azureDevOpsPipelineLogsContentMissing = azureDevOpsPipelineLogsChecks.length
            ? azureDevOpsPipelineLogsChecks.find(item => !item.contentMissing.length && !item.contentExists.length)
            : false;
        if (gitlabEventMissing || gitlabApiEventMissing || vaultEventMissing || kubernetesEventMissing
            || gitlabPackageVersionsEventMissing || healthCheckEventMissing || apiCheckEventMissing
            || gitlabPipelineLogsEventMissing || gitlabDynamicConfigsEventMissing || awsS3EventMissing
            || gcpBucketEventMissing || azureDevOpsFilesEventMissing || azureDevOpsPipelineLogsEventMissing
            || awsAccountsEventMissing) {
            message.error('Events should not be empty');
        } else if (gitlabApiResourcesMissing || kubernetesResourcesMissing
            || resourcesMissing || apiCheckResourcesMissing) {
            message.error('Resource info should not be empty');
        } else if (awsAccountsUserNameMissing && awsAccountsUserNameMissing.checkType === 'aws-user-iam-policy') {
            message.error('User name should not be empty');
        } else if (awsAccountsPolicyNameMissing && awsAccountsPolicyNameMissing.checkType === 'aws-user-iam-policy') {
            message.error('Policy name should not be empty');
        } else if (vaultEndpointMissing || healthCheckEndpointMissing || apiCheckEndpointMissing) {
            message.error('Endpoints should not be empty');
        } else if (gitlabFileMissing || gitlabPackageVersionsFileMissing
            || gitlabDynamicConfigsFileMissing || azureDevOpsFilesFileMissing) {
            message.error('Files should not be empty');
        } else if (gitlabContentMissing) {
            message.error('Missing or Present content for gitlab should not be empty');
        } else if (gitlabPackageVersionsVersionsMissing || gitlabPackageVersionsPositionMissing) {
            message.error('GitLab Package Versions check is not complete');
        } else if (apiCheckResponseContainsMissing || apiCheckAuthorizationMissing) {
            message.error('Api check is not complete');
        } else if (gitlabDynamicConfigsContentMissing || gitlabDynamicConfigsContentsMissing) {
            message.error('Contains content for Gitlab Dynamic Configs should not be empty');
        } else if (gitlabPipelineLogsContentMissing) {
            message.error('Missing or Contains content for Gitlab Pipeline Logs should not be empty');
        } else if (azureDevOpsFilesContentMissing) {
            message.error('Missing or Contains content for Azure DevOps Files should not be empty');
        } else if (azureDevOpsPipelineLogsContentMissing) {
            message.error('Missing or Contains content for Azure DevOps Pipeline Logs should not be empty');
        } else if (awsS3CheckTypeMissing || awsS3ResponseContainsMissing) {
            message.error('AWS S3 is not complete');
        } else if (awsAccountCheckTypeMissing) {
            message.error('AWS Account CheckType is not selected');
        } else if (regexpInValid) {
            message.error('GCP Bucket contents should be regexp strings in case of type iam');
        } else if (gcpBucketIdMissing) {
            message.error('GCP Bucket id should not be empty');
        } else {
            const data = {
                labID: id,
                resources: {},
                CICD_Platform: CICDPlatform,
                CICD_ProjectName: CICDProjectName,
                checks: {},
            };
            resources.forEach(resource => {
                data.resources[resource.name] = {
                    machineData: resource.machineData.split(','),
                    creds: resource.creds.split(','),
                };
            });
            globalCheckContainer.forEach(block => {
                const check = block.data;
                if (block.checkName === 'gitlab') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gitlab',
                        file: check.file,
                        contentExists: check.contentExists.map(content => content.value),
                        contentMissing: check.contentMissing.map(content => content.value),
                        event: check.event,
                    };
                } else if (block.checkName === 'gitlabApi') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gitlab-api',
                        resource: check.resource,
                        value: check.resourceName,
                        event: check.event,
                    };
                } else if (block.checkName === 'vault') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'vault',
                        endpoint: check.endpoint,
                        response: check.response,
                        event: check.event,
                    };
                } else if (block.checkName === 'kubernetes') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'kubernetes',
                        resources: check.resources,
                        resourceNames: check.resourceNames.split(','),
                        logs: check.logs.split(','),
                        event: check.event,
                    };
                } else if (block.checkName === 'gitlabPackageVersions') {
                    const versionsContainer = check.versions.split(',');
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gitlab-package-versions',
                        file: check.file,
                        contentExists: [
                            [
                                versionsContainer,
                                check.position,
                            ],
                        ],
                        event: check.event,
                    };
                } else if (block.checkName === 'healthCheck') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'health-check',
                        endpoint: check.endpoint,
                        event: check.event,
                    };
                } else if (block.checkName === 'apiCheck') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'api-check',
                        resource: check.resource,
                        endpoint: check.endpoint,
                        authorization: check.authorization,
                        responseContains: check.responseContains.split(','),
                        event: check.event,
                    };
                } else if (block.checkName === 'gitlabPipelineLogs') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gitlab-job-logs',
                        contentExists: check.contentExists.map(content => (
                            content.value
                        )),
                        contentMissing: check.contentMissing.map(content => (
                            content.value
                        )),
                        event: check.event,
                    };
                } else if (block.checkName === 'gitlabDynamicConfigs') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gitlab-dynamic-configs',
                        file: check.file,
                        contentExists: check.contentExistBlock.map(content => (
                            content.contentExists.map(item => (
                                item.value
                            ))
                        )),
                        event: check.event,
                    };
                } else if (block.checkName === 'awsS3') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'aws-s3',
                        checkType: check.checkType,
                        response_contains: check.responseContains.map(item => (
                            item.value
                        )),
                        event: check.event,
                    };
                } else if (block.checkName === 'gcpBucket') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'gcp-bucket',
                        checkType: check.checkType,
                        bucketId: check.bucketId,
                        contentExists: check.contentExists.map(content => (
                            content.value
                        )),
                        contentMissing: check.contentMissing.map(content => (
                            content.value
                        )),
                        event: check.event,
                    };
                } else if (block.checkName === 'awsAccounts') {
                    // Send the specific data for each check type
                    if (check.checkType === 'aws-user-iam-policy') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            userName: check.userName,
                            policyName: check.policyName,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 'guard-duty') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,

                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 'ec2-security-groups') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            securityGroupName: check.securityGroupName,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 's3-bucket') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            configCheck: check.configCheck,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 'lambda') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            configCheck: check.configCheck,
                            functionName: check.functionName,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 'api-gateway') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            method: check.method,
                            stage: check.stage,
                            configCheck: check.configCheck,
                            resourcePath: check.resourcePath,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    } else if (check.checkType === 'aws-group-iam-policy') {
                        data.checks[Object.keys(data.checks).length + 1] = {
                            platform: 'aws-accounts',
                            checkType: check.checkType,
                            groupName: check.groupName,
                            policyName: check.policyName,
                            contentExists: check.contentExists.map(content => (
                                content.value
                            )),
                            contentMissing: check.contentMissing.map(content => (
                                content.value
                            )),
                            event: check.event,
                        };
                    }
                } else if (block.checkName === 'azureDevOpsFiles') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'azure_devops_files',
                        file: check.file,
                        contentExists: check.contentExists.map(content => (
                            content.value
                        )),
                        contentMissing: check.contentMissing.map(content => (
                            content.value
                        )),
                        event: check.event,
                    };
                } else if (block.checkName === 'azureDevOpsPipelineLogs') {
                    data.checks[Object.keys(data.checks).length + 1] = {
                        platform: 'azure_devops_pipeline_logs',
                        contentExists: check.contentExists.map(content => (
                            content.value
                        )),
                        contentMissing: check.contentMissing.map(content => (
                            content.value
                        )),
                        event: check.event,
                    };
                }
            });

            saveStateMachineConfig(data).then(res => {
                if (res === true) {
                    message.success('Successfully saved');
                } else {
                    message.error(res.message);
                }
                return true;
            }).catch(err => console.error('Failed to save state machine config: ', err));
        }
    };

    moveUp = index => {
        const { globalCheckContainer } = this.state;
        const current = JSON.stringify(globalCheckContainer[index]);
        globalCheckContainer[index] = globalCheckContainer[index - 1];
        globalCheckContainer[index - 1] = JSON.parse(current);
        this.setState({ globalCheckContainer });
    };

    moveDown = index => {
        const { globalCheckContainer } = this.state;
        const current = JSON.stringify(globalCheckContainer[index]);
        globalCheckContainer[index] = globalCheckContainer[index + 1];
        globalCheckContainer[index + 1] = JSON.parse(current);
        this.setState({ globalCheckContainer });
    };

    getData = (index, item) => {
        const { globalCheckContainer } = this.state;
        this.setState({
            globalCheckContainer: globalCheckContainer.map((obj, i) => {
                if (i === index) {
                    return {
                        ...obj,
                        data: item,
                    };
                }
                return obj;
            }),
        });
    };

    changeCICDPlatform = value => {
        const data = { CICDPlatform: value };
        if (value === 'none') {
            data.CICDProjectName = '';
        }
        this.setState(data);
    };

    render() {
        const { id, events } = this.props;
        const {
            platform, resources, selectedEvents, globalCheckContainer, CICDPlatform, CICDProjectName,
        } = this.state;

        return (
            <div className="editCourse">
                <div className="actions-top-block">
                    <div className="small-input">
                        <span className="inputSpan">Lab Id</span>
                        <Input name="lab_id" value={id} disabled />
                    </div>
                    <div className="small-input state-block" style={{ width: '80%' }}>
                        <span className="inputSpan">CICD Platform</span>
                        <Select
                            value={CICDPlatform}
                            style={{ width: '100%' }}
                            className="filterSelect"
                            onChange={this.changeCICDPlatform}
                        >
                            <Option value='none'>None</Option>
                            <Option value='gitlab'>Gitlab</Option>
                            <Option value='azure_devops'>Azure Devops</Option>
                        </Select>
                    </div>
                    {CICDPlatform !== 'none' && (
                        <div className="small-input state-block" style={{ width: '80%' }}>
                            <span className="inputSpan">CICD Project Name</span>
                            <Input
                                name="CICDProjectName"
                                value={CICDProjectName}
                                onChange={this.handleCICDProjectNameChange}
                            />
                        </div>
                    )}
                    <Button type="primary" onClick={this.addResources}>
                        Add Resource
                        <Icon type="save" />
                    </Button>
                    <h2 className="state-block">Resources</h2>
                    {
                        resources.map((resource, index) => (
                            <div className="state-block" key={index}>
                                {index > 0 && (
                                    <Button
                                        type="danger"
                                        className="delete-state"
                                        onClick={() => this.deleteResource(index)}
                                    >
                                        <Icon type="delete" />
                                    </Button>
                                )}
                                <div style={{ width: '80%' }}>
                                    <hr />
                                    <div className="small-input ">
                                        <span className="inputSpan">Resource Name</span>
                                        <Input
                                            name="name"
                                            className='resource-name'
                                            value={resource.name}
                                            onChange={e => this.handleResChange(e, index)}
                                        />
                                    </div>
                                    <div className="small-input">
                                        <span className="inputSpan">Machine Data</span>
                                        <Input
                                            name="machineData"
                                            value={resource.machineData}
                                            onChange={e => this.handleResChange(e, index)}
                                        />
                                    </div>
                                    <div className="small-input">
                                        <span className="inputSpan">Credentials</span>
                                        <Input
                                            name="creds"
                                            value={resource.creds}
                                            onChange={e => this.handleResChange(e, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="check-block">
                        <h2 className="state-block">
                            Checks
                            <span style={{ fontSize: '15px' }}> (select and add)</span>
                        </h2>
                        <Select
                            className="filterSelect"
                            style={{ width: '30%' }}
                            value={platform}
                            onChange={this.handlePlatformChange}
                        >
                            {CICDPlatform === 'gitlab' && <Option value="GitLab">GitLab</Option>}
                            {CICDPlatform === 'gitlab' && <Option value="GitLabApi">GitLab API</Option>}
                            <Option value="Vault">Vault</Option>
                            <Option value="Kubernetes">Kubernetes</Option>
                            {CICDPlatform === 'gitlab' && <Option value="GitlabPackageVersions">GitLab Package Versions</Option>}
                            <Option value="HealthCheck">Health Check</Option>
                            <Option value="ApiCheck">API Check</Option>
                            {CICDPlatform === 'gitlab' && <Option value="GitlabPipelineLogs">GitLab Pipeline Logs</Option>}
                            {CICDPlatform === 'gitlab' && <Option value="GitlabDynamicConfigs">GitLab Dynamic Configs</Option>}
                            <Option value="AWSS3">AWS S3</Option>
                            <Option value="AWSAccounts">AWS-Accounts</Option>
                            <Option value="GCPBucket">GCP Bucket</Option>
                            {CICDPlatform === 'azure_devops' && <Option value="AzureDevOpsFiles">Azure DevOps Files</Option>}
                            {CICDPlatform === 'azure_devops' && <Option value="AzureDevOpsPipelineLogs">Azure DevOps Pipeline Logs</Option>}
                        </Select>
                        <Button type="primary" onClick={this.addCheck} className="space-left">
                            Add Check
                            <Icon type="save" />
                        </Button>
                        <div className="globalCheckContainer">
                            {globalCheckContainer.map((item, index) => {
                                switch (item.checkName) {
                                case 'gitlab':
                                    return (
                                        <Gitlab
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'gitlabApi':
                                    return (
                                        <GitlabApi
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'vault':
                                    return (
                                        <Vault
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'kubernetes':
                                    return (
                                        <Kubernetes
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'gitlabPackageVersions':
                                    return (
                                        <GitlabPackageVersions
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'healthCheck':
                                    return (
                                        <HealthCheck
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'apiCheck':
                                    return (
                                        <ApiCheck
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'gitlabPipelineLogs':
                                    return (
                                        <GitlabPipelineLogs
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'gitlabDynamicConfigs':
                                    return (
                                        <GitlabDynamicConfigs
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'awsS3':
                                    return (
                                        <AwsS3
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'gcpBucket':
                                    return (
                                        <GcpBucket
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );

                                case 'azureDevOpsFiles':
                                    return (
                                        <AzureDevOpsFiles
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'azureDevOpsPipelineLogs':
                                    return (
                                        <AzureDevOpsPipelineLogs
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                case 'awsAccounts':
                                    return (
                                        <AwsAccounts
                                            index={index}
                                            item={item.data}
                                            events={events}
                                            selectedEvents={selectedEvents}
                                            handleEventChange={this.handleEventChange}
                                            deleteBlock={this.deleteBlock}
                                            giveData={this.getData}
                                            containerLength={globalCheckContainer.length}
                                            moveDown={this.moveDown}
                                            moveUp={this.moveUp}
                                        />
                                    );
                                default:
                                    return <div />;
                                }
                            })}
                        </div>
                    </div>
                    <div className="state-block">
                        <Button type="primary" onClick={this.saveConfig}>
                            Save All
                            <Icon type="save" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StateMachineConfig;
