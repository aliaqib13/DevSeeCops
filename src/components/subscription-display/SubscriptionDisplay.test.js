import React from 'react';
import { shallow } from 'enzyme';
import SubscriptionDisplay from './SubscriptionDisplay';

describe('Subscription Display Comp', () => {
    let component;
    const props = {};

    beforeEach(() => {
        component = shallow(<SubscriptionDisplay {...props} />);
    });

    it('returns null if no subscription info is passed in', () => {
        expect(component.length).toBe(1);
        expect(component.children().length).toBe(0);
        expect(component.find('Icon').length).toBe(0);
    });

    it('returns the subscription.subscriptionName if passed in', () => {
        const testProps = {
            subscription: {
                subscriptionName: 'Bronze Monthly',
            },
        };

        const testComponent = shallow(<SubscriptionDisplay {...testProps} />);

        expect(testComponent.children().props().children).toBe(testProps.subscription.subscriptionName);
    });
});
