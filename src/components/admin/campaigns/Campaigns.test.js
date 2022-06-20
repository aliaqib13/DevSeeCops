import React from 'react';
import { shallow } from 'enzyme';
import Campaigns from './Campaigns';

describe('Campaigns', () => {
    let component;
    const props = {
        campaigns: [
            {
                name: 'buyOneGetOneFree',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    bellowButtonText: 'test',
                },
            },
            {
                name: 'firstCourse',
                active: 1,
                config: {
                    emailText: '<p>test</p>',
                    aboveButtonText: 'test',
                },
            },
            {
                name: 'referral',
                active: 1,
                config: {
                    referrerDiscount: 20,
                    newCustomerDiscount: 20,
                    referrerEmailText: '<p>test</p>',
                    newCustomerEmailText: '<p>test</p>',
                },
            },
        ],
        updateCampaignConfig: jest.fn(() => Promise.resolve(true)),
        fetchCampaigns: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<Campaigns {...props} />);
    });

    it('should render component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should render table and its columns successfully', () => {
        const table = component.props().children[0];
        const { dataSource, children } = table.props;
        expect(dataSource).toBe(props.campaigns);
        expect(children[0].props.title).toBe('Name');
        expect(children[1].props.title).toBe('Active');
        expect(children[2].props.title).toBe('Config');

        const rendered = children[2].props.render(props.campaigns[0]);
        expect(rendered.props.htmlType).toBe('button');

        expect(component.instance().state.editConfigModalVisible).toBe(false);
        rendered.props.onClick();
        expect(component.instance().state.editConfigModalVisible).toBe(true);
    });

    it('should render BuyOneGetOne modal successfully', () => {
        component.setState({ campaign: props.campaigns[0] });
        const modal = component.props().children[1];
        const { children } = modal.props;

        expect(children[0]).not.toBe(false);
        expect(children[1]).toBe(false);
        expect(children[2]).toBe(false);

        const buyOneGetOne = component.find('BuyOneGetOne');
        expect(buyOneGetOne.props().config).toBe(props.campaigns[0].config);
    });

    it('should render FirstCourseFree modal successfully', () => {
        component.setState({ campaign: props.campaigns[1] });
        const modal = component.props().children[1];
        const { children } = modal.props;

        expect(children[0]).toBe(false);
        expect(children[1]).toBe(false);
        expect(children[2]).not.toBe(false);

        const firstCourseFree = component.find('FirstCourseFree');
        expect(firstCourseFree.props().config).toBe(props.campaigns[1].config);
    });

    it('should render RaferralScheme modal successfully', () => {
        component.setState({ campaign: props.campaigns[2] });
        const modal = component.props().children[1];
        const { children } = modal.props;

        expect(children[0]).toBe(false);
        expect(children[1]).not.toBe(false);
        expect(children[2]).toBe(false);

        const firstCourseFree = component.find('ReferralScheme');
        expect(firstCourseFree.props().config).toBe(props.campaigns[2].config);
    });
});
