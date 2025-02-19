import {
  FETCH_TRAIN_SCHEDULE_REQUEST,
  FETCH_TRAIN_SCHEDULE_SUCCESS,
  FETCH_TRAIN_SCHEDULE_FAILURE,
  CLEAR_TRAIN_SCHEDULE,
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
    case CLEAR_TRAIN_SCHEDULE:
      return { ...state, scheduleData: [], error: null };
    default:
      return state;
  }
};

export default trainScheduleReducer;
