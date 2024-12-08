import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
} from "../actions/itemActions";

import {
  SUBMIT_ITEM_REQUEST,
  SUBMIT_ITEM_SUCCESS,
  SUBMIT_ITEM_FAILURE,
} from "../actions/submitItemActions";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
    case SUBMIT_ITEM_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        total: action.payload.total,
      };
    case FETCH_ITEMS_FAILURE:
    case SUBMIT_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SUBMIT_ITEM_SUCCESS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default itemReducer;