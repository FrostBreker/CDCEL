import axios from "axios";

export const GET_USER = "GET_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch(() => {});
  };
};

export const updateUser = (update) => {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_URL}api/user`, {
      method: "patch",
      data: update,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch(() => {});
  };
};
