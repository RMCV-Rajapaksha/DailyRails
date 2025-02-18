import axiosInstance from "../../utils/axiosInstance";

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
      const res = await axiosInstance.get(
        `/items/${itemType}?page=${currentPage}&limit=${itemsPerPage}`
      );
      dispatch(fetchItemsSuccess(res.data.data.items, res.data.data.total));
    } catch (error) {
      dispatch(
        fetchItemsFailure(
          error.response?.data?.message ||
            "Failed to load items. Please try again later."
        )
      );
    }
  };
