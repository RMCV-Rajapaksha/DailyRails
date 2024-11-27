import axios from "axios";

export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
});

const fetchItemsSuccess = (items, total) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { items, total },
});

const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: error,
});

export const fetchItems =
  (itemType, currentPage, itemsPerPage) => async (dispatch) => {
    dispatch(fetchItemsRequest());
    try {
      const res = await axios.get(
        `http://localhost:4000/api/items/${itemType}?page=${currentPage}&limit=${itemsPerPage}`
      );
      dispatch(fetchItemsSuccess(res.data.items, res.data.total));
    } catch (error) {
      dispatch(
        fetchItemsFailure("Failed to load items. Please try again later.")
      );
    }
  };
