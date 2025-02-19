import axiosInstance from "../../../src/utils/axiosInstance";

export const FETCH_TRAIN_SCHEDULE_REQUEST = "FETCH_TRAIN_SCHEDULE_REQUEST";
export const FETCH_TRAIN_SCHEDULE_SUCCESS = "FETCH_TRAIN_SCHEDULE_SUCCESS";
export const FETCH_TRAIN_SCHEDULE_FAILURE = "FETCH_TRAIN_SCHEDULE_FAILURE";
export const CLEAR_TRAIN_SCHEDULE = "CLEAR_TRAIN_SCHEDULE";

const fetchTrainScheduleRequest = () => ({
  type: FETCH_TRAIN_SCHEDULE_REQUEST,
});

const fetchTrainScheduleSuccess = (scheduleData) => ({
  type: FETCH_TRAIN_SCHEDULE_SUCCESS,
  payload: scheduleData,
});

const fetchTrainScheduleFailure = (error) => ({
  type: FETCH_TRAIN_SCHEDULE_FAILURE,
  payload: error,
});

const clearTrainSchedule = () => ({
  type: CLEAR_TRAIN_SCHEDULE,
});

export const fetchTrainSchedule =
  (startLocation, endLocation) => async (dispatch) => {
    dispatch(clearTrainSchedule());
    dispatch(fetchTrainScheduleRequest());
    try {
      const response = await axiosInstance.post(
        "/trains/search",
        JSON.stringify({
          Location_1: startLocation,
          Location_2: endLocation,
        })
      );
      if (response.data.success) {
        dispatch(fetchTrainScheduleSuccess(response.data.data));
      } else {
        dispatch(
          fetchTrainScheduleFailure(
            "No trains available for the selected route."
          )
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch(
          fetchTrainScheduleFailure(
            "No trains available for the selected route."
          )
        );
      } else {
        dispatch(
          fetchTrainScheduleFailure(
            "Error fetching train data: " + error.message
          )
        );
      }
    }
  };
