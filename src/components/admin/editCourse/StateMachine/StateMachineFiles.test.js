import React from 'react';
import { shallow } from 'enzyme';
import StateMachineFiles from './StateMachineFiles';

const props = {
    saveStateMachineFiles: jest.fn(() => Promise.resolve(true)),
    id: 101,
    data: {
        files: [
            'Invoice-252F221A-0012.pdf',
            'Invoice-B115E48B-0020.pdf',
            'Invoice-B115E48B-0023.pdf',
        ],
        gitLabCourseID: 'Test',
    },
};

describe('StateMachineFiles', () => {
    let component; let
        container;
    beforeEach(() => {
        component = shallow(<StateMachineFiles {...props} />);
        container = component.find('.actions-top-block');
    });

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render container successfully', () => {
        expect(container.exists()).toBeTruthy();
    });

    it('Should render input of lab id successfully', () => {
        const inputLabId = component.find('Input').at(0);
        expect(inputLabId.props().value).toBe(props.id);
    });

    it('Should render input of gitlab course id successfully', () => {
        const gitlabCourseId = component.find('Input').at(1);
        expect(gitlabCourseId.props().name).toBe('gitLabCourseID');
    });

    it('Should render select files button successfully', () => {
        const selectFilesButton = component.find('Button').at(0);
        expect(selectFilesButton.props().children[0]).toBe('Select Files');
        expect(selectFilesButton.props().children[1].props.type).toBe('upload');
    });

    it('Should render save files button successfully', () => {
        const saveFilesButton = component.find('Button').at(1);
        expect(saveFilesButton.props().children[0]).toBe('Save Files');
        expect(saveFilesButton.props().children[1].props.type).toBe('save');
    });

    it('Should render delete all button successfully', () => {
        const deleteAllButton = component.find('Button').at(2);
        expect(deleteAllButton.props().children[0]).toBe('Delete All');
        expect(deleteAllButton.props().children[1].props.type).toBe('delete');
    });
});
