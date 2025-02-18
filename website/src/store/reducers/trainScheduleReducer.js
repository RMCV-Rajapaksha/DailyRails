import {
  FETCH_TRAIN_SCHEDULE_REQUEST,
  FETCH_TRAIN_SCHEDULE_SUCCESS,
  FETCH_TRAIN_SCHEDULE_FAILURE,
} from "../actions/trainSchedleActions";

const initialState = {
  scheduleData: [],
  isLoading: false,
  error: null,
};

const trainScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAIN_SCHEDULE_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_TRAIN_SCHEDULE_SUCCESS:
      return { ...state, isLoading: false, scheduleData: action.payload };
    case FETCH_TRAIN_SCHEDULE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default trainScheduleReducer;
