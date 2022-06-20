import { addViewedCourse, withTimeZone, arrayMoveElement } from './utils';

describe('util/utils', () => {
    describe('addViewedCourse', () => {
        it('add course id to localstorage viewed-courses when id is not exists', () => {
            const courseId = 1;
            const storageData = [2, 3, 4];

            // set initial viewed courses data empty array
            localStorage.setItem('viewed-courses', JSON.stringify([]));

            const initialData = JSON.parse(localStorage.getItem('viewed-courses'));
            // course id is not exists
            expect(initialData.includes(courseId)).toBeFalsy();

            // set initial data without course id
            localStorage.setItem('viewed-courses', JSON.stringify(storageData));

            addViewedCourse(courseId);
            const changedData = JSON.parse(localStorage.getItem('viewed-courses'));

            // viewed courses data length changed
            expect(changedData.length).toBe(storageData.length + 1);

            // course id added
            expect(changedData).toContain(courseId);
            localStorage.removeItem('viewed-courses');
        });

        it("doesn't add course id to localstorage viewed-courses when id is exists", () => {
            const courseId = 1;
            const storageData = [1, 2, 3, 4];
            localStorage.setItem('viewed-courses', JSON.stringify(storageData));

            const initialData = JSON.parse(localStorage.getItem('viewed-courses'));
            // course id is exists
            expect(initialData.includes(courseId)).toBeTruthy();

            addViewedCourse(courseId);

            const changedData = JSON.parse(localStorage.getItem('viewed-courses'));

            // viewed courses data length not changed
            expect(changedData.length).toBe(storageData.length);

            // course id is one and unique
            expect(changedData.filter(e => e === courseId).length).toBe(1);
            localStorage.removeItem('viewed-courses');
        });
    });
    describe('withTimeZone', () => {
        it('adds current timezone data to a given string', () => {
            // Get today's date
            const today = new Date();
            const timeZone = new Date().getTimezoneOffset();

            // Get date as a string:
            const todayDate = today.toLocaleDateString();

            const newDate = withTimeZone(todayDate);

            // Make sure they've got the same timezone offsets.
            expect(new Date(newDate).getTimezoneOffset()).toBe(timeZone);
        });
    });

    describe('arrayMoveElement(array,from,to)', () => {
        it('moves the chosen index to the new position', () => {
            const array = ['a', 'b', 'c', 'd', 'e'];
            const originalArray = JSON.parse(JSON.stringify(array));
            const from = 1;
            const to = 3;

            // Call the function:
            arrayMoveElement(array, from, to);

            expect(array[to]).toBe(originalArray[from]); // expect the correct element was moved
            expect(array[from]).toBe(originalArray[from + 1]); // it was filled with the the one above it
        });

        it('modifies the array in place', () => {
            const array = ['a', 'b', 'c', 'd', 'e'];
            const originalArray = JSON.parse(JSON.stringify(array));
            const from = 1;
            const to = 3;

            // Call the function:
            const ret = arrayMoveElement(array, from, to);

            expect(ret).toBe(array); // Expect it returns the same array as given
            expect(ret).not.toEqual(originalArray); // different values to the original
        });

        it('allows negative "to" values, denoting a reverse position from the end of the array', () => {
            const array = ['a', 'b', 'c', 'd', 'e'];
            const originalArray = JSON.parse(JSON.stringify(array));
            const from = 1;
            const to = -1;
            const expectedTo = array.length + to;

            // Call the function:
            arrayMoveElement(array, from, to);

            expect(array[expectedTo]).toBe(originalArray[from]); // expect the correct element was moved
            expect(array[from]).toBe(originalArray[from + 1]); // it was filled with the the one above it

            expect(array).toEqual(['a', 'c', 'd', 'e', 'b']); // sanity check
        });

        it('throws a TypeError if a non-array is given', () => {
            [null, undefined, 0, 'a', {}, new Date()].forEach(test => {
                expect(() => arrayMoveElement(test)).toThrow(TypeError);
            });
        });
    });
});
