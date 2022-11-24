import Cookies from "js-cookie";
import WebApiUser from "../api/User";
import { logoutAuth } from "../libs/auth";

const initialData = {
  loading: false,
  user: null,
};

const LOADING_GLOBAL = "LOADING_GLOBAL";
const USER = "USER";
const webReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOADING_GLOBAL:
      return { ...state, loading: action.payload };
    case USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export default webReducer;

export const LoadingGlobal = (data) => async (dispatch) => {
  dispatch({ type: LOADING_GLOBAL, payload: data });
};

export const validatedLogin = () => async (dispatch) => {
  try {
    let session = await Cookies.get("token");
    if (session) {
      session = JSON.parse(session);
      dispatch({ type: USER, payload: session.user });
      return session;
    } else {
      Cookies.remove("token");
    }
  } catch (error) {
    return false;
  }
};

export const Login = (data) => async (dispatch) => {
  try {
    console.log("login");
    const login = await WebApiUser.Login(data);
    console.log(login);
    dispatch({ type: USER, payload: login.data.user });
    return login.data;
  } catch (error) {
    return false;
  }
};
