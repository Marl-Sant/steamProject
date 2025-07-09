import { csrfFetch } from './csrf';

// Step 1: Create a type case
const SET_COMMENTS = 'comments/setComments';
const ADD_COMMENT = 'comments/addComment';
const SET_CURRENT_COMMENT = 'comments/setCurrentComment';
const EDIT_COMMENT = 'comments/editComment';

// Step 2: This is the thunk action. Modifies state
const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  };
};

const setCurrentComment = (comment) => {
  return {
    type: SET_CURRENT_COMMENT,
    payload: comment,
  };
};

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

// Step 3: Thunk action creators

export const setCommentsState =
  (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/comments`);
    if (res.ok) {
      const data = await res.json();
      console.log('Fetched comments data:', data);
      dispatch(setComments(data));
    }
  };

export const setCurrentCommentState =
  (gameId, reviewId) => async (dispatch) => {
    const response = await fetch(
      `/api/games/${gameId}/reviews/${reviewId}/comments/`
    );
    const data = await response.json();
    dispatch(setCurrentComment(data));
    return response;
  };

export const addCommentState =
  (commentArg) => async (dispatch) => {
    const { gameId, reviewId, comment, userId, isHelpful } =
      commentArg;

    const response = await csrfFetch(
      `/api/reviews/${reviewId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          userId: userId,
          reviewId: reviewId,
          gameId: gameId,
          //seperate from comment posting below
          isHelpful: isHelpful,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return dispatch(addComment(data));
    } else {
      return JSON.stringify({
        message: 'Something went wrong.',
      });
    }
  };

// Step 4: Building the state. The reducer controls what we return to the state

const initialState = { allComments: null, currentComment: null };

const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_COMMENTS:
      newState = { ...state };
      newState.allComments = {}
      action.payload.forEach((comment) => {
        newState.allComments[comment.id] = comment;
      });
      return newState;

    case SET_CURRENT_COMMENT:
      return { ...state, currentComment: action.payload };

    case ADD_COMMENT:
      newState = {
        ...state,
        allComments: {
          ...state.allComments,
        },
      };
      newState.allComments[action.payload.id] = action.payload;
      return newState;

    case EDIT_COMMENT:
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

export default commentsReducer;
