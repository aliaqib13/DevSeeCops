import React from 'react';
import { mount } from 'enzyme';
import { CookiesProvider } from 'react-cookie';
import useSecureCookies from './useSecureCookies';

const testKey = 'testKey';
const testValue = 'testValue';

const MockComponent = () => {
    const [currentCookies, setCookie] = useSecureCookies();
    setCookie(testKey, testValue);

    return (<div>Mock</div>);
};

describe('useSecureCookies', () => {
    it('creates a cookie', () => {
        const component = mount(
            <CookiesProvider>
                <MockComponent />
            </CookiesProvider>
        );

        expect(document.cookie).toEqual('testKey=testValue');
    });
});
