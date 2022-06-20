import momentTZ from 'moment-timezone';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_NUMBER_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;

export function validateEmail(email) {
    return EMAIL_REGEX.test(String(email).toLowerCase());
}

export function validatePhoneNumber(number) {
    return (!!number.match(PHONE_NUMBER_REGEX));
}

// Check whether a given time (defaults to "now") is within support time (09:00-17:00 CEST Monday-Friday)
export function isInsideSupportHours(currentCETTIME = momentTZ().tz('Europe/Amsterdam')) {
    const startTime = momentTZ(currentCETTIME)
        .tz('Europe/Amsterdam')
        .hour(9)
        .minute(0)
        .second(0)
        .millisecond(0);
    const endTime = momentTZ(currentCETTIME)
        .tz('Europe/Amsterdam')
        .hour(17)
        .minute(0)
        .second(0)
        .millisecond(0);
    return currentCETTIME.isBetween(startTime, endTime) // Within 09:00 - 17:00 CET
        && currentCETTIME.day() !== 6 && currentCETTIME.day() !== 0; // not Saturday or Sunday
}

export function validateRegexpString(str) {
    try {
        RegExp(str);
    } catch (err) {
        console.warn('Not a valid regex: ', err.message);
        return false;
    }
    return true;
}

export function validateNewPassword(password) {
    // Type check
    if (typeof password !== 'string') {
        throw new TypeError('Password must be a string');
    }

    // Minimum length:
    if (password.length < 10) {
        return false;
    }

    // TODO: more validations?
    return true;
}
