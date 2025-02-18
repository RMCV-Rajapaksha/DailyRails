import axiosInstance from "../../utils/axiosInstance";
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
    const response = await axiosInstance.post("/items", formData);
    if (response.status === 201) {
      dispatch(submitItemSuccess());
      toast.success("Item submitted successfully!");
      return true;
    }
    throw new Error("Failed to submit item");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred. Please check your connection.";
    dispatch(submitItemFailure(errorMessage));
    toast.error(errorMessage);
    return false;
  }
};