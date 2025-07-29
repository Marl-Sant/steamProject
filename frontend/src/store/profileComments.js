import { csrfFetch } from './csrf';

// Step 1: Create type cases
const SET_PROFILE_COMMENTS = 'profileComments/setProfileComments';
const ADD_PROFILE_COMMENT = 'profileComments/addProfileComment';
const SET_CURRENT_PROFILE_COMMENT = 'profileComments/setCurrentProfileComment';
const EDIT_PROFILE_COMMENT = 'profileComments/editProfileComment';

// Step 2: Action creators
const setProfileComments = (comments) => {
  return {
    type: SET_PROFILE_COMMENTS,
    payload: comments,
  };
};

const setCurrentProfileComment = (comment) => {
  return {
    type: SET_CURRENT_PROFILE_COMMENT,
    payload: comment,
  };
};

const addProfileComment = (comment) => {
  return {
    type: ADD_PROFILE_COMMENT,
    payload: comment,
  };
};

// Step 3: Thunk action creators

export const setProfileCommentsState =
  (profileUserId) => async (dispatch) => {
    const res = await fetch(`/api/users/${profileUserId}/comments`);
    if (res.ok) {
      const data = await res.json();
      console.log('Fetched profile comments:', data);
      dispatch(setProfileComments(data));
    }
  };

export const setCurrentProfileCommentState =
  (commentId) => async (dispatch) => {
    const response = await fetch(`/api/profile-comments/${commentId}`);
    const data = await response.json();
    dispatch(setCurrentProfileComment(data));
    return response;
  };

export const addProfileCommentState =
  (commentArg) => async (dispatch) => {
    const { userId, profileUserId, comment } = commentArg;

    const response = await csrfFetch(
      `/api/users/${profileUserId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          profileUserId,
          comment,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return dispatch(addProfileComment(data));
    } else {
      return JSON.stringify({
        message: 'Something went wrong.',
      });
    }
  };

// Step 4: Reducer — controls what we return to state

const initialState = { allComments: null, currentComment: null };

const profileCommentsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_PROFILE_COMMENTS:
      newState = { ...state };
      newState.allComments = {};
      action.payload.forEach((comment) => {
        newState.allComments[comment.id] = comment;
      });
      return newState;

    case SET_CURRENT_PROFILE_COMMENT:
      return { ...state, currentComment: action.payload };

    case ADD_PROFILE_COMMENT:
      newState = {
        ...state,
        allComments: {
          ...state.allComments,
        },
      };
      newState.allComments[action.payload.id] = action.payload;
      return newState;

    case EDIT_PROFILE_COMMENT:
      newState = {
        ...state,
        allComments: {
          ...state.allComments,
        },
      };
      newState.allComments[action.payload.id] = action.payload;
      return newState;

    default:
      return state;
  }
};

export default profileCommentsReducer;
