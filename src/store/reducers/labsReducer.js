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
  //activeLabId
};

export default function labsReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    // get labs
    case FETCH_LABS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LABS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };
    case FETCH_LABS_ERROR:
      return {
        ...state,
        loading: false,
        labs: [],
        job_id: null,
        error: action.error,
      };

    // create lab
    case CREATE_LAB_START:
      return {
        ...state,
        loadingCreateLab: true,
        error: null,
      };
    case CREATE_LAB_SUCCESS:
      return {
        ...state,
        error: null,
        loadingCreateLab: false,
        labData: action.data,
      };
    case CREATE_LAB_ERROR:
      return {
        ...state,
        loadingCreateLab: false,
        error: action.error,
      };
    // destroy lab
    case DESTROY_LAB_START:
      return {
        ...state,
        error: null,
        loadingDestroyLab: true,
      };
    case DESTROY_LAB_SUCCESS:
      return {
        ...state,
        loadingDestroyLab: false,
        data: [],
        error: null,
      };
    case DESTROY_LAB_ERROR:
      return {
        ...state,
        loadingDestroyLab: false,
        error: action.error,
      };
    // get active lab
    case GET_ACTIVE_LAB_START:
      return {
        ...state,
        loadingActiveLab: true,
      };
    case GET_ACTIVE_LAB_SUCCESS: {
      let resourceURLs = [];
      if (action.payload.resources && action.payload.resources.length) {
        resourceURLs = action.payload.resources.map((resource) => {
          // If the type is not set, or is unknown, default to fetch
          const type =
            resource.type && resource.type !== 'unknown'
              ? resource.type
              : 'fetch';

          return {
            id: resource.id,
            url: resource.url,
            type,
          };
        });
      }
      return {
        ...state,
        loadingActiveLab: false,
        activeLab: action.payload,
        resourceURLs,
      };
    }

    case GET_ACTIVE_LAB_ERROR:
      return {
        ...state,
        loadingActiveLab: false,
        error: action.error,
      };
    // get job progress
    case GET_JOB_PROGRESS:
      return {
        ...state,
        activeLab: {
          ...state.activeLab,
          jobs: action.payload,
        },
      };
    case SAVE_CURRENT_LAB_STEP: {
      const { activeLab } = state;
      activeLab.currentStep = action.payload;
      return {
        ...state,
        activeLab,
      };
    }

    case UPDATE_HINTS_OPEN:
      return {
        ...state,
        activeLab: {
          ...state.activeLab,
          hint_is_open: action.payload,
        },
      };
    case GET_REMAINING_HINTS_COUNT: {
      const { activeCourse } = state.activeLab;
      activeCourse.user_level = action.payload.user_level;
      return {
        ...state,
        remainingHints: action.payload.remaining_hints,
        activeLab: {
          ...state.activeLab,
          activeCourse,
        },
      };
    }
    case EDIT_RESOURCE_URL_STATUS: {
      const index = state.resourceURLs.findIndex((e) => e.id === action.id);
      const st = { ...state };
      const resourceURL = [...st.resourceURLs];
      resourceURL[index].type = 'success';
      resourceURL[index].url = action.url;
      return {
        ...state,
        resourceURLs: resourceURL,
      };
    }
    case SAVE_STEP_PROGRESS: {
      const aLab = state.activeLab;
      aLab.completed_failed_steps = action.payload.completed_failed_steps;
      return {
        ...state,
        activeLab: aLab,
      };
    }
    default:
      return state;
  }
}
