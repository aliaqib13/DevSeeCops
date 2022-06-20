import { useCookies } from 'react-cookie';

const useSecureCookies = dependencies => {
    const [cookies, setCookie, removeCookie] = useCookies(dependencies);

    function setSecureCookie(
        name,
        value,
        options,
    ) {
        setCookie(name, value, {
            ...(options || {}),
            sameSite: 'lax',
        });
    }

    return [
        cookies,
        setSecureCookie,
        removeCookie,
    ];
};

export default useSecureCookies;
