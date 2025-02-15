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
      // Only show toast notification here
      toast.success("Item submitted successfully!");
      return true;
    }
    // If status is not 201, throw an error to be caught in catch block
    throw new Error("Failed to submit item");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred. Please check your connection.";
    dispatch(submitItemFailure(errorMessage));
    // Only show toast notification here
    toast.error(errorMessage);
    return false;
  }
};
