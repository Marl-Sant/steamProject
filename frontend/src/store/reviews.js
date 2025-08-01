import { csrfFetch } from './csrf';

// Step 1: Create a type case
const SET_REVIEWS = 'reviews/setReview';
const SET_CURRENT_REVIEW = 'reviews/currentReview';
const ADD_REVIEW = 'reviews/addReview';
const EDIT_REVIEW = 'reviews/editReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// Step 2: This is the thunk action. Modifies state
const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews,
  };
};

const setCurrentReview = (review) => {
  return {
    type: SET_CURRENT_REVIEW,
    payload: review,
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    payload: review,
  };
};

const destoryReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};

// Step 3: Thunk action creator
export const getDataByUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setReviews(data.Reviews));
    return response;
  } else {
    return JSON.stringify({
      message: 'Something went wrong while fetching user reviews.',
    });
  }
};

export const setReviewsState = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/games/${gameId}/reviews`);
  const data = await response.json();
  console.log(`This is the data: ${typeof data}`);
  dispatch(setReviews(data));
  return response;
};

export const setCurrentReviewState =
  (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/reviews`);
    const data = await response.json();
    dispatch(setCurrentReview(data));
    return response;
  };

export const addReviewState =
  (reviewArg) => async (dispatch) => {
    const { gameId, review, userId, isRecommended } = reviewArg;
    const response = await csrfFetch(
      `/api/games/${gameId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: review,
          userId: userId,
          gameId: gameId,
          isRecommended: isRecommended,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return dispatch(addReview(data));
    } else {
      return JSON.stringify({
        message: 'Something went wrong.',
      });
    }
  };

export const editReviewThunk =
  (reviewArg) => async (dispatch) => {
    const { gameId, reviewId, review, userId, isRecommended } =
      reviewArg;
    const response = await csrfFetch(
      `/api/games/${gameId}/reviews/${reviewId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: review,
          userId: userId,
          gameId: gameId,
          isRecommended: isRecommended,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return dispatch(editReview(data));
    } else {
      return JSON.stringify({
        message: 'Something went wrong',
      });
    }
  };

export const deleteReview =
  (deletedReview) => async (dispatch) => {
    const { gameId, reviewId } = deletedReview;
    const response = await csrfFetch(
      `/api/games/${gameId}/reviews/${reviewId}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      const data = response.json();
      dispatch(destoryReview(reviewId));
      return data;
    }
  };
// Step 4: Building the state. The reducer controls what we return to the state
const initialState = { allReviews: {}, currentReview: null };

const reviewsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_REVIEWS:
      action.payload.forEach((review) => {
        newState[review.id] = review;
      });
      return { ...state, allReviews: newState };
    case SET_CURRENT_REVIEW:
      return { ...state, currentReview: action.payload };
    case ADD_REVIEW:
      newState = {
        ...state,
        allReviews: {
          ...state.allReviews,
        },
      };
      newState.allReviews[action.payload.id] = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState = {
        ...state,
        allReviews: {
          ...state.allReviews,
        },
      };
      newState.allReviews[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = {
        ...state,
      };
      delete newState.allReviews[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
