import React from 'react';
import { shallow } from 'enzyme';
import { JobInfo } from './JobInfo';

describe('LabsHistory', () => {
    let component;
    const props = {
        location: {
            state: {
                debug_info: 'test debug_info',
                job_resources: '{"test" :"job_resources"}',
            },
        },
    };

    beforeEach(() => {
        component = shallow(<JobInfo {...props} />);
    });

    it('Should render JobInfo component successfully', () => {
        expect(component).toHaveLength(1);
    });

    it('Should render .job-info-container element successfully', () => {
        const wrapper = component.find('.job-info-container');
        expect(wrapper).toHaveLength(1);
    });

    it('Should render Back button with text `Back` successfully', () => {
        const wrapper = component.find('.job-info-container');
        const backButton = wrapper.find('Button').first();
        expect(backButton).toHaveLength(1);
        expect(backButton.childAt(2).text()).toEqual('Back');
    });

    it('Should render `debug info` heading successfully', () => {
        const wrapper = component.find('.job-info-container');
        const debugInfoHeading = wrapper.find('Descriptions').first();
        expect(debugInfoHeading).toHaveLength(1);
        expect(debugInfoHeading.get(0).props.title).toEqual('Debug Info');
        expect(debugInfoHeading.html()).toContain('Debug Info');
    });

    it('Should render the value of `debug info` successfully', () => {
        const wrapper = component.find('.job-info-container');
        const debugInformation = wrapper.find('.job-info-description');
        expect(debugInformation.first().html()).toEqual(props.location.state.debug_info);
    });

    it('Should render `job resource` heading successfully', () => {
        const wrapper = component.find('.job-info-container');
        const jobResourceHeading = wrapper.find('Descriptions').at(1);
        expect(jobResourceHeading).toHaveLength(1);
        expect(jobResourceHeading.get(0).props.title).toEqual('Job Resources');
        expect(jobResourceHeading.html()).toContain('Job Resources');
    });

    it('Should render the value of `job resource` when there is not `Kubeconfig` successfully', () => {
        const wrapper = component.find('.job-info-container');
        const jobResources = wrapper.find('.job-info-description');
        expect(jobResources.at(1).childAt(0).text()).toEqual(props.location.state.job_resources);
        expect(jobResources.find('Button[type="primary"]')).toHaveLength(0);
    });

    it('Should render the value of `job resource` with button when there is `Kubeconfig` successfully', () => {
        const newProps = {
            location: { state: { job_resources: '{"Kubeconfig":{"kubeconfig":"test"}}' } },
        };
        const component = shallow(<JobInfo {...newProps} />);
        const wrapper = component.find('.job-info-container');
        const jobResources = wrapper.find('.job-info-description');
        expect(jobResources.at(1).childAt(0).text()).toEqual(newProps.location.state.job_resources);
        expect(jobResources.get(1).props.children[1].props.children).toEqual('Download Kubeconfig');
    });

    it('Should render button with text `Download Kubeconfig` when job resource contains `Kubeconfig` successfully', () => {
        const newProps = {
            location: { state: { job_resources: '{"Kubeconfig":{"kubeconfig":"test"}}' } },
        };
        const component = shallow(<JobInfo {...newProps} />);
        const wrapper = component.find('.job-info-container');
        const jobResources = wrapper.find('.job-info-description');
        const jobResourceDownloadButton = jobResources.find('Button[type="primary"]');
        expect(jobResourceDownloadButton.childAt(0).text()).toBe('Download Kubeconfig');
    });

    it('Should call `.downloadConfigFile()` function when the button `Download Kubeconfig` clicked', () => {
        global.URL.createObjectURL = jest.fn();
        const newProps = {
            location: { state: { job_resources: '{\"Kubeconfig\":\"[CREDENTIALS]{\\\"kubeconfig\\\":\\\"apiVers\\\"}[/CREDENTIALS]\"}' } },
        };

        const component = shallow(<JobInfo {...newProps} />);
        const instance = component.instance();
        jest.spyOn(instance, 'downloadConfigFile');
        const wrapper = component.find('.job-info-container');
        const jobResources = wrapper.find('.job-info-description');
        const jobResourceDownloadButton = jobResources.find('Button[type="primary"]');
        jobResourceDownloadButton.simulate('click');
        expect(instance.downloadConfigFile).toHaveBeenCalled();
        expect(instance.downloadConfigFile).toBeCalledTimes(1);
    });
});
