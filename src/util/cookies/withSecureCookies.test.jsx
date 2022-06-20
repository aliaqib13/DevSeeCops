import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { mount } from 'enzyme';
import withSecureCookies from './withSecureCookies';
import PropTypes from 'prop-types';

const testKey = 'testKey';
const testValue = 'testValue';

const MockComponent = ({setCookie}) => {

  setCookie(testKey, testValue);

  return (<div>Mock</div>);
};

MockComponent.propTypes = {
    setCookie: PropTypes.func
}

const Wrapped = withSecureCookies(MockComponent);

describe('withSecureCookies', () => {
    it('injects component with cookie props', () => {
        mount(
            <CookiesProvider>
                <Wrapped />
            </CookiesProvider>
        );

        expect(document.cookie).toEqual('testKey=testValue');
    });
});
