import { csrfFetch } from "./csrf";

const SET_USER_POSTS = "posts/setUserPosts";
const SET_ALL_POSTS = "posts/setAllPosts";
const SET_PROFILE_POSTS = "posts/setProfilePosts";

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

const setProfilePosts = (posts) => {
  return {
    type: SET_PROFILE_POSTS,
    payload: posts,
  };
};

export const populateRecentUserPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts/current");
  const data = await response.json();
  dispatch(setUserPosts(data));
  return data;
};

export const fetchPostsByProfile = (userId) => async (dispatch) => {
  const res = await fetch(`/api/communities/user/${userId}/posts`);
  if (res.ok) {
    const posts = await res.json();
    dispatch(setProfilePosts(posts));
    return posts;
  }
};


export const populateAllRecentPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");
  const data = await response.json();
  dispatch(setAllPosts(data));
  return data;
};

const initialState = { userRecentPosts: null, allRecentPosts: null, profilePosts: null, };

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
    case SET_PROFILE_POSTS:
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...state, profilePosts: newState };
    default:
      return state;
  }
};

export default userPostReducer;
