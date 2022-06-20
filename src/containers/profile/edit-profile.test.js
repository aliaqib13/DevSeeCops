import React from 'react';
import { shallow, mount } from 'enzyme';
import EditProfile from './edit-profile';

describe('Edit Profile', () => {
    let component;
    const props = {
        authUser: jest.fn(() => Promise.resolve(true)),
        editUserProfile: jest.fn(() => Promise.resolve(true)),
        history: { location: { state: '' } },
        preferences: jest.fn(() => Promise.resolve(true)),
        getPreferences: jest.fn(() => Promise.resolve(true)),
        updatePreferences: jest.fn(() => Promise.resolve(true)),
        searchByCourseTags: jest.fn(() => Promise.resolve(true)),
        getCCInfo: jest.fn(() => Promise.resolve(true)),
        updateCreditCard: jest.fn(() => Promise.resolve(true)),
        deleteCreditCard: jest.fn(() => Promise.resolve(true)),
        fetchReferrals: jest.fn(() => Promise.resolve(true)),
        createReferral: jest.fn(() => Promise.resolve(true)),
        deleteReferral: jest.fn(() => Promise.resolve(true)),
        getReferralCampaign: jest.fn().mockResolvedValue(),
    };

    beforeEach(() => {
        component = shallow(<EditProfile {...props} />);
    });

    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    const ReferralTabPaneSelector = 'TabPane[tab="Referrals"]';
    it('shows Referrals tab if campaign is active', () => {
        const testProps = {
            ...props,
            referralsCampaignActive: true,
        };
        const testComponent = shallow(<EditProfile {...testProps} />);

        const tabPane = testComponent.find(ReferralTabPaneSelector);
        expect(tabPane.exists()).toBe(true);
    });

    it('shows Referrals tab if campaign is not active, but user has referrals', () => {
        const testProps = {
            ...props,
            referralsCampaignActive: false,
            referrals: { data: ['something'] },
        };
        const testComponent = shallow(<EditProfile {...testProps} />);

        const tabPane = testComponent.find(ReferralTabPaneSelector);
        expect(tabPane.exists()).toBe(true);
    });

    it('does not show the Referrals tab if campaign is not active and user has no referrals', () => {
        const testProps = {
            ...props,
            referralsCampaignActive: false,
            referrals: { data: [] },
        };
        const testComponent = shallow(<EditProfile {...testProps} />);

        const tabPane = testComponent.find(ReferralTabPaneSelector);
        expect(tabPane.exists()).toBe(false);
    });

    it('Should render tabs titles successfully', () => {
        const wrapper = mount(<EditProfile {...props} />);
        const tabs = wrapper.find('.ant-tabs-tab');

        expect(tabs.at(0).text()).toBe('Edit Profile');
        expect(tabs.at(1).text()).toBe('Preferences');
        expect(tabs.at(2).text()).toBe('Interested Courses');
        expect(tabs.at(3).text()).toBe('Billing and Subscriptions');
    });
});
