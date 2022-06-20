import React from 'react';
import { shallow } from 'enzyme';
import { message } from 'antd';
import Referrals from './Referrals';

jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    const messageANTD = {
        ...antd.message,
        success: jest.fn(),
        error: jest.fn(),
    };
    return {
        ...antd,
        message: messageANTD,
    };
});

describe('Referrals', () => {
    let component;
    const props = {
        referrals: {
            data: [
                { id: 1, email: 'testemail@email.com', token: 'testTokenTestToken1' },
                { id: 2, email: 'test2email@email.com', token: 'testTokenTestToken2' },
            ],
        },
        fetchReferrals: jest.fn(() => Promise.resolve(true)),
        createReferral: jest.fn(() => Promise.resolve(true)),
        deleteReferral: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(() => {
        component = shallow(<Referrals {...props} />);
    });

    it('Should render successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('Should toggle modal successfully', async () => {
        const { visible } = component.state();
        expect(visible).toBe(false);
        await component.instance().toggleModal();
        const { visible: changedVisible } = component.state();
        expect(changedVisible).toBe(true);
    });

    it('Should change newReferralEmail successfully', async () => {
        const testValue = 'test value';
        const { newReferralEmail } = component.state();
        expect(newReferralEmail).toBe('');
        await component.instance().changeNewReferralEmail({ target: { value: testValue } });
        const { newReferralEmail: newReferralEmailNewValue } = component.state();
        expect(newReferralEmailNewValue).toBe(testValue);
    });

    it('Should work addNewReferral successfully with valid email', async () => {
        component.setState({
            newReferralEmail: 'validTest@email.com',
        });
        const res = await component.instance().addNewReferral();
        expect(component.state().newReferralEmail).toBe('');
        expect(res).toBe(true);
    });

    it('Should give error addNewReferral with invalid email', async () => {
        component.setState({
            newReferralEmail: 'invalidEmail',
        });
        const res = await component.instance().addNewReferral();
        expect(component.state().newReferralEmail).toBe('invalidEmail');
        expect(res).toBe(false);
    });

    it('addNewReferral() Should return false when given error message from server', async () => {
        component.setState({
            newReferralEmail: 'validTest@email.com',
        });
        component.setProps({
            createReferral: jest.fn(() => Promise.resolve({ message: 'error' })),
        });
        const res = await component.instance().addNewReferral();
        expect(res).toBe(false);
    });

    it('Should change visible to false when call handleCancel', async () => {
        component.setState({
            visible: true,
        });
        await component.instance().handleCancel();
        const state = component.state();
        expect(state.visible).toBe(false);
    });

    it('Should delete referral successfully', async () => {
        const { deleteReferral } = component.instance();
        const res = await deleteReferral(props.referrals.data[0].id);
        expect(res).toBe(true);
        expect(props.deleteReferral).toBeCalled();
    });
    it('Should show message error when delete referral return message', async () => {
        const errorMsg = 'Test error message';
        component.setProps({
            deleteReferral: jest.fn(() => Promise.resolve({
                message: errorMsg,
            })),
        });
        const { deleteReferral } = component.instance();
        const res = await deleteReferral(props.referrals.data[0].id);
        expect(res).toBe(false);
        expect(props.deleteReferral).toBeCalled();
        expect(message.error).toBeCalledWith(errorMsg);
    });

    it('does not show the "Add a new referral" button if campaign is not active', () => {
        const testProps = {
            ...props,
            referralsCampaignActive: false,
        };

        const testComponent = shallow(<Referrals {...testProps} />);

        const button = testComponent.find('Button'); // There's only one button on screen
        expect(button.exists()).toBe(false);
    });
});
