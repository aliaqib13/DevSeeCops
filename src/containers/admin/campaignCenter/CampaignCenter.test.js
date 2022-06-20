import React from 'react';
import { shallow } from 'enzyme';
import CampaignCenter from './CampaignCenter';

describe('CampaignCenter', () => {
    const component = shallow(<CampaignCenter />);

    it('Should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should render PromotionCodes successfully', () => {
        const title = component.find('Title');
        expect(title.props().children).toBe('Campaign Center');
    });

    it('Should render tabs successfully', () => {
        const tabs = component.find('Tabs');
        const { children } = tabs.props();
        expect(children[0].props.tab).toBe('Promotion Codes');
        expect(children[1].props.tab).toBe('Management Information');
        expect(children[2].props.tab).toBe('Event Administration');
        expect(children[3].props.tab).toBe('Campaigns');
    });
});
