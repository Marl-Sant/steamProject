import { csrfFetch } from "./csrf";

const SET_USER_POSTS = "posts/setUserPosts";
const SET_ALL_POSTS = "posts/setAllPosts";

const setUserPosts = (posts) => {
  return {
    type: SET_USER_POSTS,
    payload: posts,
  };
};

const setAllPosts = (posts) => {
  return {
    type: SET_ALL_POSTS,
    payload: posts,
  };
};

export const populateRecentUserPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts/current");
  const data = await response.json();
  dispatch(setUserPosts(data));
  return data;
};

export const populateAllRecentPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");
  const data = await response.json();
  dispatch(setAllPosts(data));
  return data;
};

const initialState = { userRecentPosts: null, allRecentPosts: null };

const userPostReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_USER_POSTS:
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...state, userRecentPosts: newState };
    case SET_ALL_POSTS:
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...state, allRecentPosts: newState };
    default:
      return state;
  }
};

export default userPostReducer;
