import {
    FETCH_LABS_START,
    FETCH_LABS_SUCCESS,
    FETCH_LABS_ERROR,
    CREATE_LAB_START,
    CREATE_LAB_SUCCESS,
    CREATE_LAB_ERROR,
    DESTROY_LAB_START,
    DESTROY_LAB_SUCCESS,
    DESTROY_LAB_ERROR,
    GET_ACTIVE_LAB_START,
    GET_ACTIVE_LAB_SUCCESS,
    GET_ACTIVE_LAB_ERROR,
    GET_JOB_PROGRESS,
    SAVE_CURRENT_LAB_STEP,
    UPDATE_HINTS_OPEN,
    GET_REMAINING_HINTS_COUNT,
    EDIT_RESOURCE_URL_STATUS,
    SAVE_STEP_PROGRESS,
} from '../action-types/labs';

import labsReducer from './labsReducer';

describe('labsReducer', () => {
    const initialState = {
        loading: false,
        loadingCreateLab: false,
        loadingGetChapters: false,
        loadingDestroyLab: false,
        loadingActiveLab: false,
        labData: null,
        activeLab: null,
        progress: 0,
        labs: [],
        job_id: null,
        error: null,
        remainingHints: null,
        resourceURLs: [],
    };

    it('should set initialState when state is undefined', () => {
        const resultState = labsReducer(undefined);
        expect(resultState.loading).toBe(false);
        expect(resultState.loadingCreateLab).toBe(false);
        expect(resultState.loadingGetChapters).toBe(false);
        expect(resultState.loadingDestroyLab).toBe(false);
        expect(resultState.labData).toBeNull();
        expect(resultState.activeLab).toBeNull();
        expect(resultState.progress).toBe(0);
        expect(resultState.labs).toEqual([]);
        expect(resultState.job_id).toBeNull();
        expect(resultState.error).toBeNull();
        expect(resultState.remainingHints).toBeNull();
        expect(resultState.resourceURLs).toEqual([]);
    });

    it('FETCH_LABS_START should set state.loading=true state.error=null', () => {
        const resultState = labsReducer(initialState, {
            type: FETCH_LABS_START,
        });
        expect(resultState.loading).toBe(true);
        expect(resultState.error).toBeNull();
    });

    it('FETCH_LABS_SUCCESS should set action.payload to state, set state.loading=false, state.error=null ', () => {
        const resultState = labsReducer(initialState, {
            type: FETCH_LABS_SUCCESS,
            payload: {
                testKey: 'test',
            },
        });
        expect(resultState.testKey).toBe('test');
        expect(resultState.loading).toBe(false);
        expect(resultState.error).toBeNull();
    });

    it('FETCH_LABS_ERROR should set state.loading=false, state.labs=[], state.job_id=null, state.error=action.error', () => {
        const resultState = labsReducer(initialState, {
            type: FETCH_LABS_ERROR,
            error: 'test',
        });
        expect(resultState.job_id).toBeNull();
        expect(resultState.loading).toBe(false);
        expect(resultState.labs).toEqual([]);
        expect(resultState.error).toBe('test');
    });

    it('CREATE_LAB_START should set state.loadingCreateLab=true, state.error=null', () => {
        const resultState = labsReducer(initialState, {
            type: CREATE_LAB_START,
        });
        expect(resultState.error).toBeNull();
        expect(resultState.loadingCreateLab).toBe(true);
    });

    it('CREATE_LAB_SUCCESS should set state.loadingCreateLab=false, state.labs=[], state.labData=action.data', () => {
        const resultState = labsReducer(initialState, {
            type: CREATE_LAB_SUCCESS,
            data: 'test',
        });
        expect(resultState.loadingCreateLab).toBe(false);
        expect(resultState.labs).toEqual([]);
        expect(resultState.labData).toBe('test');
    });

    it('CREATE_LAB_ERROR should set state.loadingCreateLab=false, state.error=action.error', () => {
        const resultState = labsReducer(initialState, {
            type: CREATE_LAB_ERROR,
            error: 'test',
        });
        expect(resultState.loadingCreateLab).toBe(false);
        expect(resultState.error).toBe('test');
    });

    it('DESTROY_LAB_START should set state.loadingDestroyLab=true, state.error=null', () => {
        const resultState = labsReducer(initialState, {
            type: DESTROY_LAB_START,
        });
        expect(resultState.loadingDestroyLab).toBe(true);
        expect(resultState.error).toBeNull();
    });

    it('DESTROY_LAB_SUCCESS should set state.loadingDestroyLab=false, state.data=[], state.error=null', () => {
        const resultState = labsReducer(initialState, {
            type: DESTROY_LAB_SUCCESS,
        });
        expect(resultState.loadingDestroyLab).toBe(false);
        expect(resultState.data).toEqual([]);
        expect(resultState.error).toBeNull();
    });

    it('DESTROY_LAB_ERROR should set state.loadingDestroyLab=false, state.error=action.error', () => {
        const resultState = labsReducer(initialState, {
            type: DESTROY_LAB_ERROR,
            error: 'test',
        });
        expect(resultState.loadingDestroyLab).toBe(false);
        expect(resultState.error).toBe('test');
    });

    it('GET_ACTIVE_LAB_START should set state.loadingActiveLab=true', () => {
        const resultState = labsReducer(initialState, {
            type: GET_ACTIVE_LAB_START,
        });
        expect(resultState.loadingActiveLab).toBe(true);
    });

    it('GET_ACTIVE_LAB_SUCCESS if payload without resources should set state.resourceURLs=[]', () => {
        const resultState = labsReducer(initialState, {
            type: GET_ACTIVE_LAB_SUCCESS,
            payload: 'test',
        });
        expect(resultState.loadingActiveLab).toBe(false);
        expect(resultState.activeLab).toBe('test');
        expect(resultState.resourceURLs).toEqual([]);
    });

    it('GET_ACTIVE_LAB_SUCCESS if payload resources with type = unknown should set state.resourceURLs[num].type=fetch', () => {
        const resultState = labsReducer(initialState, {
            type: GET_ACTIVE_LAB_SUCCESS,
            payload: {
                resources: [
                    {
                        id: 'test',
                        url: 'test',
                        type: 'unknown',
                    },
                    {
                        id: 'test',
                        url: 'test',
                        type: 'unknown',
                    },
                ],
            },
        });
        expect(resultState.loadingActiveLab).toBe(false);
        expect(resultState.activeLab).toEqual({
            resources: [
                { id: 'test', url: 'test', type: 'unknown' },
                { id: 'test', url: 'test', type: 'unknown' },
            ],
        });
        expect(resultState.resourceURLs).toEqual([
            { id: 'test', url: 'test', type: 'fetch' },
            { id: 'test', url: 'test', type: 'fetch' },
        ]);
    });

    it('GET_ACTIVE_LAB_SUCCESS if payload resources with type should set state.resourceURLs[num].type=this type', () => {
        const resultState = labsReducer(initialState, {
            type: GET_ACTIVE_LAB_SUCCESS,
            payload: {
                resources: [
                    {
                        id: 'test',
                        url: 'test',
                        type: 'test',
                    },
                    {
                        id: 'test',
                        url: 'test',
                        type: 'test',
                    },
                ],
            },
        });
        expect(resultState.loadingActiveLab).toBe(false);
        expect(resultState.activeLab).toEqual({
            resources: [
                { id: 'test', url: 'test', type: 'test' },
                { id: 'test', url: 'test', type: 'test' },
            ],
        });
        expect(resultState.resourceURLs).toEqual([
            { id: 'test', url: 'test', type: 'test' },
            { id: 'test', url: 'test', type: 'test' },
        ]);
    });

    it('GET_ACTIVE_LAB_ERROR should set state.loadingActiveLab=false, state.error=action.error', () => {
        const resultState = labsReducer(initialState, {
            type: GET_ACTIVE_LAB_ERROR,
            error: 'test',
        });
        expect(resultState.loadingActiveLab).toBe(false);
        expect(resultState.error).toBe('test');
    });

    it('GET_JOB_PROGRESS should set state.activeLab={...state.activeLab, jobs: action.payload,}', () => {
        const state = {
            ...initialState,
            activeLab: { some: 'testProperty' },
        };
        const resultState = labsReducer(state, {
            type: GET_JOB_PROGRESS,
            payload: 'test',
        });
        expect(resultState.activeLab.jobs).toBe('test');
        expect(resultState.activeLab.some).toBe(state.activeLab.some);
    });

    it('SAVE_CURRENT_LAB_STEP should set state.activeLab.currentStep=action.payload', () => {
        const newInitialState = {
            activeLab: {
                currentStep: '',
            },
        };
        const resultState = labsReducer(newInitialState, {
            type: SAVE_CURRENT_LAB_STEP,
            payload: 'test',
        });
        expect(resultState.activeLab.currentStep).toBe('test');
    });

    it('UPDATE_HINTS_OPEN should set state.activeLab.hint_is_open=action.payload', () => {
        const resultState = labsReducer(initialState, {
            type: UPDATE_HINTS_OPEN,
            payload: 'test',
        });
        expect(resultState.activeLab.hint_is_open).toBe('test');
    });

    it('GET_REMAINING_HINTS_COUNT should set state.activeCourse.user_level=action.payload.user_level', () => {
        const newInitialState = {
            activeLab: {
                activeCourse: {
                    user_level: '',
                },
            },
        };
        const resultState = labsReducer(newInitialState, {
            type: GET_REMAINING_HINTS_COUNT,
            payload: {
                user_level: 'test',
            },
        });
        expect(resultState.activeLab.activeCourse.user_level).toBe('test');
    });

    it('GET_REMAINING_HINTS_COUNT should set state.remainingHints=action.payload.remaining_hints', () => {
        const newInitialState = {
            activeLab: {
                activeCourse: {
                    user_level: '',
                },
            },
        };
        const resultState = labsReducer(newInitialState, {
            type: GET_REMAINING_HINTS_COUNT,
            payload: {
                remaining_hints: 'test',
            },
        });
        expect(resultState.remainingHints).toBe('test');
    });

    it('EDIT_RESOURCE_URL_STATUS should set state.resourceURLs.url=action.url if (action.id=resourceURLs.id)', () => {
        const newInitialState = {
            resourceURLs: [
                { id: 'test', type: 'test', url: 'test' },
                { id: 'test1', type: 'test', url: 'test' },
            ],
        };
        const resultState = labsReducer(newInitialState, {
            type: EDIT_RESOURCE_URL_STATUS,
            id: 'test',
            url: 'test1',
        });
        expect(resultState.resourceURLs).toEqual([
            { id: 'test', type: 'success', url: 'test1' },
            { id: 'test1', type: 'test', url: 'test' },
        ]);
    });

    it('SAVE_STEP_PROGRESS should set state.activeLab.completed_failed_steps=action.payload.completed_failed_steps', () => {
        const newInitialState = {
            activeLab: {
                completed_failed_steps: '',
            },
        };
        const resultState = labsReducer(newInitialState, {
            type: SAVE_STEP_PROGRESS,
            payload: {
                completed_failed_steps: 'test',
            },
        });
        expect(resultState.activeLab.completed_failed_steps).toBe('test');
    });
});
