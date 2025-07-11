import { csrfFetch } from "./csrf";

const SET_USER_POSTS = "posts/setUserPosts";

const setUserPosts = (posts) => {
  return {
    type: SET_USER_POSTS,
    payload: posts,
  };
};

export const populateRecentUserPosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts/current");
  const data = await response.json();
  dispatch(setUserPosts(data));
  return data;
};

const initialState = { userRecentPosts: null };

const userPostReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_USER_POSTS:
      action.payload.forEach((post) => {
        newState[post.id] = post;
      });
      return { ...state, userRecentPosts: newState };
    default:
      return state;
  }
};

export default userPostReducer;
