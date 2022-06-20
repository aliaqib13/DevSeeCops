import React from 'react';
import { shallow } from 'enzyme';
import Campaigns from './Campaigns';

describe('Campaigns', () => {
    const props = {
        fetchCampaigns: jest.fn(),
        updateActiveness: jest.fn(),
        updateConfig: jest.fn(),
    };

    let component;
    beforeEach(() => {
        component = shallow(<Campaigns {...props} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls fetchCampaigns on mount', () => {
        expect(component.exists()).toBeTruthy();
        expect(props.fetchCampaigns).toHaveBeenCalledTimes(1);
    });
});
