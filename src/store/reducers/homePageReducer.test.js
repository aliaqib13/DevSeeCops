import {
    FETCH_HOME_PAGE_DATA,
} from '../action-types/homePage';

import HomePageReducer from './homePageReducer';

describe('HomePageReducer', () => {
    const initialState = {
        rightSidebar: [],
        courses: null,
    };

    it('should set initialState when state is undefined', () => {
        const resultState = HomePageReducer(undefined);
        expect(resultState.rightSidebar).toEqual([]);
        expect(resultState.courses).toBeNull();
    });

    it('FETCH_HOME_PAGE_DATA should set state.data=action.payload.content', () => {
        const resultState = HomePageReducer(initialState, {
            type: FETCH_HOME_PAGE_DATA,
            payload: {
                rightSidebar: ['test'],
                courses: 'test',
            },
        });
        expect(resultState.rightSidebar).toEqual(['test']);
        expect(resultState.courses).toEqual('test');
    });
});
