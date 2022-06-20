import useSecureCookies from './useSecureCookies';

const withSecureCookies = WrappedComponent => props => {
    const [cookies, setCookie, removeCookie] = useSecureCookies();

    return WrappedComponent({
        cookies,
        setCookie,
        removeCookie,
        ...props,
    });
};

export default withSecureCookies;
