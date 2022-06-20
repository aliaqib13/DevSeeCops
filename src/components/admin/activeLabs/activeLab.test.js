import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ActiveLabs from './activeLabs';

const labs = [
    {
        id: 3,
        active_course_id: 4,
        lab_id: 3,
        user_id: 3,
        status: 1,
        progress: 'Pending',
        duration: 3,
        lab_end_at: 1592992980,
        max_hint_count: 4,
        hint_is_open: null,
        start_time: '2020-06-22T10:17:00.000Z',
        stop_time: null,
        created_at: '2020-06-22 14:16:59',
        updated_at: '2020-06-24 11:03:00',
        completed_failed_steps: '{"completed":[2,3,4],"failed":[0,1]}',
        user: {
            id: 3,
            firstname: 'Henry',
            lastname: 'Tovmasyan',
            certificate_name: 'Henry Tovmasyan',
            email: 'henry@araido.io',
            activated: 1,
            coordinator: null,
            created_at: '2020-06-08 15:11:52',
            updated_at: '2020-06-22 14:15:30',
            roles: [
                {
                    id: 1,
                    slug: 'administrator',
                    name: 'Administrator',
                    description: 'manage administration privileges',
                    created_at: '2020-06-08 15:11:52',
                    updated_at: '2020-06-08 15:11:52',
                    pivot: {
                        role_id: 1,
                        user_id: 3,
                    },
                },
            ],
        },
        lab: {
            id: 3,
            name: 'Container Security in CI/CD',
            slug: 'container-security-cicd-aws',
            course_id: 4,
            signature_author_id: null,
            author_signature: null,
            platform: 'AWS',
            description: 'In this lab you will learn how to implement container security in a CI/CD pipeline using Gitlab',
            available_time: '3m',
            max_hint_count: 4,
            hands_on_desc: 'This lab lets you choose a customized lab environment providing hands-on practices',
            hands_on_title: 'Hands on',
            created_at: '2020-06-08 15:11:52',
            updated_at: '2020-06-08 15:11:52',
            application_language: null,
            step: {
                id: 1,
                lab_id: 3,
                content: [
                    {
                        title: 'Start here',
                        contentBlocks: [
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'We have prepared a Gitlab environment for you that will hold two repositories for container security and container compliance respectively. Also preconfigured pipelines will be there that will build the docker image and run the tools (will become visible under "CI / CD" => "Pipelines"). We have choosen Gitlab because Gitlab has an online Web IDE, you can access that by going to the Project home and click on Web IDE. It also contains a docker repository. Two tools are being used to apply checks 1) Anchore : Analyse Docker Image for vulnerability and compliance. 2) Hadolint: Build best practice docker images.',
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
                    {
                        title: 'Container Security',
                        contentBlocks: [
                            {
                                type: 'SingleText',
                                content: {
                                    text: "Go to the first repository called container-security. Edit \"gitlab-ci.yml\" file and replace <YOUR_GITLAB_REGISTRY_URL> with actual value that will be found under \"Registry\" in your Gitlab instance, for example \"ec2-3-123-232-60.training.araido.io:5555/root/container-security\". When you update this value and commit the code from Web IDE a pipeline will be triggered and your docker image will be scanned for any security issues(CVE's). Since the current Dockerfile example contains an old nginx version as a base image, it contains several high security issues so the pipline will fail. You can see the pipeline output by going to Pipelines and click on the Pipeline Number. After that you will see 2 stages \"Lint\" and \"container_build\". For now only the container_build stage is relevant.",
                                },
                            },
                            {
                                type: 'CodeSnippet',
                                content: {
                                    code: '\nFROM nginx:1.11.1\nCOPY test.html /usr/share/nginx/html',
                                    language: 'bash',
                                },
                            },
                            {
                                type: 'SingleText',
                                content: {
                                    text: "After seeing the security issues and the pipeline fail. edit \"Dockerfile\" file and upgrade the nginx base image from \"nginx:1.11.1\" to the latest version e.g. nginx:1.17.3. You can find the latest nginx docker version from https://hub.docker.com/_/nginx. When you update this value and commit the code from the Web IDE the pipeline will be triggered again and your docker image will be scanned for any issues(CVE's). It will be successfull if there are no high severity issues found. ",
                                },
                            },
                            {
                                type: 'CodeSnippet',
                                content: {
                                    code: '\nFROM nginx:1.17.3\nCOPY test.html /usr/share/nginx/html',
                                    language: 'bash',
                                },
                            },
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'If the pipeline runs successfully: Congratulations! You have fixed the security issues and can now move into the next step where we will be looking at the compliance side.',
                                },
                            },
                        ],
                    },
                    {
                        title: 'Container Compliance',
                        contentBlocks: [
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'Go to the second repository called container-compliance. Edit "gitlab-ci.yml" file and replace <YOUR_GITLAB_REGISTRY_URL> with actual value that will be found under "Registry" in your Gitlab instance for example "ec2-3-123-232-60.training.araido.io:5555/root/container-compliance". When you update this value and commit the code from Web IDE a pipeline will be triggered. Hadolint will perform linting on the Dockerfile for best practice Docker images. The pipeline will fail because of the "RUN apk upgrade" command in the Dockerfile. A message will be also printed in the pipeline explaing the reason behind this failure. Hadolint : https://github.com/hadolint/hadolint',
                                },
                            },
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'You need to comment the line that contain "RUN apk upgrade" in Dockerfile by adding "#" in front or remove the line completely. Once these changes have been done in the Dockerfile the pipeline will trigger and the hadolint step will pass successfully. This time the pipeline will fail because of our anchore compliance image scan because of "EXPOSE 22" in the Dockerfile.',
                                },
                            },
                            {
                                type: 'CodeSnippet',
                                content: {
                                    code: '\nFROM nginx:1.17.3\n\n#Below line exposes the port 22\nEXPOSE 22\n\nCOPY test.html /usr/share/nginx/html',
                                    language: 'bash',
                                },
                            },
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'Edit the "Dockerfile" file and remove the line that is exposing port 22. Once the Dockerfile has been edited and commited a pipeline will be triggered and it will complete successfully.',
                                },
                            },
                            {
                                type: 'CodeSnippet',
                                content: {
                                    code: '\nFROM nginx:1.17.3\nCOPY test.html /usr/share/nginx/html',
                                    language: 'bash',
                                },
                            },
                        ],
                    },
                    {
                        title: 'Congratulations!',
                        contentBlocks: [
                            {
                                type: 'SingleText',
                                content: {
                                    text: 'Congratulations! You have successfully passed the container security course! You have learned how to lint your Dockerfile and how to scan for security issues as well for misconfigurations!',
                                },
                            },
                        ],
                    },
                    {
                        title: 'test',
                        contentBlocks: [
                            {
                                type: 'DropdownHint',
                                content: {
                                    hint_id: null,
                                    hintTitle: '',
                                    remember_token: 'd47l5ovv',
                                    warningMessage: '',
                                },
                            },
                        ],
                    },
                ],
                created_at: '2020-06-08 15:11:52',
                updated_at: '2020-06-12 11:43:31',
            },
        },
        selectedSteps: [
            {
                id: 2,
                user_id: 8,
                course_theory_id: null,
                labsteps_id: 1,
                theory_step: null,
                lab_step: 4,
                created_at: '2020-06-22 12:38:59',
                updated_at: '2020-06-22 12:39:04',
            },
            {
                id: 4,
                user_id: 3,
                course_theory_id: null,
                labsteps_id: 1,
                theory_step: null,
                lab_step: 2,
                created_at: '2020-06-23 12:01:54',
                updated_at: '2020-06-23 13:46:53',
            },
        ],
        jobs: [
            {
                id: 3,
                created_at: '2020-06-22 14:16:59',
                updated_at: '2020-06-22 14:16:59',
                job_number: null,
                user_id: 3,
                active_lab_id: 3,
                status: 'CREATING',
                progress: 0,
                debug_info: null,
                job_resources: null,
                automated: 0,
                scheduled_deletion_time: null,
            },
            {
                id: 4,
                created_at: '2020-06-22 14:16:59',
                updated_at: '2020-06-22 14:16:59',
                job_number: null,
                user_id: 3,
                active_lab_id: 3,
                status: 'CREATING',
                progress: 0,
                debug_info: null,
                job_resources: null,
                automated: 0,
                scheduled_deletion_time: null,
            },
        ],
        resources: [
        ],
        activeCourse: {
            id: 4,
            course_id: 4,
            user_id: 3,
            theory_progress: null,
            user_level: 'Advanced',
            created_at: '2020-06-22 14:14:53',
            updated_at: '2020-06-22 14:16:59',
            finished: 0,
        },
    }];
const props = {
    labs,
};
describe('ActiveLab', () => {
    let component;
    beforeEach(() => component = shallow(<ActiveLabs {...props} />));

    it('should render activeLabs component successfully', () => {
        expect(component.exists()).toEqual(true);
    });

    it('should have one table for activeLabs there', () => {
        expect(component.find('.active-labs-table').length).toEqual(1);
    });

    it('table should have 9 columns', () => {
        expect(component.find('.active-labs-row').length).toEqual(9);
    });

    it('must display data in correct columns', () => {
        let currentStep = '';
        labs[0].selectedSteps.map(item => {
            (item.user_id === labs[0].user.id) ? currentStep = item.lab_step : '';
        });
        expect(component.find('withStore(Table)').props().children[0].props.render('text', labs[0]).props.children.props.children[0]).toEqual(labs[0].user.firstname);
        expect(component.find('withStore(Table)').props().children[1].props.render('text', labs[0]).props.children.props.children[0]).toEqual(labs[0].user.lastname);
        expect(component.find('withStore(Table)').props().children[2].props.render('text', labs[0]).props.children.props.children[0]).toEqual(labs[0].user.email);
        expect(component.find('withStore(Table)').props().children[3].props.render('text', labs[0])[0].props.children).toEqual(labs[0].user.roles[0].name);
        expect(component.find('withStore(Table)').props().children[4].props.render('text', labs[0])).toEqual(moment(labs[0].start_time).format('DD-MM-YYYY HH:mm:ss'));
        expect(component.find('withStore(Table)').props().children[5].props.render('text', labs[0])).toEqual(labs[0].lab.name);
        expect(component.find('withStore(Table)').props().children[6].props.render('text', labs[0])[1].props.children.props.children[1]).toEqual(currentStep + 1);
    });
});
