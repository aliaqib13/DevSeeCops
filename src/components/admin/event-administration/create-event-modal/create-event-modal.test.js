import React from 'react';
import { shallow } from 'enzyme';
import CreateEventModal from './index';
import { EVENT_TYPE } from '../../../../constants';

describe('CreateEventModal', () => {
    let component; let
        props;

    function tick() {
        return new Promise(resolve => {
            setTimeout(resolve, 0);
        });
    }

    beforeEach(() => {
        props = {
            onClose: jest.fn(),
            createEvent: jest.fn(() => Promise.resolve(true)),
            uploadEventImage: jest.fn(),
            getCourses: jest.fn(),
            getEvents: jest.fn(),
            coursesForEvent: [{ id: 1, title: 'Secrets Management for your applications' }, { id: 4, title: 'Container Security in CI/CD' }],
            eventTypes: Object.values(EVENT_TYPE),

        };
        component = shallow(<CreateEventModal {...props} />);
    });

    it('Should render successfully', () => {
        const modal = component.find('Modal');
        expect(modal.exists()).toBeTruthy();
    });

    it('Should call onClose method when click on Close button', () => {
        component.props().footer[0].props.onClick();
        expect(props.onClose).toBeCalledTimes(1);
    });

    it('Should render name input successfully', () => {
        const input = component.find('.small-input').at(0);
        expect(input.props().children[1].props.name).toBe('name');
    });

    it('Should render description input successfully', () => {
        const input = component.find('.courseDescriptionContainer');
        expect(input.props().children[1].props.children.props.name).toBe('description');
    });

    it('Should render start time input successfully', () => {
        const input = component.find('.small-input').at(1);
        expect(input.props().children[1].props.placeholder).toBe('Select start time');
    });

    it('Should render end time input successfully', () => {
        const input = component.find('.small-input').at(2);
        expect(input.props().children[1].props.placeholder).toBe('Select end time');
    });

    it('Should render image successfully', () => {
        const input = component.find('.imageContainer');
        expect(input.props().children[1].props.children[0].props.children[0].type).toBe('img');
    });

    it('Should render type drowdown successfully', () => {
        const select = component.find('Select').at(1);
        expect(select.props().value).toBe(EVENT_TYPE.INVITE);

        let inputUserLimit = component.find('.small-input').at(3);
        expect(inputUserLimit).toHaveLength(0);

        expect(component.instance().state.type).toBe(EVENT_TYPE.INVITE);
        select.props().onChange(EVENT_TYPE.OPEN);
        expect(component.instance().state.type).toBe(EVENT_TYPE.OPEN);

        inputUserLimit = component.find('.small-input').at(3);
        const { name, value } = inputUserLimit.props().children[1].props;
        expect(name).toBe('userLimit');
        expect(value).toBe(100);
    });

    it('Should create event successfully and set empty state', async () => {
        component = shallow(<CreateEventModal {...props} />);
        component.setState({
            name: 'Test Name',
            description: 'Test Description',
            course: '1',
        });
        component.instance().createEvent();
        await tick();
        const { name, description, course } = component.state();
        expect(props.createEvent).toBeCalledTimes(1);
        expect(name).toBe('');
        expect(description).toBe('');
        expect(course).toBe('');
    });

    it('Should not call create event when state is empty', async () => {
        component = shallow(<CreateEventModal {...props} />);
        component.setState({
            name: '',
            description: '',
            course: '',
        });
        component.instance().createEvent();
        expect(props.createEvent).toBeCalledTimes(0);
    });
    it('Should change course state when call selectCourse', async () => {
        component.instance().selectCourse(1);
        await tick();
        expect(component.state().course).toBe(1);
    });
});
