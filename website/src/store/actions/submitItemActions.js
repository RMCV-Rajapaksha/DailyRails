import axios from "axios";
import { toast } from "react-toastify";

export const SUBMIT_ITEM_REQUEST = "SUBMIT_ITEM_REQUEST";
export const SUBMIT_ITEM_SUCCESS = "SUBMIT_ITEM_SUCCESS";
export const SUBMIT_ITEM_FAILURE = "SUBMIT_ITEM_FAILURE";

const submitItemRequest = () => ({
  type: SUBMIT_ITEM_REQUEST,
});

const submitItemSuccess = () => ({
  type: SUBMIT_ITEM_SUCCESS,
});

const submitItemFailure = (error) => ({
  type: SUBMIT_ITEM_FAILURE,
  payload: error,
});

export const submitItem = (formData) => async (dispatch) => {
  dispatch(submitItemRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/items",
      formData
    );
    if (response.status === 201) {
      dispatch(submitItemSuccess());
      toast.success("Item submitted successfully!");
    } else {
      dispatch(submitItemFailure("Failed to submit item. Please try again."));
      toast.error("Failed to submit item. Please try again.");
    }
  } catch (error) {
    dispatch(
      submitItemFailure("An error occurred. Please check your connection.")
    );
    toast.error("An error occurred. Please check your connection.");
  }
};
