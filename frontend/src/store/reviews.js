// Step 1: Create a type case
const SET_REVIEWS = "reviews/setReview";
const SET_CURRENT_REVIEW = "reviews/currentReview"
// Step 2: This is the thunk action. Modifies state
const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  };
};

const setCurrentReview = (review) => {
  return {
    type: SET_CURRENT_REVIEW,
    payload: review
  };
}
// Step 3: Thunk action creator
export const setReviewsState = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/reviews`)
    const data = await response.json();
    console.log(`This is the data: ${typeof data}`)
    dispatch(setReviews(data));
    return response;
  };

export const setCurrentReviewState = (gameId) => async (dispatch) => {
  const response = await fetch(`/api/games/${gameId}/reviews`)
  const data = await response.json();
  dispatch(setCurrentReview(data))
  return response
}
// Step 4: Building the state. The reducer controls what we return to the state
const initialState = { allReviews: null, currentReview: null };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, allReviews: action.payload };
    case SET_CURRENT_REVIEW:
      return { ...state, currentReview: action.payload};
    default:
      return state;
  }
};

export default reviewsReducer;
