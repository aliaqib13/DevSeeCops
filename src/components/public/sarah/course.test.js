import React from 'react';
import { shallow } from 'enzyme';
import mockedGA from 'react-ga';
import Course from './course';

jest.mock('react-ga', () => ({
    event: jest.fn(),
}));

describe('Course', () => {
    const props = {
        auth: { user: { id: 3 } },
        history: { push: jest.fn(link => Promise.resolve(link)) },
    };
    const component = shallow(<Course {...props} />);
    it('should render Course successfully', () => {
        expect(component.exists()).toBeTruthy();
    });
    it('should link to instance works well', async () => {
        const inst = component.instance();
        const AuthLink = await inst.handleLinkTo();
        expect(AuthLink).toBe('/platform/academy-tour');
        expect(mockedGA.event).toHaveBeenCalledWith({
            category: 'website_navigation',
            action: 'Accessed introduction tour page',
            label: 'Sarah page',
        });
        component.setProps({ auth: {} });
        const UnAuthLink = await inst.handleLinkTo();
        expect(UnAuthLink).toBe('/login');
    });
    it('should work open description instance well', () => {
        const inst = component.instance();
        inst.openDescription('Secret Management', 'Automate manage and enforce secure digital authentication.');
        const state = component.state();
        expect(state.title).toBe('Secret Management');
        expect(state.subtitle).toBe('Automate manage and enforce secure digital authentication.');
        expect(state.link).toBe('Click to start your introduction tour');
    });
    it('should change state when click openDescription', () => {
        const parentG = component.find('g[id="Group_434"]');
        parentG.props().children[1].props.onClick();
        const stateStep1 = component.state();
        expect(stateStep1.title).toBe('Serverless');

        parentG.props().children[3].props.onClick();
        const stateStep2 = component.state();
        expect(stateStep2.title).toBe('Secret Management');

        parentG.props().children[5].props.onClick();
        const stateStep3 = component.state();
        expect(stateStep3.title).toBe('Vulnerability Management');

        parentG.props().children[7].props.onClick();
        const stateStep4 = component.state();
        expect(stateStep4.title).toBe('Mobile Security');

        parentG.props().children[9].props.onClick();
        const stateStep5 = component.state();
        expect(stateStep5.title).toBe('Software Composition Analysis');

        parentG.props().children[11].props.onClick();
        const stateStep6 = component.state();
        expect(stateStep6.title).toBe('Cloud Security');

        parentG.props().children[13].props.onClick();
        const stateStep7 = component.state();
        expect(stateStep7.title).toBe('Container Security');

        parentG.props().children[15].props.onClick();
        const stateStep8 = component.state();
        expect(stateStep8.title).toBe('Dynamic Application Security Testing');

        parentG.props().children[17].props.onClick();
        const stateStep9 = component.state();
        expect(stateStep9.title).toBe('Bug Bounty Hunting');

        parentG.props().children[19].props.onClick();
        const stateStep10 = component.state();
        expect(stateStep10.title).toBe('Threat Modeling');

        parentG.props().children[21].props.onClick();
        const stateStep11 = component.state();
        expect(stateStep11.title).toBe('Static Application Security Testing');
    });
});
