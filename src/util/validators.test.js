import momentTZ from 'moment-timezone';
import {
    validateEmail,
    validatePhoneNumber,
    isInsideSupportHours,
    validateRegexpString,
    validateNewPassword,
} from './validators';

describe('util/validators', () => {
    describe('validateEmail', () => {
        it('returns true for valid emails', () => {
            const validEmails = [
                'someone@example.com',
                'someone+withAdressTag@example.com',
                'a@l.co',
            ];

            validEmails.forEach(email => {
                const res = validateEmail(email);
                if (!res) {
                    throw new Error(`${email} returned false`);
                }
            });
        });

        it('returns false for invalid emails', () => {
            const invalidEmails = [
                'a', // no @domain
                'a@l.c', // There are no single letter TLDs
                'a@',
                'cannot contain@spaces.com',
            ];

            invalidEmails.forEach(email => {
                const res = validateEmail(email);
                if (res) {
                    throw new Error(`${email} returned true`);
                }
            });
        });
        it('returns false for non-strings', () => {
            const invalidEmails = [
                0,
                365,
                null,
                undefined,
                true,
                false,
            ];

            invalidEmails.forEach(email => {
                const res = validateEmail(email);
                if (res) {
                    throw new Error(`${email} returned true`);
                }
            });
        });
    });
    describe('validatePhoneNumber', () => {
        it('returns true for valid phone numbers', () => {
            const validPhoneNumbers = [
                '+374545454',
                '(202) 324-3000',
                '00374545454',
            ];
            validPhoneNumbers.forEach(phoneNumber => {
                const res = validatePhoneNumber(phoneNumber);
                if (!res) {
                    throw new Error(`${phoneNumber} returned false`);
                }
            });
        });

        it('returns false for invalid phone numbers', () => {
            const invalidPhoneNumbers = [
                '1', // only one number
                'aa', // only letters
                '55aa55', // numbers with letters
                'd555548787d', // letters with numbers
                Number.parseInt('3456'),
            ];

            invalidPhoneNumbers.forEach(phoneNumber => {
                const res = validateEmail(phoneNumber);
                if (res) {
                    throw new Error(`${phoneNumber} returned true`);
                }
            });
        });
        it('returns false for non-strings or non-numbers', () => {
            const invalidPhoneNumbers = [
                null,
                undefined,
                true,
                false,
                {},
                [],
            ];

            invalidPhoneNumbers.forEach(phoneNumber => {
                const res = validateEmail(phoneNumber);
                if (res) {
                    throw new Error(`${phoneNumber} returned true`);
                }
            });
        });
    });
    describe('isInsideSupportHours', () => {
        const getCetNow = () => momentTZ().tz('Europe/Amsterdam');
        test.each([
            getCetNow().isoWeekday(1).hour(9).minutes(1), // 9:01 Monday
            getCetNow().isoWeekday(1).hour(16).minutes(59), // 16:59 Monday
            getCetNow().isoWeekday(5).hour(9).minutes(1), // 9:01 Friday
            getCetNow().isoWeekday(5).hour(16).minutes(59), // 16:59 Friday
            momentTZ().tz('Asia/Tokyo').isoWeekday(1).hour(21)
                .minutes(30), // 19:00 Monday in Tokyo (~14:00)
        ])('Check that %s is in support hours', time => {
            expect(isInsideSupportHours(time)).toBe(true);
        });

        test.each([
            getCetNow().isoWeekday(6), // Saturday
            getCetNow().isoWeekday(0), // Sunday
            getCetNow().isoWeekday(1).hour(8).minutes(59), // Monday, 8:59
            getCetNow().isoWeekday(1).hour(17).minutes(1), // Monday, 17:01
            getCetNow().isoWeekday(5).hour(8).minutes(59), // Friday, 8:59
            getCetNow().isoWeekday(5).hour(17).minutes(1), // Friday, 17:01
            momentTZ().tz('Asia/Tokyo').isoWeekday(1).hour(10)
                .minutes(30), // 10:00 Monday in Tokyo (~01:00)
        ])('Check that %s is outside support hours', time => {
            expect(isInsideSupportHours(time)).toBe(false);
        });
    });

    describe('validateRegexpString', () => {
        it('return true if valid regexp string', () => {
            const validRegexes = [
                '/test/',
                'abc',
                'a+[bc]*',
                '1',
            ];

            validRegexes.forEach(testCase => {
                if (!validateRegexpString(testCase)) {
                    throw new Error(`${testCase} returned false`);
                }
            });
        });
        it('return false if invalid regexp string', () => {
            const invalidRegexes = [
                'k[',
                '(',
            ];

            invalidRegexes.forEach(testCase => {
                if (validateRegexpString(testCase)) {
                    throw new Error(`${testCase} returned true`);
                }
            });
        });
    });

    describe('.validateNewPassword', () => {
        it('return true if valid password passes validation', () => {
            const password = ''.padEnd(10, '=');
            expect(validateNewPassword(password)).toBe(true);
        });
        it('return false password is less than 10 characters', () => {
            const password = ''.padEnd(9, '=');
            expect(validateNewPassword(password)).toBe(false);
        });
    });
});
