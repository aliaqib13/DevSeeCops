import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import StepImages from '.';

const props = {
    fetchStepsImages: jest.fn(() => Promise.resolve(true)),
    images: [
        {
            course_id: 1,
            id: 4,
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/steps-images/EIaG35P0jcq1VTEX9UdrUGAEIUKFtOve.png',
            uuid: '6c2a6c73-da92-441d-a9ce-369b09d28fa5',
        },
        {
            course_id: 1,
            id: 5,
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/steps-images/tvSyAhFtu5QWvqpbZLxs9Y4IYNOctsW9.png',
            uuid: '6487959d-6fbf-4c3a-811c-756950047c39',
        },
        {
            course_id: 1,
            id: 6,
            image: 'https://atp-resources-dev-testing.s3.eu-central-1.amazonaws.com/steps-images/yOUCX4WNi9oRM5Nmm6YSayoK3NZafg9h.png',
            uuid: '644d54b1-a654-4a28-b975-bb191122c233',
        },
    ],
};

describe('Step images', () => {
    let component;

    beforeEach(() => {
        component = shallow(<StepImages {...props} />);
    });

    it('Should render successfully', () => {
        const wrapper = component.find('.step-images');
        expect(wrapper.exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Should render images passed down by props', () => {
        const list = component.find('List');
        expect(list.props().dataSource).toBe(props.images);
    });
});

describe('Steps images list', () => {
    let component;

    beforeEach(() => {
        component = mount(<StepImages {...props} />);
    });

    it('Should render list with proper images and descriptions', () => {
        const list = component.find('List');
        const listItem = list.find('Item').at(1);
        expect(listItem.find('Avatar').props().src).toBe(props.images[1].image);
        expect(listItem.find('.ant-list-item-meta-description').text()).toBe(props.images[1].image);
    });

    it('Should open preview modal with proper image when clicked on preview icon of image item in the list', () => {
        const list = component.find('List');
        const previewIcon = list.find('Button.img-preview-button').at(0);
        expect(component.find('Modal.steps-image-preview-modal').props().visible).toBe(false);
        previewIcon.simulate('click');
        expect(component.find('Modal.steps-image-preview-modal').props().visible).toBeTruthy();
        expect(component.find('Modal.steps-image-preview-modal').find('img').props().src).toBe(props.images[0].image);
    });

    it('Should call removeStepImage method when click on delete icon of image item in the list', () => {
        const list = component.find('List');
        const deleteIcon = list.find('Button.img-delete-button').at(0);
        const spy = jest.spyOn(component.instance(), 'removeStepImage');
        deleteIcon.simulate('click');
        expect(spy).toBeCalledTimes(1);
    });
});
