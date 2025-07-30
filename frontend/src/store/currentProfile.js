// store/currentProfile.js

// Action Type
const SET_CURRENT_PROFILE = 'currentProfile/SET_CURRENT_PROFILE';

// Action Creator
export const setCurrentProfile = (profileData) => ({
  type: SET_CURRENT_PROFILE,
  payload: profileData,
});

// Thunk to fetch user profile info
export const fetchCurrentProfile = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setCurrentProfile(data));
  }
};

// Reducer
const currentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

export default currentProfileReducer;
