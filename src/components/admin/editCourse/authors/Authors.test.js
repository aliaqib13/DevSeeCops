import React from 'react';
import { shallow } from 'enzyme';
import Authors from './Authors';

describe('Users', () => {
    let component;
    const props = {
        authors: [
            {
                activated: 1,
                cc_info: null,
                certificate_name: 'Vahe Aghekyan',
                coordinator: null,
                created_at: '2020-11-10 17:12:18',
                customer_id: null,
                email: 'vahe@araido.io',
                firstname: 'Vahe',
                id: 8,
                is_fellow: 1,
                lastname: 'Aghekyan',
                linkedin_url: null,
                logged_in: 1,
                login_token: null,
                mfa_enabled: 0,
                pivot: { user_id: 8, course_id: 1 },
                course_id: 1,
                user_id: 8,
                slack_id: null,
                updated_at: '2020-12-23 16:24:21',
            },
        ],
    };
    beforeEach(() => {
        component = shallow(<Authors {...props} />);
    });

    it('should render Authors component successfully', () => {
        expect(component.exists()).toBeTruthy();
    });

    it('should simulate OpenModalModal function', () => {
        const button = component.find('Button[type="default"]');
        button.simulate('click');
    });

    it('should simulate  function', () => {
        component.setState({ visible: true });
        const modal = component.find('Modal');
        modal.props().footer[0].props.onClick();
    });
});
