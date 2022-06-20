import React from 'react';
import { shallow } from 'enzyme';
import LabSteps from './lab-steps';

const props = {
    chapters: [{
        id: 153,
        lab_id: 7,
        title: 'Start here',
        uuid: 'c791df58-877c-433f-8fd1-d2b6450918f5',
        order_number: 1,
        is_compulsory: 0,
        created_at: '2021-05-18 13:39:55',
        updated_at: '2021-05-18 13:40:49',
        contentBlocks: [{
            id: 823,
            step_id: 153,
            type: 'HeartBox',
            content: { text: ['<p>Coming soon!fhdfgh</p>\n'], titles: ['sdfgsdfg'] },
            uuid: '38c85efc-02a5-474d-9e28-aebdaa87789b',
            order_number: 1,
            is_compulsory: 0,
            created_at: '2021-05-18 13:39:55',
            updated_at: '2021-05-18 13:40:49',
        }],
        states: [],
    }, {
        id: 154,
        lab_id: 7,
        title: 'Test',
        uuid: 'e6429f5c-674a-4a9c-bcf8-04404368e757',
        order_number: 2,
        is_compulsory: 0,
        created_at: '2021-05-18 13:39:55',
        updated_at: '2021-05-18 13:40:49',
        contentBlocks: [{
            id: 825,
            step_id: 154,
            type: 'HeartBox',
            content: { text: ['<p>fdh dddh</p>\n'], titles: ['sdfhdf '] },
            uuid: '5cafc165-baef-48ca-accd-287cae815329',
            order_number: 1,
            is_compulsory: 0,
            created_at: '2021-05-18 13:40:05',
            updated_at: '2021-05-18 13:40:49',
        }],
        states: [],
    }, {
        id: 155,
        lab_id: 7,
        title: 'fdgsdfgsdf gsdfg',
        uuid: '5b06e44a-30c5-4776-9cb3-93e2338995b5',
        order_number: 3,
        is_compulsory: 0,
        created_at: '2021-05-18 13:39:55',
        updated_at: '2021-05-18 13:40:49',
        contentBlocks: [{
            id: 826,
            step_id: 155,
            type: 'GreyBox',
            content: { text: ['<p>sdfsdafd safda dsf asdfasd f</p>\n'], titles: ['fghdfg dfh h'] },
            uuid: 'bdf0ac43-1210-4bab-a4c5-772345887858',
            order_number: 1,
            is_compulsory: 0,
            created_at: '2021-05-18 13:40:30',
            updated_at: '2021-05-18 13:40:49',
        }],
        states: [],
    }],
    steps_images: [],
    currentStep: 2,
    showDone: false,
    hint_is_open: null,
    active_lab_id: 211,
    user_level: 'Advanced',
    lab_id: '211',
    finished: 0,
    stages: [],
    completed_steps: [0, 1, 2],
};
describe('Lab Steps', () => {
    let component;
    beforeEach(() => {
        component = shallow(<LabSteps {...props} />);
    });
    it('should render component successfully', () => {
        expect(component.exists()).toEqual(true);
    });
    it('should render Check Results Button successfully', () => {
        let checkResultBtn = component.find('.check-results');
        let { disabled } = checkResultBtn.props();
        expect(disabled).toBe(false);
        component.setProps({ showDone: true });
        checkResultBtn = component.find('.check-results');
        disabled = checkResultBtn.props().disabled;
        expect(disabled).toBe(true);
    });
});
