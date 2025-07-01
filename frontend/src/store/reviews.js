import { csrfFetch } from './csrf';

// Step 1: Create a type case
const SET_REVIEWS = 'reviews/setReview';
const SET_CURRENT_REVIEW = 'reviews/currentReview';
const ADD_REVIEW = 'reviews/addReview';
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
// Step 3: Thunk action creator
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
    const { gameId, review, userId } = reviewArg;
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
// Step 4: Building the state. The reducer controls what we return to the state
const initialState = { allReviews: null, currentReview: null };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      let newState = {}
      action.payload.forEach(review => {
        newState[review.id] = review
      })
      return { ...state, allReviews: newState };
    case SET_CURRENT_REVIEW:
      return { ...state, currentReview: action.payload };
    case ADD_REVIEW:
      console.log(state)
      let newReviewState = {
        ...state,
        allReviews: {
          ...state.allReviews
      },
      };
      newReviewState[action.payload.id] = action.payload
      return newReviewState
    default:
      return state;
  }
};

export default reviewsReducer;
