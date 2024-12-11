import axios from "axios";

export const FETCH_ANNOUNCEMENTS_REQUEST = "FETCH_ANNOUNCEMENTS_REQUEST";
export const FETCH_ANNOUNCEMENTS_SUCCESS = "FETCH_ANNOUNCEMENTS_SUCCESS";
export const FETCH_ANNOUNCEMENTS_FAILURE = "FETCH_ANNOUNCEMENTS_FAILURE";

const fetchAnnouncementsRequest = () => ({
  type: FETCH_ANNOUNCEMENTS_REQUEST,
});

const fetchAnnouncementsSuccess = (announcements, total) => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  payload: { announcements, total },
});

const fetchAnnouncementsFailure = (error) => ({
  type: FETCH_ANNOUNCEMENTS_FAILURE,
  payload: error,
});

export const fetchAnnouncements =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(fetchAnnouncementsRequest());
    try {
      const response = await axios.get(
        `http://localhost:4000/api/announcements?page=${page}&limit=${limit}`
      );
      dispatch(
        fetchAnnouncementsSuccess(
          response.data.announcements,
          response.data.totalItems
        )
      );
    } catch (error) {
      dispatch(fetchAnnouncementsFailure("Failed to fetch announcements"));
    }
  };
