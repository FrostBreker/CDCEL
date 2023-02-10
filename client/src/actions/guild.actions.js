import axios from "axios";

export const GET_USER_GUILDS = "GET_USER_GUILDS";

export const getUserGuilds = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/guild/`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: GET_USER_GUILDS,
          payload: res.data,
        });
      })
      .catch(() => {});
  };
};
