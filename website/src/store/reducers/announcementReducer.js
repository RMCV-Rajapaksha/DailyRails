import {
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
  FETCH_ANNOUNCEMENTS_FAILURE,
} from "../actions/announcementActions";

const initialState = {
  announcements: [],
  isLoading: false,
  error: null,
  total: 0,
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        announcements: action.payload.announcements,
        total: action.payload.total,
      };
    case FETCH_ANNOUNCEMENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default announcementReducer;
