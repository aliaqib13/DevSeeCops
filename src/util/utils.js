export const addViewedCourse = courseId => {
    const viewed = localStorage.getItem('viewed-courses');
    const viewedCourses = viewed ? JSON.parse(viewed) : [];
    if (!viewedCourses.includes(courseId)) {
        viewedCourses.push(courseId);
        localStorage.setItem('viewed-courses', JSON.stringify(viewedCourses));
    }
};

export const withTimeZone = date => {
    const d = new Date(date);
    return d.toISOString();
};

// Note: this modifies the array in-place
export const arrayMoveElement = (array, from, to) => {
    if (!Array.isArray(array)) {
        throw new TypeError(`Expected an array, got ${typeof array}`);
    }

    // Allow negative values to wrap to end of array
    const startIndex = to < 0 ? array.length + to : to;
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);

    return array;
};
