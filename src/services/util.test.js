import { addAuthToRequest } from './util';

describe('app/src/services/util.js', () => {
    describe('addAuthToRequest() function ', () => {
        it('Should add the correct value to header.Authorization and return the original data object', () => {
            const data = {
                some: Math.random(),
                data: true,
            };
            const originaldata = JSON.parse(JSON.stringify(data)); // Take a copy of the headers now to compare to;
            const headers = {};
            const originalHeaders = JSON.parse(JSON.stringify(headers)); // Take a copy of the headers now to compare to;
            const token = 'Test value of token';
            window.localStorage.setItem('token', token);

            const res = addAuthToRequest(data, headers);

            // Expect data to be the same object and not modified
            expect(res).toBe(data); // Checks it's the same object reference
            expect(res).toEqual(originaldata); // Check it hasn't changed

            // Expect header object to have been modified
            expect(headers).not.toEqual(originalHeaders); // Check it has changed.
            expect(headers.Authorization).toEqual(`Bearer ${token}`);
        });
    });
});
